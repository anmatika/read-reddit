
const fs = require('fs');
const puppeteer = require('puppeteer');

const ScrapeInfinite = (opts) => {
  if (!opts || !opts.url) {
    throw new Error('url is not given.');
  }

  const { url, itemTargetCount = 5, headless = true } = opts;

  function extractItems() {
    const extractedElements = document.querySelectorAll('.scrollerItem a h2');
    return Array.from(extractedElements).map(e => e.innerText);
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

    fs.writeFileSync('./items.txt', `${items.join('\n')}\n`);
    console.log('items', items);

    // Close the browser.
    await browser.close();
  };

  return {
    execute,
  };
};

export default ScrapeInfinite;
