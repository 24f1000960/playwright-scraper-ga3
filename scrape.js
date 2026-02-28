const { chromium } = require('playwright');

const urls = [
  'https://sanand0.github.io/tdsdata/js_table/?seed=68',
  'https://sanand0.github.io/tdsdata/js_table/?seed=69',
  'https://sanand0.github.io/tdsdata/js_table/?seed=70',
  'https://sanand0.github.io/tdsdata/js_table/?seed=71',
  'https://sanand0.github.io/tdsdata/js_table/?seed=72',
  'https://sanand0.github.io/tdsdata/js_table/?seed=73',
  'https://sanand0.github.io/tdsdata/js_table/?seed=74',
  'https://sanand0.github.io/tdsdata/js_table/?seed=75',
  'https://sanand0.github.io/tdsdata/js_table/?seed=76',
  'https://sanand0.github.io/tdsdata/js_table/?seed=77',
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let grandTotal = 0;

  for (const url of urls) {
    await page.goto(url, { waitUntil: 'networkidle' });

    // Wait for table to load
    await page.waitForSelector('table');

    const sum = await page.evaluate(() => {
      let total = 0;
      document.querySelectorAll('td').forEach(cell => {
        const val = parseFloat(cell.innerText);
        if (!isNaN(val)) total += val;
      });
      return total;
    });

    console.log(`Sum for ${url}: ${sum}`);
    grandTotal += sum;
  }

  console.log(`Total sum across all pages: ${grandTotal}`);
  await browser.close();
})();
