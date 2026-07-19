const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });
  await page.goto('http://localhost:5173');
  // Wait for images to load
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'C:\\\\Users\\\\rougu\\\\.gemini\\\\antigravity\\\\brain\\\\c58085ae-7e7b-40e3-bb23-9d5ae3b09a4a\\\\desktop_restored.png', fullPage: true });
  await browser.close();
})();