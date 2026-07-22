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
      {/* High Contrast Breadcrumbs */}
      <nav className="entry-meta" aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
        <Link to="/archive" style={{ color: 'var(--color-brass)' }}>The Archive</Link>
        <span style={{ margin: '0 0.5rem', color: '#A79D88', opacity: 0.5 }}>/</span>
        <Link to="/archive/inventory" style={{ color: 'var(--color-brass)' }}>Inventory</Link>
        <span style={{ margin: '0 0.5rem', color: '#A79D88', opacity: 0.5 }}>/</span>
        <span style={{ color: '#F1E9D6', fontWeight: 600 }}>{objectData.name}</span>
      </nav>

      <div style={{ maxWidth: '72ch', margin: '0 auto' }}>
        {/* Large Atmospheric Image Presentation */}
        <div style={{
          width: '100%',
          height: 'clamp(220px, 35vh, 320px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0c1210',
          border: '1px solid rgba(222, 205, 169, 0.18)',
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
        <header style={{ marginBottom: '2.5rem', borderBottom: '1px solid rgba(222, 205, 169, 0.18)', paddingBottom: '1.5rem' }}>
          <span className="archive-catalog-label" style={{ color: 'var(--color-brass)' }}>{objectData.catalogueNumber}</span>
          <h1 className="page-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.75rem', color: '#F1E9D6' }}>
            {objectData.name}
          </h1>
          <p className="page-introduction" style={{ margin: 0, fontSize: 'var(--text-reading)', color: '#C8BEA7' }}>
            {objectData.description}
          </p>
        </header>

        {/* Catalogue Field Analysis Cards (High-Contrast Light Boxes) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
          <div className="archive-light-box" style={{ padding: '1.25rem 1.5rem', backgroundColor: '#f7f4ec', color: '#121615', borderLeft: '4px solid var(--color-brass)', borderRadius: '4px' }}>
            <span className="archive-catalog-label" style={{ color: '#856404' }}>Condition & Surface</span>
            <p style={{ margin: 0, fontSize: 'var(--text-reading)', color: '#121615', fontWeight: 600 }}>{objectData.condition}</p>
          </div>

          <div className="archive-light-box" style={{ padding: '1.25rem 1.5rem', backgroundColor: '#f7f4ec', color: '#121615', borderLeft: '4px solid var(--red)', borderRadius: '4px' }}>
            <span className="archive-catalog-label" style={{ color: '#721c24' }}>What It Once Protected</span>
            <p style={{ margin: 0, fontSize: 'var(--text-reading)', color: '#121615', fontWeight: 600 }}>{objectData.whatItProtected}</p>
          </div>

          <div className="archive-light-box" style={{ padding: '1.25rem 1.5rem', backgroundColor: '#f7f4ec', color: '#121615', borderLeft: '4px solid #6c757d', borderRadius: '4px' }}>
            <span className="archive-catalog-label" style={{ color: '#383d41' }}>What It Cost to Carry</span>
            <p style={{ margin: 0, fontSize: 'var(--text-reading)', color: '#121615', fontWeight: 600 }}>{objectData.whatItCost}</p>
          </div>

          <div className="archive-light-box" style={{ padding: '1.25rem 1.5rem', backgroundColor: '#f7f4ec', color: '#121615', borderLeft: '4px solid #1b1e21', borderRadius: '4px' }}>
            <span className="archive-catalog-label" style={{ color: '#1b1e21' }}>What Happens When Released</span>
            <p style={{ margin: 0, fontSize: 'var(--text-reading)', color: '#121615', fontWeight: 600 }}>{objectData.releaseMeaning}</p>
          </div>
        </div>

        {/* Primary Action Button */}
        <div style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
          <button 
            className="btn btn-primary"
            onClick={handleCarryAction}
            style={{ width: '100%', padding: '1rem', fontSize: 'var(--text-base)' }}
          >
            {isSameObject && hasAnswers ? 'Continue Your Journey with this Object →' : `Carry ${objectData.name} into the Journey →`}
          </button>
        </div>

        {/* Modal Dialog for Switching Objects */}
        <dialog 
          ref={dialogRef} 
          style={{
            padding: '2rem',
            backgroundColor: '#0c1210',
            color: '#EDE4CF',
            border: '1px solid rgba(222, 205, 169, 0.25)',
            borderRadius: '4px',
            maxWidth: '500px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-display)', color: '#F1E9D6', marginTop: 0 }}>
            Switch Carried Object?
          </h3>
          <p style={{ fontFamily: 'var(--font-body)', color: '#C8BEA7', lineHeight: '1.6' }}>
            You are currently carrying another object in your active journey. Selecting <strong>{objectData.name}</strong> will start a new journey and reset your current answers.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <button className="btn btn-ghost-sm" onClick={handleCancelDialog} style={{ color: '#A79D88' }}>
              Cancel
            </button>
            <button className="btn btn-ghost-sm" onClick={handleContinueCurrent} style={{ color: 'var(--color-brass)' }}>
              Keep Current Journey
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleConfirmRestart}>
              Start New Journey
            </button>
          </div>
        </dialog>

        <footer style={{ marginTop: '3.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(222, 205, 169, 0.18)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/archive/inventory" className="text-link" style={{ color: 'var(--color-brass)' }}>
            &larr; Back to Inventory
          </Link>
          <Link to="/journey" className="btn btn-primary">
            View Journey Map
          </Link>
        </footer>
      </div>
    </article>
  );
}
