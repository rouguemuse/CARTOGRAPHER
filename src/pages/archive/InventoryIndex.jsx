import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { inventoryObjects as seedObjects } from '../../data/inventoryData';

export default function InventoryIndex() {
  const [objectsList, setObjectsList] = useState(seedObjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const q = query(
          collection(db, 'inventory_objects'),
          where('status', '==', 'published')
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          const docs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setObjectsList(docs);
        }
      } catch (err) {
        console.warn("Using seed Inventory objects due to Firestore query state:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  return (
    <div className="container archive-page" style={{ padding: '2rem 0 6rem' }}>
      {/* Breadcrumbs */}
      <nav className="entry-meta" aria-label="Breadcrumb" style={{ marginBottom: '1.75rem' }}>
        <Link to="/archive">The Archive</Link>
        <span style={{ margin: '0 0.5rem', opacity: 0.5 }}>/</span>
        <span style={{ color: 'var(--ink)' }}>The Inventory</span>
      </nav>

      {/* Room Header */}
      <header className="archive-masthead" style={{ textAlign: 'left', borderBottom: '2px solid var(--paper-line)', paddingBottom: '1.5rem', marginBottom: '3rem' }}>
        <span className="page-kicker">Room II — Museum Evidence Catalogue</span>
        <h1 className="page-title">The Inventory</h1>
        <p className="page-introduction" style={{ margin: 0 }}>
          An evidence catalogue of the six symbolic objects carried into the valley. Examine what each item protected, what it cost to carry, and what happens when it is set down.
        </p>
      </header>

      <div className="symbols-3x2-grid">
        {objectsList.map((obj) => (
          <Link 
            key={obj.slug || obj.id} 
            to={`/archive/inventory/${obj.slug}`}
            className="archive-card"
            style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', backgroundColor: '#f7f4ec', borderTop: '4px solid var(--color-brass)' }}
          >
            <div style={{
              width: '100%',
              height: '160px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.03)',
              borderRadius: '4px',
              marginBottom: '1.25rem',
              padding: '1rem'
            }}>
              <picture>
                <source srcSet={obj.image.replace('.png', '.avif')} type="image/avif" />
                <source srcSet={obj.image.replace('.png', '.webp')} type="image/webp" />
                <img 
                  src={obj.image} 
                  alt={obj.imageAlt || obj.name}
                  width="800"
                  height="800"
                  style={{ maxWidth: '75%', maxHeight: '75%', objectFit: 'contain' }}
                  loading="lazy"
                />
              </picture>
            </div>
            
            <span className="archive-catalog-label" style={{ color: 'var(--color-brass)' }}>{obj.catalogueNumber}</span>
            <h2 className="card-title" style={{ color: 'var(--ink)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>{obj.name}</h2>
            <p className="card-description" style={{ fontSize: 'var(--text-sm)', marginBottom: '1.25rem' }}>{obj.description}</p>
            
            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px dashed var(--paper-line)', fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--red)' }}>
              Examine Catalogue Record &rarr;
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
