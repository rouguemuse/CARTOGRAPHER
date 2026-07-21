import { useParams, Link } from 'react-router-dom';
import { getDearRedBySlug } from '../data/submissionsStore';
import './DearRed.css';

export default function DearRedDetail() {
  const { slug } = useParams();
  const letter = getDearRedBySlug(slug);

  if (!letter) {
    return (
      <div className="dear-red-container page-padding text-center">
        <h2 className="dear-red-title">Letter Not Found</h2>
        <p className="dear-red-intro" style={{ marginBottom: '2rem' }}>
          This letter may be private or undergoing editorial review.
        </p>
        <Link to="/dear-red" className="btn btn-primary">
          &larr; Return to Dear Red Archive
        </Link>
      </div>
    );
  }

  const pubDate = letter.published_at 
    ? new Date(letter.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'Archival Date';

  return (
    <div className="dear-red-container page-padding">
      <div className="dear-red-detail-paper">
        <header className="detail-paper-header">
          <span className="small-label" style={{ color: 'var(--color-brass)' }}>
            DEAR RED ARCHIVE LETTER
          </span>
          <h1 className="detail-letter-title">{letter.title || 'Untitled Letter'}</h1>
          <div className="detail-letter-meta">
            <span>By: <strong>{letter.publication_identity === 'alias' ? (letter.alias || 'Anonymous') : 'Anonymous'}</strong></span>
            {letter.recipient && <span> &bull; {letter.recipient}</span>}
            <span> &bull; Published: {pubDate}</span>
          </div>
        </header>

        <article className="detail-letter-body">
          {letter.published_body.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </article>

        {letter.editor_note && (
          <aside className="detail-editor-note">
            <span className="editor-note-tag">EDITOR'S NOTE</span>
            <p>{letter.editor_note}</p>
          </aside>
        )}

        <footer className="detail-paper-footer">
          <Link to="/dear-red/write" className="btn btn-primary">
            Write your own letter &rarr;
          </Link>
          <Link to="/dear-red" className="btn btn-secondary-dark">
            &larr; Back to Archive List
          </Link>
        </footer>
      </div>
    </div>
  );
}
