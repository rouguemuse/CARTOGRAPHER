import React, { useState, useMemo } from 'react';
import { almanacData } from '../data/almanacData';
import './Almanac.css';

export default function Almanac() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Entries' },
    { id: 'places', label: 'Places' },
    { id: 'objects', label: 'Objects' },
    { id: 'creatures', label: 'Creatures' },
    { id: 'alteredDefinitions', label: 'Altered Definitions' }
  ];

  const filteredData = useMemo(() => {
    let combinedData = [];
    
    Object.keys(almanacData).forEach(key => {
      almanacData[key].forEach(item => {
        combinedData.push({ ...item, category: key });
      });
    });

    return combinedData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'all' || activeCategory === item.category;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="almanac-page">
      <div className="almanac-container">
        <header className="almanac-header">
          <h1 className="almanac-title">The Almanac</h1>
          <p className="almanac-subtitle">A comprehensive index of the known and the imagined.</p>
          
          <div className="almanac-controls">
            <input 
              type="text" 
              placeholder="Search entries..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="almanac-search"
            />
            <div className="almanac-filters">
              {categories.map(cat => (
                <button 
                  key={cat.id}
                  className={`almanac-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="almanac-grid">
          {filteredData.length > 0 ? (
            filteredData.map((item, idx) => (
              <article key={idx} className="almanac-card">
                <div className="almanac-card-header">
                  <span className="almanac-category-label">{item.category}</span>
                </div>
                <h3 className="almanac-card-title">{item.name}</h3>
                <p className="almanac-card-description">{item.description}</p>
                <div className="almanac-card-tags">
                  {item.tags.map(tag => (
                    <span key={tag} className="almanac-tag">{tag}</span>
                  ))}
                </div>
              </article>
            ))
          ) : (
            <div className="almanac-empty">No entries found matching your criteria.</div>
          )}
        </div>
      </div>
    </div>
  );
}
