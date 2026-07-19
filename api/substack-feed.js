import Parser from 'rss-parser';
import striptags from 'striptags';

export default async function handler(req, res) {
  // 1. Cache-Control: s-maxage=900, stale-while-revalidate=86400
  res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=86400');
  
  // Set CORS headers if needed for local testing, though Vercel handles this mostly
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const parser = new Parser({
    customFields: {
      item: [
        ['content:encoded', 'contentEncoded'],
        ['media:content', 'mediaContent', { keepArray: true }]
      ]
    }
  });

  const feedUrl = process.env.SUBSTACK_RSS_URL || 'https://otherpeoplesweather.substack.com/feed';

  try {
    const feed = await parser.parseURL(feedUrl);
    
    // Parse no more than six posts
    const latestItems = feed.items.slice(0, 6);
    
    const normalizedPosts = latestItems.map(item => {
      // 1. Validate article URLs
      let url = item.link || '';
      try {
        new URL(url); // Will throw if invalid
      } catch {
        url = '';
      }

      // 2. Normalize dates
      let publishedAt = item.pubDate;
      if (publishedAt) {
        publishedAt = new Date(publishedAt).toISOString();
      }

      // 3. Extract image (enclosure, media content, or first post image)
      let image = null;
      if (item.enclosure && item.enclosure.url && item.enclosure.type && item.enclosure.type.startsWith('image/')) {
        image = item.enclosure.url;
      } else if (item.mediaContent && item.mediaContent.length > 0 && item.mediaContent[0].$) {
        image = item.mediaContent[0].$.url;
      } else if (item.contentEncoded) {
        // Fallback: extract first img src from HTML content
        const match = item.contentEncoded.match(/<img[^>]+src="([^">]+)"/);
        if (match && match[1]) {
          image = match[1];
        }
      }

      // 4. Strip HTML from excerpts server-side
      let excerpt = '';
      if (item.contentSnippet) {
        excerpt = striptags(item.contentSnippet);
      } else if (item.contentEncoded) {
        excerpt = striptags(item.contentEncoded);
      }
      // Truncate excerpt if too long
      if (excerpt.length > 200) {
        excerpt = excerpt.substring(0, 197) + '...';
      }
      // Clean up whitespace
      excerpt = excerpt.replace(/\s+/g, ' ').trim();

      // Extract category (fallback to 'Field Note')
      let category = 'Field Note';
      if (item.categories && item.categories.length > 0) {
        category = item.categories[0];
      }

      return {
        id: item.guid || url || String(Math.random()),
        title: item.title ? striptags(item.title).trim() : 'Untitled',
        url,
        publishedAt,
        excerpt,
        image,
        author: item.creator || 'Jayme Volstad',
        category
      };
    });

    return res.status(200).json(normalizedPosts);
  } catch (error) {
    console.error('Substack RSS fetch error:', error);
    // Return a controlled JSON error with status 502 when retrieval fails
    return res.status(502).json({
      error: 'Bad Gateway',
      message: 'Failed to retrieve or parse the Substack RSS feed.'
    });
  }
}
