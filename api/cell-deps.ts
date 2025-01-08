import type { VercelResponse } from '@vercel/node';
import { ZodError } from 'zod';
import { fetchCellDeps } from "../src/index"

export default async function handler(res: VercelResponse) {
  try {
    const cellDeps = await fetchCellDeps();
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
