import puppeteer from 'puppeteer';

const URL = 'http://localhost:5175/';
const browser = await puppeteer.launch();

async function shot(name, w, h, action) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await page.goto(URL, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));
  if (action) await action(page);
  await page.screenshot({ path: name });
  await page.close();
  console.log('wrote', name);
}

// desktop rest state
await shot('qa-desktop.png', 1440, 900);
// desktop hover data-science (left)
await shot('qa-hover-data.png', 1440, 900, async (page) => {
  await page.hover('a[data-panel="dataScience"]');
  await new Promise((r) => setTimeout(r, 900));
});
// desktop hover ai-studio (right)
await shot('qa-hover-ai.png', 1440, 900, async (page) => {
  await page.hover('a[data-panel="aiStudio"]');
  await new Promise((r) => setTimeout(r, 900));
});
// mobile
await shot('qa-mobile.png', 390, 844);
// tablet
await shot('qa-tablet.png', 834, 1112);

await browser.close();
