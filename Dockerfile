# Puppeteer with Chromium 포함된 공식 이미지
FROM ghcr.io/puppeteer/puppeteer:latest

# 작업 디렉토리 설정
WORKDIR /app

# 프로젝트 파일 복사
COPY . .

# 필요한 라이브러리 설치 (Puppeteer에 필요함)
RUN apt-get update && apt-get install -y \
    fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 \
    libatk1.0-0 libcups2 libdbus-1-3 libgdk-pixbuf2.0-0 libnspr4 libnss3 \
    libxcomposite1 libxdamage1 libxrandr2 xdg-utils wget

# 패키지 설치
RUN npm install

# 환경 변수 및 포트 설정
ENV PORT=3000
EXPOSE 3000

# 앱 실행
CMD ["npm", "start"]
