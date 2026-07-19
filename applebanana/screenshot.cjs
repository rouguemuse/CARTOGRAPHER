const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto('http://localhost:5173');
  // Wait for images to load
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'C:\\\\Users\\\\rougu\\\\.gemini\\\\antigravity\\\\brain\\\\c58085ae-7e7b-40e3-bb23-9d5ae3b09a4a\\\\mobile_restored.png', fullPage: true });
  await browser.close();
})();