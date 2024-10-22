// Next.js API 라우트는 서버에서 실행됩니다.
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// YouTube API 호출
const apiKey = process.env.API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${query}&part=snippet&type=video&maxResults=30`
    );

    return res.status(200).json(response.data.items);
  } catch (error) {
    console.error('Error fetching data from YouTube:', error);
    return res.status(500).json({ error: 'Failed to fetch videos' });
  }
}
