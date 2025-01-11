import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ZodError, z } from 'zod';
import { fetchCellDeps } from "../lib/fetcher.js"

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const cellDeps = await fetchCellDeps();
    res
      .setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate')
      .setHeader('CDN-Cache-Control', 'public, s-maxage=60')
      .setHeader('Vercel-CDN-Cache-Control', 'public, s-maxage=60');
    return res.json(JSON.parse(cellDeps));
  } catch (e: any) {
    if (e instanceof ZodError) {
      const error = e.errors[0];
      res.status(400).send({
        error: {
          code: error.code ?? 400,
          message: `(${error.path.join('.')}): ${error.message}`,
        },
      });
    } else {
      res.status(500).send({
        error: {
          code: e?.code ?? e.status ?? null,
          message: e?.message ?? 'internal server error',
        },
      });
    }
    throw e;
  }
}
