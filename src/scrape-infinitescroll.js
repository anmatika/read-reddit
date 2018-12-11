
const fs = require('fs');
const puppeteer = require('puppeteer');

const ScrapeInfinite = (opts) => {
  if (!opts || !opts.url) {
    throw new Error('url is not given.');
  }

  const { url, itemTargetCount = 5, headless = true } = opts;

  function extractItems() {
    const extractedElements = document.querySelectorAll('.scrollerItem a[data-click-id=body]');

    return Array.from(extractedElements).map(e => ({ url: e.href, title: e.innerText }));
  }

  function extractComments() {
    const extractedElements = document.querySelectorAll('.Comment p');
    return Array.from(extractedElements).map(e => ({ comment: e.innerText }));

  }

  async function scrapeComments(page, fnExtractComments) {

    const comments = await page.evaluate(fnExtractComments);
    return comments.map(c => (
      {
        ...c,
        url: page.url(),
      }
    ));
  }

  async function scrapeInfiniteScrollItems(
    page,
    fnExtractItems,
    scrollDelay = 1000,
  ) {
    let items = [];
    try {
      let previousHeight;
      while (items.length < itemTargetCount) {
        items = await page.evaluate(fnExtractItems);
        previousHeight = await page.evaluate('document.body.scrollHeight');
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
        await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
        await page.waitFor(scrollDelay);
      }
    } catch (e) { console.log('error', e); }
    return items;
  }

  const execute = async() => {
  // Set up browser and page.
    const browser = await puppeteer.launch({
      headless,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    page.setViewport({ width: 1280, height: 926 });

    await page.goto(url);

    // Scroll and extract items from the page.
    const items = await scrapeInfiniteScrollItems(page, extractItems);

    fs.writeFileSync('./items.json', JSON.stringify(items));
    console.log('items', items);
    const allComments = [];
    for (const item of items) {

      await page.goto(item.url);
      const comments = await scrapeComments(page, extractComments);
      console.log('comments', comments);

      allComments.push(comments);

    }

    fs.writeFileSync('./comments.json', JSON.stringify(allComments));

    // Close the browser.
    await browser.close();
  };

  return {
    execute,
  };
};

export default ScrapeInfinite;
