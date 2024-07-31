require('dotenv').config(); // .env 파일의 변수를 로드

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL 연결 설정
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // 환경 변수에서 데이터베이스 URL 가져오기
});

// CORS 설정
app.use(cors());
app.use(express.json()); // JSON 요청 본문을 파싱하기 위해 추가

// Multer 설정 (파일 업로드)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // 파일이 저장될 경로
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // 파일 이름 설정
  }
});

const upload = multer({ storage });

// 이미지 업로드 엔드포인트
app.post('/image', upload.single('image'), (req, res) => {
  if (req.file) {
    res.json({ imageUrl: req.file.path }); // 업로드한 이미지의 경로 반환
  } else {
    res.status(400).send('No file uploaded.');
  }
});

// 상품 등록 API
app.post('/products', async (req, res) => {
  const { name, description, seller, price, imageUrl } = req.body;
  
  try {
    const result = await pool.query(
      'INSERT INTO products (name, description, seller, price, imageUrl) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, seller, price, imageUrl]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
