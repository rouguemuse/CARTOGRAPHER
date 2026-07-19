import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import DOMPurify from 'dompurify';

export default function ArticleView() {
  const { collection, slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Actually we query by slug or ID. 
    // Usually it's an ID if we don't have slugs.
    // Let's assume we query the 'articles' collection for this slug.
    const fetchArticle = async () => {
      try {
        // Find article where slug == slug and status == 'published'
        // For now, let's just query it by ID if it's an ID, or we need a query
        // We'll implement this properly in the rebuild task.
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchArticle();
  }, [collection, slug]);

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#1c1917] p-8">
      Loading...
    </div>
  );
}
