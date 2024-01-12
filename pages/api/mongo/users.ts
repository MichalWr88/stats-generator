import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { ValidationError } from 'yup';

import { defaultErrorHandler } from '@/helpers/apiErrorHandler';
import { mongoUser } from '@/server/services/mongoService';


const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res: NextApiResponse<unknown>) => {
  try {
    await mongoUser.getAll().then((resp) => {
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
