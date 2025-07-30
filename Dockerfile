
# Puppeteer 공식 이미지 사용 (크롬 포함)
FROM ghcr.io/puppeteer/puppeteer:latest

# 작업 디렉토리 설정
WORKDIR /app

# 프로젝트 파일 복사
COPY . .

# 포트 환경 변수 설정
ENV PORT=3000

# 컨테이너에서 열 포트 지정
EXPOSE 3000

# 의존성 설치
RUN npm install

# 서버 시작 명령어
CMD ["npm", "start"]
