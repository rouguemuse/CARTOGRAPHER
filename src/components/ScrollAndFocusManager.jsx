import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollAndFocusManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Focus management: Wait a tick for render
    setTimeout(() => {
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.focus({ preventScroll: true });
      } else {
        const h1 = document.querySelector('h1');
        if (h1) {
          h1.setAttribute('tabindex', '-1');
          h1.focus({ preventScroll: true });
        }
      }
    }, 0);
  }, [pathname]);

  return null;
}
