import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { ValidationError } from 'yup';

import { defaultErrorHandler } from 'src/utils/apiErrorHandler';
import { mongoEvent } from 'src/mongoService';
import { Event } from 'src/models/Events';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res: NextApiResponse<unknown>) => {
  try {
    await mongoEvent.getAll().then((resp) => {
      res.status(200).json(resp);
    });
  } catch (error) {
    console.log(error);
    if (error instanceof ValidationError) {
      res.status(400).json(error.errors.join('\n'));
      return;
    }
    res.status(500).send({ type: 'unexpected error ', error });
  }
});

export default defaultErrorHandler(router);
