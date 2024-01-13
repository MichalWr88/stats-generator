import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { ValidationError } from 'yup';

import { AppConfig, AppEpicConfigAdd, AppGlobalConfigAdd } from '@/models/AppConfig';
import { defaultErrorHandler } from '@/helpers/apiErrorHandler';
import { mongoConfig } from '@/server/services/mongoService';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res: NextApiResponse<unknown>) => {
  try {
    const body: AppConfig = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (body.type === 'epic') {
      await AppEpicConfigAdd.validate(req.body);
    } else if (body.type === 'global') {
      await AppGlobalConfigAdd.validate(req.body);
    } else {
      res.status(400).send('Please set correct type');
      return;
    }

    await mongoConfig.addConfig(body).then((resp) => {
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
