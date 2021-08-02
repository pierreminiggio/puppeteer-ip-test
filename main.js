'use strict';

import puppeteer from 'puppeteer'
import proxyLogin from '@pierreminiggio/puppeteer-proxy-login'

(async() => {

  const {alterPuppeteerOptions, pageAuthenticate} = proxyLogin(process.argv.length ? process.argv[2] : null)
  
  /** @type {import('puppeteer').BrowserLaunchArgumentOptions} */
  const puppeteerOptions = {
    args: [
      '--no-sandbox'
    ]
  }
  alterPuppeteerOptions(puppeteerOptions)

  const browser = await puppeteer.launch(puppeteerOptions);
  const page = await browser.newPage();

  await pageAuthenticate(page)

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
