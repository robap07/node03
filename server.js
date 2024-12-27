const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// Diretório para salvar os screenshots
const screenshotsDir = path.join(__dirname, 'prints');

// Cria a pasta se ela não existir
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir);
}

// Servir arquivos estáticos do diretório de screenshots
app.use('/screenshots', express.static(screenshotsDir));

// Função que tira o print da página e salva em arquivo
async function printScreen() {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Acessa a URL desejada
    await page.goto('https://previsao.inmet.gov.br/3101508');
    
    function delay(time) {
      return new Promise(function (resolve) {
        setTimeout(resolve, time)
      })
    }
    
    // Esperar por 10 segundos
    await delay(10000)
    
    console.log('Abriu o navegador e acessou a Netflix');

    // Define o caminho para salvar a imagem
    const timestamp = Date.now();
    const fileName = `screenshot-${timestamp}.png`;
    const filePath = path.join(screenshotsDir, fileName);

    // Salva o screenshot no arquivo
    await page.screenshot({ path: filePath });
    console.log(`Screenshot salvo em: ${filePath}`);

    // Alterar o tamanho da tela
  await page.setViewport({
    width: 1800,
    height: 1200,
    deviceScaleFactor: 1,
  })

    // Fecha o navegador
    await browser.close();

    return fileName; // Retorna apenas o nome do arquivo
  } catch (error) {
    console.error('Erro ao tirar o screenshot:', error);
    throw error;
  }
}

// Endpoint '/' Inicial
app.get('/', async (req, res) => {
  try {
    // Gera o screenshot e retorna o nome do arquivo
    const fileName = await printScreen();

    // Retorna a URL do arquivo
    const fileUrl = `${req.protocol}://${req.get('host')}/screenshots/${fileName}`;
    res.json({ url: fileUrl });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar o screenshot' });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
