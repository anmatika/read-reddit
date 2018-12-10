const fs = require('fs');
const puppeteer = require('puppeteer');

function extractItems() {
  const extractedElements = document.querySelectorAll('.scrollerItem a h2');
  return Array.from(extractedElements).map(e => e.innerText);
}

async function scrapeInfiniteScrollItems(
  page,
  fnExtractItems,
  itemTargetCount,
  scrollDelay = 1000,
) {
  console.log('scrapeInfiniteScrollItems', itemTargetCount);
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

(async() => {
  // Set up browser and page.
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 926 });

  await page.goto('https://www.reddit.com/r/Bitcoin/');

  // Scroll and extract items from the page.
  const items = await scrapeInfiniteScrollItems(page, extractItems, 5);

  fs.writeFileSync('./items.txt', `${items.join('\n')}\n`);
  console.log('items', items);

  // Close the browser.
  await browser.close();
})();
