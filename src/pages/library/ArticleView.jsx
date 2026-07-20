import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import DOMPurify from 'dompurify';

export default function ArticleView() {
  const { collection: collectionSlug, slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!slug) {
          setLoading(false);
          return;
        }

        // First try by Firestore document ID
        try {
          const docRef = doc(db, 'articles', slug);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists() && docSnap.data().status === 'published') {
            setArticle({ id: docSnap.id, ...docSnap.data() });
            setLoading(false);
            return;
          }
        } catch (e) {
          // Document ID lookup failed, fallback to slug query
        }

        // Try querying by slug field
        const q = query(
          collection(db, 'articles'),
          where('slug', '==', slug),
          where('status', '==', 'published')
        );
        const querySnap = await getDocs(q);
        if (!querySnap.empty) {
          const firstDoc = querySnap.docs[0];
          setArticle({ id: firstDoc.id, ...firstDoc.data() });
        } else {
          // Fallback static article if Firestore has no data yet
          setArticle({
            id: slug,
            title: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            collection: collectionSlug || 'stories',
            author: 'Jayme Volstad',
            publishedAt: new Date().toISOString(),
            excerpt: 'A field note recovered from the edge of the valley.',
            body: `<p>This record was transcribed from the manuscript notes of <em>How to Explain Yourself to Wolves</em>.</p><p>When entering unfamiliar weather, the first mistake is assuming the storm was created for you. The second is offering your own coat to keep the wolf dry.</p>`
          });
        }
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("Failed to load the article.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [collectionSlug, slug]);

  const collectionName = (collectionSlug || 'stories').replace(/-/g, ' ');

  if (loading) {
    return (
      <div className="container archive-page" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <p className="page-introduction">Loading article...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container archive-page" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h1 className="page-title">Article Not Found</h1>
        <p className="page-introduction">The requested field note could not be located in the Valley Library.</p>
        <Link to={`/library/${collectionSlug || ''}`} className="btn btn-primary">
          Back to Collection
        </Link>
      </div>
    );
  }

  const sanitizedBody = DOMPurify.sanitize(article.body || article.content || '');

  return (
    <article className="container archive-page" style={{ padding: '2rem 0 5rem' }}>
      {/* Breadcrumb Navigation */}
      <nav className="entry-meta" aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
        <Link to="/archive">Archive</Link>
        <span style={{ margin: '0 0.5rem', opacity: 0.5 }}>/</span>
        <Link to="/library">Library</Link>
        <span style={{ margin: '0 0.5rem', opacity: 0.5 }}>/</span>
        <Link to={`/library/${collectionSlug}`} style={{ textTransform: 'capitalize' }}>
          {collectionName}
        </Link>
      </nav>

      {/* Article Header */}
      <header className="article-header" style={{ maxWidth: '68ch', margin: '0 auto 2.5rem' }}>
        <span className="page-kicker" style={{ textTransform: 'capitalize' }}>
          {collectionName}
        </span>
        <h1 className="page-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', marginBottom: '1rem' }}>
          {article.title}
        </h1>
        {article.excerpt && (
          <p className="page-introduction" style={{ fontSize: 'var(--text-reading-large)', color: 'var(--muted)', marginBottom: '1.25rem' }}>
            {article.excerpt}
          </p>
        )}
        <div className="entry-meta" style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderTop: '1px solid var(--paper-line)', paddingTop: '0.75rem' }}>
          <span>By {article.author || 'Jayme Volstad'}</span>
          <span>•</span>
          <time dateTime={article.publishedAt}>
            {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 'Published recently'}
          </time>
        </div>
      </header>

      {/* Cover Image */}
      {article.coverImage && (
        <div className="archive-figure" style={{ maxWidth: '68ch', margin: '0 auto 2.5rem' }}>
          <img src={article.coverImage} alt={article.title} />
        </div>
      )}

      {/* Article Body */}
      <div 
        className="article-body"
        style={{
          width: 'min(100%, 68ch)',
          marginInline: 'auto',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-reading)',
          lineHeight: '1.75',
          color: 'var(--ink)'
        }}
        dangerouslySetInnerHTML={{ __html: sanitizedBody }}
      />

      {/* Footer / Navigation Actions */}
      <footer style={{ maxWidth: '68ch', margin: '3.5rem auto 0', paddingTop: '2rem', borderTop: '1px solid var(--paper-line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to={`/library/${collectionSlug || ''}`} className="text-link">
          &larr; Back to {collectionName}
        </Link>
        <Link to="/journey" className="btn btn-primary">
          Begin the Journey
        </Link>
      </footer>
    </article>
  );
}
