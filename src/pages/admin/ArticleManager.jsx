import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, doc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function ArticleManager() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  // Editor state
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    collection: 'Stories from the Archive',
    excerpt: '',
    body: '',
    coverImage: '',
    author: 'Jayme Volstad',
    isFeatured: false,
    status: 'draft'
  });

  const collections = [
    'Stories from the Archive',
    'Field Guide to Other People\'s Weather',
    'Inventory of Left Objects',
    'Glossary of Necessary Silence'
  ];

  useEffect(() => {
    const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const arts = [];
      snapshot.forEach((doc) => {
        arts.push({ id: doc.id, ...doc.data() });
      });
      setArticles(arts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEdit = (article) => {
    setEditingId(article.id);
    setFormData({
      title: article.title || '',
      collection: article.collection || 'Stories from the Archive',
      excerpt: article.excerpt || '',
      body: article.body || '',
      coverImage: article.coverImage || '',
      author: article.author || 'Jayme Volstad',
      isFeatured: article.isFeatured || false,
      status: article.status || 'draft'
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      title: '', collection: 'Stories from the Archive', excerpt: '', body: '', coverImage: '', author: 'Jayme Volstad', isFeatured: false, status: 'draft'
    });
  };



  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'articles', editingId), {
          ...formData,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'articles'), {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      handleCancel();
      alert('Saved successfully!');
    } catch (err) {
      console.error('Error saving article:', err);
      alert('Failed to save. Check permissions.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to completely delete this entry?")) {
      await updateDoc(doc(db, 'articles', id), {
        status: 'archived',
        deletedAt: serverTimestamp()
      });
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    await updateDoc(doc(db, 'articles', id), { status: newStatus });
  };

  // Helper to render special fields based on collection
  const renderSpecialFields = () => {
    if (formData.collection === 'Field Guide to Other People\'s Weather') {
      return (
        <div style={{background: 'rgba(255,255,255,0.05)', padding: '1rem', marginBottom: '1rem'}}>
          <p style={{fontSize: '0.8rem', color: 'var(--color-bone)', marginBottom: '0.5rem', fontStyle: 'italic'}}>
            For Field Guide entries, structure your body text like this:<br/>
            <strong>**Weather:**</strong> Sudden frost<br/>
            <strong>**Common signs:**</strong> Short answers...<br/>
            <strong>**What the traveler assumes:**</strong> *I must have done something wrong.*<br/>
            <strong>**Cartographer’s note:**</strong> A change in temperature is information...
          </p>
        </div>
      );
    }
    if (formData.collection === 'Inventory of Left Objects') {
      return (
        <div style={{background: 'rgba(255,255,255,0.05)', padding: '1rem', marginBottom: '1rem'}}>
          <p style={{fontSize: '0.8rem', color: 'var(--color-bone)', marginBottom: '0.5rem', fontStyle: 'italic'}}>
            For Inventory entries, structure your body text like this:<br/>
            <strong>**Object:**</strong> One red coat<br/>
            <strong>**Last known location:**</strong> The Valley of Please Understand Me<br/>
            <strong>**Condition:**</strong> Worn thin at the pockets<br/>
            <strong>**Reason abandoned:**</strong> It had become armor...<br/>
            <strong>**Current status:**</strong> Recovered
          </p>
        </div>
      );
    }
    if (formData.collection === 'Glossary of Necessary Silence') {
      return (
        <div style={{background: 'rgba(255,255,255,0.05)', padding: '1rem', marginBottom: '1rem'}}>
          <p style={{fontSize: '0.8rem', color: 'var(--color-bone)', marginBottom: '0.5rem', fontStyle: 'italic'}}>
            For Glossary entries, the Title is the Word (e.g. "Fine"). The Body should just be the poetic definition.
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{maxWidth: '1000px', margin: '0 auto'}}>
      <h1 style={{fontFamily: 'var(--font-display)', marginBottom: '1rem'}}>Article Manager</h1>
      <p style={{marginBottom: '2rem', color: 'var(--color-bone)'}}>Create and manage entries across the four library collections.</p>

      {/* Editor Form */}
      <div style={{background: 'var(--color-charcoal)', padding: '2rem', border: '1px solid var(--color-charcoal-light)', marginBottom: '3rem'}}>
        <h2 style={{fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '1.5rem'}}>{editingId ? 'Edit Entry' : 'New Entry'}</h2>
        
        <form onSubmit={handleSave}>
          <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
            <div style={{flex: 2}}>
              <label className="archive-small-label" style={{color: 'var(--color-bone)'}}>Title / Word / Object Name</label>
              <input type="text" name="title" required value={formData.title} onChange={handleChange} style={{width: '100%', padding: '0.5rem', background: 'var(--color-obsidian)', color: 'white', border: '1px solid var(--color-charcoal-light)'}} />
            </div>
            <div style={{flex: 1}}>
              <label className="archive-small-label" style={{color: 'var(--color-bone)'}}>Collection</label>
              <select name="collection" value={formData.collection} onChange={handleChange} style={{width: '100%', padding: '0.5rem', background: 'var(--color-obsidian)', color: 'white', border: '1px solid var(--color-charcoal-light)'}}>
                {collections.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
            <div style={{flex: 1}}>
              <label className="archive-small-label" style={{color: 'var(--color-bone)'}}>Cover Image URL (Optional)</label>
              <input type="text" name="coverImage" placeholder="/the_red_coat_1784321127486.png" value={formData.coverImage} onChange={handleChange} style={{width: '100%', padding: '0.5rem', background: 'var(--color-obsidian)', color: 'white', border: '1px solid var(--color-charcoal-light)'}} />
            </div>
            <div style={{flex: 1}}>
              <label className="archive-small-label" style={{color: 'var(--color-bone)'}}>Author</label>
              <input type="text" name="author" required value={formData.author} onChange={handleChange} style={{width: '100%', padding: '0.5rem', background: 'var(--color-obsidian)', color: 'white', border: '1px solid var(--color-charcoal-light)'}} />
            </div>
          </div>

          <div style={{marginBottom: '1rem'}}>
            <label className="archive-small-label" style={{color: 'var(--color-bone)'}}>Excerpt / Short Description</label>
            <textarea name="excerpt" rows="2" value={formData.excerpt} onChange={handleChange} style={{width: '100%', padding: '0.5rem', background: 'var(--color-obsidian)', color: 'white', border: '1px solid var(--color-charcoal-light)'}} />
          </div>

          {renderSpecialFields()}

          <div style={{marginBottom: '1.5rem'}}>
            <label className="archive-small-label" style={{color: 'var(--color-bone)'}}>Body (Supports Markdown/HTML)</label>
            <textarea name="body" rows="12" required value={formData.body} onChange={handleChange} style={{width: '100%', padding: '0.5rem', background: 'var(--color-obsidian)', color: 'white', border: '1px solid var(--color-charcoal-light)', fontFamily: 'monospace'}} placeholder="Write your entry here..." />
          </div>

          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{display: 'flex', gap: '2rem'}}>
              <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem'}}>
                <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} />
                Featured Story
              </label>
              <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem'}}>
                <select name="status" value={formData.status} onChange={handleChange} style={{background: 'var(--color-obsidian)', color: 'white', border: '1px solid var(--color-charcoal-light)', padding: '0.2rem'}}>
                  <option value="draft">Save as Draft</option>
                  <option value="published">Publish Immediately</option>
                </select>
              </label>
            </div>
            <div style={{display: 'flex', gap: '1rem'}}>
              {editingId && <button type="button" className="btn" style={{background: 'transparent', color: 'var(--color-bone)', border: '1px solid var(--color-bone)'}} onClick={handleCancel}>Cancel</button>}
              <button type="submit" className="btn btn-primary">{editingId ? 'Update Entry' : 'Create Entry'}</button>
            </div>
          </div>
        </form>
      </div>

      {/* List of Entries */}
      <h2 style={{fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '1rem'}}>All Entries</h2>
      {loading ? (
        <p>Loading articles...</p>
      ) : (
        <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left'}}>
          <thead>
            <tr style={{borderBottom: '1px solid var(--color-charcoal-light)'}}>
              <th style={{padding: '0.5rem', color: 'var(--color-bone)', fontWeight: 'normal'}}>Title</th>
              <th style={{padding: '0.5rem', color: 'var(--color-bone)', fontWeight: 'normal'}}>Collection</th>
              <th style={{padding: '0.5rem', color: 'var(--color-bone)', fontWeight: 'normal'}}>Status</th>
              <th style={{padding: '0.5rem', color: 'var(--color-bone)', fontWeight: 'normal'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(art => (
              <tr key={art.id} style={{borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                <td style={{padding: '1rem 0.5rem'}}><strong>{art.title}</strong>{art.isFeatured && ' ★'}</td>
                <td style={{padding: '1rem 0.5rem', color: 'var(--color-bone)'}}>{art.collection}</td>
                <td style={{padding: '1rem 0.5rem'}}>
                  <span style={{color: art.status === 'published' ? '#88cc88' : 'var(--color-bone)'}}>
                    {art.status.toUpperCase()}
                  </span>
                </td>
                <td style={{padding: '1rem 0.5rem'}}>
                  <div style={{display: 'flex', gap: '0.5rem'}}>
                    <button onClick={() => handleEdit(art)} style={{background: 'transparent', color: 'var(--color-bone)', border: 'none', cursor: 'pointer', textDecoration: 'underline'}}>Edit</button>
                    {art.status === 'draft' ? (
                      <button onClick={() => handleUpdateStatus(art.id, 'published')} style={{background: 'transparent', color: '#88cc88', border: 'none', cursor: 'pointer', textDecoration: 'underline'}}>Publish</button>
                    ) : (
                      <button onClick={() => handleUpdateStatus(art.id, 'draft')} style={{background: 'transparent', color: 'var(--color-bone)', border: 'none', cursor: 'pointer', textDecoration: 'underline'}}>Unpublish</button>
                    )}
                    <button onClick={() => handleDelete(art.id)} style={{background: 'transparent', color: 'var(--red-bright)', border: 'none', cursor: 'pointer', textDecoration: 'underline'}}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
