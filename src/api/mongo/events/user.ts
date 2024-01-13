import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { ValidationError } from 'yup';

import { defaultErrorHandler } from 'src/utils/apiErrorHandler';
import { mongoUser } from 'src/mongoService';
import { User } from 'src/models/User';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res: NextApiResponse<unknown>) => {
  try {
    const body: User = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (!body) {
      res.status(400).send('Please set correct type');
      return;
    }
    await mongoUser.addOne(body).then((resp) => {
      res.status(200).json(resp);
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json(error.errors.join('\n'));
    } else {
      res.status(500).json(error);
    }
  }
});

router.get(async (req, res: NextApiResponse<unknown>) => {
  try {
    const body: User = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (!body) {
      res.status(400).send('Please set correct type');
      return;
    }
    await mongoUser.addOne(body).then((resp) => {
      res.status(200).json(resp);
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json(error.errors.join('\n'));
    } else {
      res.status(500).json(error);
    }
  }
});

export default defaultErrorHandler(router);
