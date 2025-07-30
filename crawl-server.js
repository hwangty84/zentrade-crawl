const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 테스트용 GET 엔드포인트 추가
app.get("/", (req, res) => {
  res.send("Puppeteer server is running!");
});

app.post("/", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "Missing URL" });
  }

  try {
    const browser = await puppeteer.launch({
      headless: true, // "new" 대신 true
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // render에서 필수
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    const content = await page.content();
    await browser.close();

    res.json({ html: content });
  } catch (error) {
    console.error("Crawling error:", error.message);
    res.status(500).json({ error: "Scraping failed", detail: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

