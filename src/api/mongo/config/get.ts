import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { ValidationError } from 'yup';

import { ConfigGetValidation, RequestGetConfigType } from '@/models/AppConfig';
import { defaultErrorHandler } from '@/helpers/apiErrorHandler';
import { mongoConfig } from '@/server/services/mongoService';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res: NextApiResponse<unknown>) => {
  const query = req.query as unknown as { type: RequestGetConfigType };
  try {
    await ConfigGetValidation.validate(query);

    await mongoConfig.getAllConfigByType(query.type).then((resp) => {
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
