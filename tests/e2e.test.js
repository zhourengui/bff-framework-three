const playwright = require('playwright');
const expect = require('chai').expect;

(async () => {
    const browser = await playwright['chromium'].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:3001/books/list');
    const content = await page.textContent("#btn");
    expect(content).equal('点击1');
    await page.screenshot({
        path: `report/example-chromium.png`
    });
    await browser.close();
})();