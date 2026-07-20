import { test, expect } from '@playwright/test';

const viewports = [
  { width: 1440, height: 900 },
  { width: 1280, height: 800 },
  { width: 1024, height: 768 },
  { width: 834, height: 1194 },
  { width: 768, height: 1024 },
  { width: 430, height: 932 },
  { width: 390, height: 844 },
  { width: 360, height: 800 },
  { width: 320, height: 568 }
];

const routes = [
  '/',
  '/journey',
  '/journey/carry',
  '/journey/stage/valley',
  '/journey/result',
  '/journal',
  '/endings',
  '/almanac',
  '/archive',
  '/library',
  '/library/stories',
  '/dear-red',
  '/things-i-should-have-said'
];

test.describe('Responsive and Layout Tests', () => {
  for (const viewport of viewports) {
    test.describe(`Viewport: ${viewport.width}x${viewport.height}`, () => {
      test.use({ viewport });

      for (const route of routes) {
        test(`Route ${route} has no horizontal overflow`, async ({ page }) => {
          // Pre-populate legacy storage for some routes to avoid immediate redirects
          if (route.startsWith('/journey/stage/') || route === '/journey/result') {
            await page.addInitScript(() => {
              window.localStorage.setItem('applebanana_journey_state', JSON.stringify({
                object: 'compass',
                stage: 'valley'
              }));
            });
          }

          await page.goto(`http://localhost:5175${route}`);
          
          // Wait for hydration and potential layout shifts
          await page.waitForTimeout(1000);

          // The core assertion requested by the user
          const noOverflow = await page.evaluate(() => {
            return document.documentElement.scrollWidth <= window.innerWidth;
          });

          expect(noOverflow).toBeTruthy();
        });
      }
    });
  }
});
