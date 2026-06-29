const puppeteer = require('puppeteer-core');
const path = require('path');
(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new', args: ['--no-sandbox']
  });
  const url = 'file://' + path.resolve('index-light.html');
  const p = await browser.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await p.goto(url, { waitUntil: 'networkidle0' });
  await p.evaluate(() => document.querySelectorAll('.reveal').forEach(e => e.classList.add('in')));
  await new Promise(r => setTimeout(r, 700));
  await (await p.$('#audience')).screenshot({ path: '/tmp/aud.png' });
  console.log('ERRORS:', errs.length ? errs.join(' | ') : 'NONE');
  await browser.close();
})();
