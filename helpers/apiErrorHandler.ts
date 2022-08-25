import { NextApiRequest, NextApiResponse } from 'next';
import { NodeRouter } from 'next-connect/dist/types/node';

export const defualtErrorHandler = (router: NodeRouter<NextApiRequest, NextApiResponse<unknown>>) => {
  router.all((_req, res) => {
    res.status(405).json({
      error: 'Method not allowed',
    });
  });

  return router.handler({
    onError(err, _req, res) {
      res.status(500).json({
        error: (err as Error).message,
      });
    },
  });
};
