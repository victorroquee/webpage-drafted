import puppeteer from 'puppeteer-core';
import path from 'path';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const root='/Users/victorroque/Desktop/webpage-drafted';
const jobs=[
  {file:'assets/anim/mascot.html', w:640, h:600, ms:6000, out:'mascot'},
  {file:'assets/anim/network.html', w:900, h:740, ms:8000, out:'network'},
];
const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--hide-scrollbars']});
for(const j of jobs){
  const p=await b.newPage();
  await p.setViewport({width:j.w,height:j.h,deviceScaleFactor:2});
  await p.goto('file://'+path.join(root,j.file),{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,800));
  const rec=await p.screencast({path:path.join(root,'deliverables/anim',j.out+'.webm')});
  await new Promise(r=>setTimeout(r,j.ms));
  await rec.stop();
  await p.close();
  console.log('recorded',j.out);
}
await b.close();
