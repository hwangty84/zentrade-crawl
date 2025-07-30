const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
app.use(express.json());

app.post('/crawl', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).send({ error: 'URL이 필요합니다' });
  }

  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: 'new',
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const title = await page.title();
    await browser.close();

    res.send({ title });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버 실행 중! http://localhost:${PORT}`);
});
