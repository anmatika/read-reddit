const puppeteer = require('puppeteer');

(async() => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('https://bitcointalk.org/index.php?board=1.0');
  await page.screenshot({ path: 'example.png' });
  // await page.pdf({ path: 'hn.pdf', format: 'A4' });
  // Wait for the results page to load and display the results.
  const resultsSelector = '[id^=\'msg_\']';
  await page.waitForSelector(resultsSelector);

  const resultsSelector = '';

  // Extract the results from the page.
  const links = await page.evaluate((resultsSelector) => {
    const anchors = Array.from(document.querySelectorAll(resultsSelector));
    return anchors.map((anchor) => {
      const title = anchor.textContent.split('|')[0].trim();
      return `${title} - ${anchor.href}`;
    });
  }, resultsSelector);
  await browser.close();
})();
