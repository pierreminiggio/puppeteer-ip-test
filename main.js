'use strict';

const args = process.argv

if (args.length !== 3) {
    console.log('use like this : node main.js <proxy>')
    process.exit()
}

const puppeteer = require('puppeteer');
(async() => {
  const browser = await puppeteer.launch({
    args: [
        '--proxy-server=' + args[2],
        '--no-sandbox'
    ]
  });
  const page = await browser.newPage();
  try {
    await page.goto('https://api.myip.com');
  } catch(error) {
      console.log(error)
      await browser.close()

      return
  }
  
  const html = await page.evaluate(() => {
      return document.body.outerHTML
  })
  console.log(html)
  await browser.close();
})();
