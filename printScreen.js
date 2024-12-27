const puppeteer = require('puppeteer');

(async () => {
  // Inicializa o navegador
  const browser = await puppeteer.launch({ headless: false }); // Defina headless: true para rodar sem UI
  const page = await browser.newPage();

  // Acessa a URL
  console.log('Abrindo o navegador e acessando a página...');
  await page.goto('https://www.windy.com/pt/-Chuva-trov%C3%A3o-rain?rain,-22.451,-42.681,8', { waitUntil: 'networkidle2' });

  // Aguarda o conteúdo renderizar (ajuste o seletor conforme necessário)
  console.log('Aguardando o conteúdo principal...');
  await page.waitForTimeout(5000); // Aguarda 5 segundos ou use await page.waitForSelector('css-selector');

  // Tira um screenshot
  console.log('Tirando screenshot...');
  await page.screenshot({ path: 'screenshot.png' });
  console.log('Screenshot salvo como screenshot.png');

  // Fecha o navegador
  await browser.close();
})();

