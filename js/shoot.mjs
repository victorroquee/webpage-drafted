import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'url';
import path from 'path';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const theme = process.argv[2] || 'cream';            // cream | light
const file = theme === 'light' ? 'index-light.html' : 'index.html';
const suffix = theme === 'light' ? '-light' : '';
const url = 'file://' + path.join(root, file);

const sections = [
  { sel: '.hero', name: 'hero' },
  { sel: '#shift', name: 'shift' },
  { sel: '#what', name: 'what' },
  { sel: '#products', name: 'products' },
  { sel: '#method', name: 'method' },
  { sel: '#network', name: 'network' },
  { sel: '.proof', name: 'proof' },
  { sel: '#contact', name: 'contact' },
];

const browser = await puppeteer.launch({
  executablePath: CHROME, headless: 'new',
  args: ['--hide-scrollbars', '--force-device-scale-factor=2'],
});
const page = await browser.newPage();
// neutralize counter rAF so finals stick
await page.evaluateOnNewDocument(() => { window.requestAnimationFrame = () => 0; });
await page.goto(url, { waitUntil: 'networkidle0' });
await page.addStyleTag({ content: `.reveal{opacity:1!important;transform:none!important}` });

const total = await page.evaluate(() => document.body.scrollHeight);
await page.setViewport({ width: 1440, height: Math.min(total, 16000), deviceScaleFactor: 2 });
await new Promise(r => setTimeout(r, 500));
// finalize counters + score bars
await page.evaluate(() => {
  document.querySelectorAll('[data-count]').forEach(el => el.textContent = (+el.dataset.count).toLocaleString('pt-BR'));
  document.querySelectorAll('.score-bar i').forEach(el => el.style.width = el.dataset.w);
});
await new Promise(r => setTimeout(r, 400));

for (const s of sections) {
  const box = await page.evaluate((sel) => {
    const el = document.querySelector(sel); if (!el) return null;
    const r = el.getBoundingClientRect();
    return { y: r.top + window.scrollY, h: r.height };
  }, s.sel);
  if (!box) { console.log('missing', s.sel); continue; }
  await page.screenshot({
    path: path.join(root, `assets/img/sec-${s.name}${suffix}.png`),
    clip: { x: 0, y: Math.round(box.y), width: 1440, height: Math.round(box.h) },
  });
  console.log('shot', s.name + suffix);
}
await page.screenshot({ path: path.join(root, `assets/img/full-page${suffix}.png`), fullPage: true });
console.log('shot full' + suffix);
await browser.close();
