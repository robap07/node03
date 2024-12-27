const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.windy.com/pt/-Chuva-trov%C3%A3o-rain?rain,2024122921,-22.451,-42.681,8');

  console.log('Abriu o navegador, acessou a Netflix');
  await page.screenshot({ path: 'screenshot.png' });

})();
