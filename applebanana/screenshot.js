const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  
  // Desktop Full Page
  const pageDesk = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageDesk.goto('http://localhost:5173');
  await pageDesk.waitForTimeout(2000); // wait for animations and fonts
  await pageDesk.screenshot({ path: 'desktop_landing.png', fullPage: true });

  // Mobile Full Page
  const pageMob = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await pageMob.goto('http://localhost:5173');
  await pageMob.waitForTimeout(2000);
  await pageMob.screenshot({ path: 'mobile_landing.png', fullPage: true });

  await browser.close();
})();