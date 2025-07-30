const express = require("express");
const puppeteer = require("puppeteer");
const app = express();

const PORT = process.env.PORT || 3000;

console.log("✅ 서버 시작 준비 중...");

app.use(express.json());

app.post("/", async (req, res) => {
  const { url } = req.body;
  console.log("🔔 요청 수신:", url);

  if (!url) {
    console.error("❌ URL 없음");
    return res.status(400).send("Missing URL");
  }

  try {
    console.log("🚀 Puppeteer 실행 시작...");
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    console.log("🧭 새 페이지 열기");
    const page = await browser.newPage();
    await page.goto(url);
    console.log("📄 페이지 접속 완료");

    const title = await page.title();
    console.log("✅ 페이지 타이틀 추출:", title);

    await browser.close();
    console.log("🛑 브라우저 종료");

    res.send({ title });
  } catch (err) {
    console.error("💥 크롤링 중 오류 발생:", err);
    res.status(500).send("Error during crawl");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
