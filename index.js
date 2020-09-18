const puppeteer = require('puppeteer');

(async () => {

    const browser = await puppeteer.launch({headless: true}); // change this to {headless: false} if you want to check what happens
    const page = await browser.newPage();

    // insert your cookies here
    const cookies = [{
        'name': 'url.org',
        'value': '==',
        'domain': '.url.org'
    },
    {
        'name': 'ASP.NET_SessionId',
        'value': '1a2b3c4d5e6f7g8h9j',
        'domain': 'url.org'
    },
];
    
  await page.setCookie(...cookies);
// Adjustments particular to this page to ensure we hit desktop breakpoint.
    page.setViewport({width: 1920, height: 1000000, deviceScaleFactor: 2});

    await page.goto(' insert your book url here ', {waitUntil: 'networkidle2'});

    /**
     * Takes a screenshot of a DOM element on the page, with optional padding.
     *
     * @param {!{path:string, selector:string, padding:(number|undefined)}=} opts
     * @return {!Promise<!Buffer>}
     */
    async function screenshotDOMElement(opts = {}) {
        const padding = 'padding' in opts ? opts.padding : 0;
        const path = 'path' in opts ? opts.path : null;
        const selector = opts.selector;

        if (!selector)
            throw Error('Please provide a selector.');

        const rect = await page.evaluate(selector => {
            const element = document.querySelector(selector);
            if (!element)
                return null;
            const {x, y, width, height} = element.getBoundingClientRect();
            return {left: x, top: y, width, height, id: element.id};
        }, selector);

        if (!rect)
            throw Error(`Could not find element that matches selector: ${selector}.`);

        return await page.screenshot({
            path,
            clip: {
                x: rect.left - padding,
                y: rect.top - padding,
                width: rect.width + padding * 2,
                height: rect.height + padding * 2
            }
        });
    }
    await screenshotDOMElement({
        path: '1.png', // first image savelocation (no need to change)
        selector: '.EpubArtikel', // this is the selector for your div that contains your page
        padding: 0
    });
    i=1;
    while (true){
        await page.click('.volgendeKnop'); // this is the selector for the button that will be pressed to go to the next page
        await page.waitForSelector('.EpubArtikel');
        await screenshotDOMElement({
            path: i+'.png', // other images save location (no need to change)
            selector: '.EpubArtikel', // this is the selector for your div that contains your page
            padding: 0
        });
        i++;
    }
    browser.close();
})();