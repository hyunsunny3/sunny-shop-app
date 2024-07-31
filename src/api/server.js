require('dotenv').config(); // .env 파일의 변수를 로드

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL 연결 설정
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // 환경 변수에서 데이터베이스 URL 가져오기
});

app.use(cors());
app.use(express.json()); // JSON 요청 본문을 파싱하기 위해 추가

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
