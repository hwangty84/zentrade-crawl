# Puppeteer 공식 이미지 사용
FROM ghcr.io/puppeteer/puppeteer:latest

# 루트 사용자로 전환 (기본이 root이긴 하지만 명시적으로 설정)
USER root

# 작업 디렉토리 설정
WORKDIR /app

# 프로젝트 파일 복사
COPY . .

# Puppeteer가 필요로 하는 라이브러리 설치
RUN apt-get update && apt-get install -y \
    fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 \
    libatk1.0-0 libcups2 libdbus-1-3 libgdk-pixbuf2.0-0 libnspr4 libnss3 \
    libxcomposite1 libxdamage1 libxrandr2 xdg-utils wget

# 의존성 설치
RUN npm install

# 서버 시작 명령어
CMD ["npm", "start"]
