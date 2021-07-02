'use strict';

const puppeteer = require('puppeteer');
(async() => {
  const browser = await puppeteer.launch({
    args: [
        //'--proxy-server=http://ip:port'
        '--no-sandbox'
    ]
  });
  const page = await browser.newPage();
  await page.goto('https://api.myip.com');
  const html = await page.evaluate(() => {
      return document.body.outerHTML
  })
  console.log(html)
  await browser.close();
})();