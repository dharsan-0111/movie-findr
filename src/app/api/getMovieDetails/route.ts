import { getMovieById } from '@/lib/server/scripts';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { movieId } = req.query;

  if (!movieId) {
    return res.status(400).json({ error: 'Movie ID is required' });
  }

  try {
    const movieDetails = await getMovieById(Number(movieId));
    res.status(200).json(movieDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
}