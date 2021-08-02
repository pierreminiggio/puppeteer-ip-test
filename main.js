'use strict';

const puppeteer = require('puppeteer');

(async() => {

  const args = [
    '--no-sandbox'
  ]

  let proxy = null
  let needsAuth = false
  let username = null
  let password = null

  if (process.argv.length === 3) {
    const inputProxy = process.argv[2]
    const splitProxy = inputProxy.split('@')
    needsAuth = splitProxy.length > 1

    if (needsAuth) {
      const usernameAndPasswordAndMethod = splitProxy[0]
      const methodSeparator = '://'
      const splitUsernameAndPasswordAndMethod = usernameAndPasswordAndMethod.split(methodSeparator)
      const method = splitUsernameAndPasswordAndMethod[0]
      const usernameAndPassword = splitUsernameAndPasswordAndMethod[1]
      const splitUsernameAndPassword = usernameAndPassword.split(':')
      username = splitUsernameAndPassword[0]
      password = splitUsernameAndPassword[1]
      proxy = method + methodSeparator + splitProxy[1]
    } else {
      proxy = inputProxy
    }
  }

  if (proxy) {
    args.push('--proxy-server=' + proxy)
  }
  

  const browser = await puppeteer.launch({args});
  const page = await browser.newPage();

  if (needsAuth) {
    await page.authenticate({username, password})
  }

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
