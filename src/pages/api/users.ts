// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

// 데이터베이스 연결 설정
const db = mysql.createPool({
  host: 'localhost', // MySQL 호스트
  port: 3306, // MySQL 포트
  user: 'root', // MySQL 사용자 이름
  password: '1539', // MySQL 비밀번호
  database: 'bank', // MySQL 데이터베이스 이름
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
