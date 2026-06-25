import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'url';
import path from 'path';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const url = 'file://' + path.join(root, 'draft-board.html');

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1500, height: 1200, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 800));

// preview screenshot of the board (top portion)
await page.screenshot({ path: path.join(root, 'assets/img/board-preview.png') });

const height = await page.evaluate(() => document.body.scrollHeight);
await page.pdf({
  path: path.join(root, 'deliverables/Drafted-Landing-Rascunho.pdf'),
  printBackground: true,
  width: '1500px',
  height: (height + 20) + 'px',
  pageRanges: '1',
  margin: { top: 0, bottom: 0, left: 0, right: 0 },
});
console.log('PDF generated, content height =', height);
await browser.close();
