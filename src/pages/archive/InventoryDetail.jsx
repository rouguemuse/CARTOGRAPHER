import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { inventoryObjects as seedObjects } from '../../data/inventoryData';
import { useJourneyState } from '../../hooks/useJourneyState';
import { journeyConfig } from '../../data/journeyConfig';
import SlugNotFound from '../../components/SlugNotFound';

export default function InventoryDetail() {
  const { objectSlug } = useParams();
  const [objectData, setObjectData] = useState(null);
  const [loading, setLoading] = useState(true);

  const dialogRef = useRef(null);
  const { getActiveJourney, selectObject, startNewJourney } = useJourneyState();
  const navigate = useNavigate();

  const activeJourney = getActiveJourney();
  const hasAnswers = activeJourney && Object.keys(activeJourney.answers || {}).length > 0;
  const isSameObject = activeJourney?.carriedObject === objectData?.journeyObjectKey;

  useEffect(() => {
    const fetchObject = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'inventory_objects'),
          where('slug', '==', objectSlug),
          where('status', '==', 'published')
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          setObjectData(snap.docs[0].data());
          setLoading(false);
          return;
        }

        const local = seedObjects.find(o => o.slug === objectSlug);
        setObjectData(local || null);
      } catch (err) {
        console.warn("Firestore lookup failed, using seed inventory object:", err);
        const local = seedObjects.find(o => o.slug === objectSlug);
        setObjectData(local || null);
      } finally {
        setLoading(false);
      }
    };

    fetchObject();
  }, [objectSlug]);

  const handleCarryAction = () => {
    if (!objectData) return;
    const objectKey = objectData.journeyObjectKey;

    if (!activeJourney || !hasAnswers) {
      selectObject(objectKey);
      navigate(`/journey/stage/${journeyConfig.firstStageId}`);
    } else if (isSameObject) {
      navigate(`/journey/stage/${activeJourney.currentStage || journeyConfig.firstStageId}`);
    } else {
      if (dialogRef.current) {
        dialogRef.current.showModal();
      }
    }
  };

  const handleConfirmRestart = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    if (objectData) {
      startNewJourney(objectData.journeyObjectKey);
      navigate(`/journey/stage/${journeyConfig.firstStageId}`);
    }
  };

  const handleContinueCurrent = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    if (activeJourney) {
      navigate(`/journey/stage/${activeJourney.currentStage || journeyConfig.firstStageId}`);
    }
  };

  const handleCancelDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  if (loading) {
    return (
      <div className="container archive-page" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <p className="page-introduction">Retrieving Catalogue Record...</p>
      </div>
    );
  }

  if (!objectData) {
    return (
      <SlugNotFound 
        resourceName="Inventory Object" 
        backPath="/archive/inventory" 
        backLabel="Back to Inventory" 
      />
    );
  }

  return (
    <article className="container archive-page" style={{ padding: '2rem 0 6rem' }}>
      {/* Breadcrumbs */}
      <nav className="entry-meta" aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
        <Link to="/archive">The Archive</Link>
        <span style={{ margin: '0 0.5rem', opacity: 0.5 }}>/</span>
        <Link to="/archive/inventory">Inventory</Link>
        <span style={{ margin: '0 0.5rem', opacity: 0.5 }}>/</span>
        <span style={{ color: 'var(--ink)' }}>{objectData.name}</span>
      </nav>

      <div style={{ maxWidth: '72ch', margin: '0 auto' }}>
        {/* Large Atmospheric Image Presentation */}
        <div style={{
          width: '100%',
          height: 'clamp(220px, 35vh, 320px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f7f4ec',
          border: '1px solid var(--paper-line)',
          borderRadius: '4px',
          padding: '2rem',
          marginBottom: '2.5rem'
        }}>
          <picture style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <source srcSet={objectData.image.replace('.png', '.avif')} type="image/avif" />
            <source srcSet={objectData.image.replace('.png', '.webp')} type="image/webp" />
            <img 
              src={objectData.image} 
              alt={objectData.imageAlt || objectData.name}
              width="800"
              height="800"
              style={{ maxHeight: '100%', maxWidth: '80%', objectFit: 'contain' }}
            />
          </picture>
        </div>

        {/* Catalogue Record Details */}
        <header style={{ marginBottom: '2.5rem', borderBottom: '2px solid var(--paper-line)', paddingBottom: '1.5rem' }}>
          <span className="archive-catalog-label" style={{ color: 'var(--color-brass)' }}>{objectData.catalogueNumber}</span>
          <h1 className="page-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.75rem' }}>
            {objectData.name}
          </h1>
          <p className="page-introduction" style={{ margin: 0, fontSize: 'var(--text-reading)' }}>
            {objectData.description}
          </p>
        </header>

        {/* Catalogue Field Analysis */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={{ padding: '1.25rem 1.5rem', backgroundColor: '#f7f4ec', borderLeft: '4px solid var(--color-brass)', borderRadius: '4px' }}>
            <span className="archive-catalog-label">Condition & Surface</span>
            <p style={{ margin: 0, fontSize: 'var(--text-reading)' }}>{objectData.condition}</p>
          </div>

          <div style={{ padding: '1.25rem 1.5rem', backgroundColor: '#f7f4ec', borderLeft: '4px solid var(--red)', borderRadius: '4px' }}>
            <span className="archive-catalog-label">What It Once Protected</span>
            <p style={{ margin: 0, fontSize: 'var(--text-reading)' }}>{objectData.whatItProtected}</p>
          </div>

          <div style={{ padding: '1.25rem 1.5rem', backgroundColor: '#f7f4ec', borderLeft: '4px solid var(--muted)', borderRadius: '4px' }}>
            <span className="archive-catalog-label">What It Cost to Carry</span>
            <p style={{ margin: 0, fontSize: 'var(--text-reading)' }}>{objectData.whatItCost}</p>
          </div>

          <div style={{ padding: '1.25rem 1.5rem', backgroundColor: '#f7f4ec', borderLeft: '4px solid var(--ink)', borderRadius: '4px' }}>
            <span className="archive-catalog-label">What Happens When Released</span>
            <p style={{ margin: 0, fontSize: 'var(--text-reading)' }}>{objectData.releaseMeaning}</p>
          </div>
        </div>

        {/* Manuscript Passage */}
        {objectData.relatedExcerpt && (
          <blockquote style={{ padding: '1.5rem 2rem', margin: '2.5rem 0', borderLeft: '3px solid var(--color-brass)', fontStyle: 'italic', fontSize: 'var(--text-reading)', backgroundColor: 'rgba(0,0,0,0.02)' }}>
            "{objectData.relatedExcerpt}"
            <footer style={{ marginTop: '0.5rem', fontSize: 'var(--text-xs)', fontStyle: 'normal', color: 'var(--muted)', fontFamily: 'var(--font-ui)' }}>
              — From <em>How to Explain Yourself to Wolves</em> ({objectData.relatedChapter})
            </footer>
          </blockquote>
        )}

        {/* Primary Action Button */}
        <div style={{ marginTop: '3.5rem', textAlign: 'center', paddingTop: '2rem', borderTop: '2px solid var(--paper-line)' }}>
          <button onClick={handleCarryAction} className="btn btn-primary btn-large">
            {hasAnswers && isSameObject ? 'Continue Journey with This Object' : 'Carry This Into the Journey'}
          </button>
        </div>
      </div>

      {/* Confirmation Dialog for Replacing Active Journey */}
      <dialog ref={dialogRef} className="confirmation-dialog" onCancel={handleCancelDialog}>
        <div className="dialog-content">
          <h3>Restart Journey with {objectData.name}?</h3>
          <p>
            You have an unfinished Journey in progress with another object. Carrying <strong>{objectData.name}</strong> will replace your active route. Completed Maps Returned will remain safely preserved in your archive.
          </p>
          <div className="dialog-actions">
            <button onClick={handleConfirmRestart} className="btn btn-primary">
              Restart Carrying This Object
            </button>
            <button onClick={handleContinueCurrent} className="btn">
              Continue Current Journey
            </button>
            <button onClick={handleCancelDialog} className="btn btn-text">
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </article>
  );
}
