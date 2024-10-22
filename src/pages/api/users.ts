// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// 데이터베이스 연결 설정
// .env 파일 로드
dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST, // MySQL 호스트
  port: process.env.DB_PORT, // MySQL 포트
  user: process.env.DB_USER, // MySQL 사용자 이름
  password: process.env.DB_PASSWORD, // MySQL 비밀번호
  database: process.env.DB_NAME, // MySQL 데이터베이스 이름
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // SQL 쿼리 실행
    const [rows] = await db.query('SELECT * FROM users'); // users 테이블에서 데이터 조회
    res.status(200).json(rows); // 결과 반환
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Database query failed' });
  }
}
