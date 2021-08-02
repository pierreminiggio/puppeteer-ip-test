'use strict';

const puppeteer = require('puppeteer');
(async() => {
  const browser = await puppeteer.launch({
    args: [
        '--no-sandbox'
    ]

    if (process.argv.length !== 3) {
        args.push('--proxy-server=' + process.argv[2])
    }

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
