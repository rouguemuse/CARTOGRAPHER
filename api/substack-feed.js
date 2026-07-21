import https from 'https';

export default function handler(req, res) {
  // Enable CORS & Cache Control (30 min cache)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=86400');
  res.setHeader('Content-Type', 'application/json');

  https.get('https://otherpeoplesweather.substack.com/feed', (feedRes) => {
    let data = '';
    feedRes.on('data', chunk => data += chunk);
    feedRes.on('end', () => {
      try {
        const items = [];
        const itemMatches = data.match(/<item>[\s\S]*?<\/item>/g) || [];
        for (const itemXml of itemMatches) {
          const titleMatch = itemXml.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) || itemXml.match(/<title>([\s\S]*?)<\/title>/);
          const linkMatch = itemXml.match(/<link>([\s\S]*?)<\/link>/);
          const pubDateMatch = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
          const descMatch = itemXml.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) || itemXml.match(/<description>([\s\S]*?)<\/description>/);
          const enclosureMatch = itemXml.match(/enclosure url="([^"]+)"/);

          const rawLink = linkMatch ? linkMatch[1].trim() : 'https://otherpeoplesweather.substack.com';
          const trackingUrl = rawLink.includes('?') 
            ? `${rawLink}&utm_source=wolves_website&utm_medium=referral&utm_campaign=dispatches` 
            : `${rawLink}?utm_source=wolves_website&utm_medium=referral&utm_campaign=dispatches`;

          items.push({
            title: titleMatch ? titleMatch[1].trim() : '',
            url: trackingUrl,
            pubDate: pubDateMatch ? new Date(pubDateMatch[1].trim()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
            excerpt: descMatch ? descMatch[1].replace(/<[^>]+>/g, '').substring(0, 160).trim() + '...' : '',
            coverImage: enclosureMatch ? enclosureMatch[1] : null
          });
        }
        res.status(200).json(items.slice(0, 3));
      } catch (err) {
        res.status(500).json({ error: 'Failed to parse RSS feed' });
      }
    });
  }).on('error', () => {
    res.status(500).json({ error: 'Failed to fetch RSS feed' });
  });
}
