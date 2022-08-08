// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { ResponsSprintForCSV, sprintSchemaAdd } from '@/models/Sprint';
import { mongoSprint } from '@/server/services/mongoService';
import { AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { ValidationError } from 'yup';
import { MongoServerError } from 'mongodb';

import { Parser } from 'json2csv';
import { parseLocalDate } from 'utils';
const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res: NextApiResponse<ResponsSprintForCSV | null | string>) => {
  const query = req.query;

  try {
    if (typeof query.id !== 'string') {
      throw new AxiosError('wrong id type');
    }
    await mongoSprint.geIssuesByNrSprint(Number(query.id)).then((resp) => {
      console.log(resp?.issues);
      const json2csvParser = new Parser();
      const data = JSON.parse(JSON.stringify(resp?.issues));
      console.log(data);
      const csv = json2csvParser.parse(data || []);
      res.setHeader(
        'Content-disposition',
        'attachment; filename=' +
          resp?.nr +
          ' ' +
          parseLocalDate(new Date(resp?.start || new Date())) +
          '-' +
          parseLocalDate(new Date(resp?.end || new Date()))
      );
      res.setHeader('Content-type', 'text/csv');
      res.status(200).send(csv);
    });
  } catch (err) {
    if (err instanceof MongoServerError || err instanceof Error) {
      res.status(500).json(err.message);
    } else {
      console.log(err instanceof Error);

      res.status(500).json('uknown error');
    }
  }

  // await mongoSprint
  //   .getAll()
  //   .then((resp) => {
  //     res.status(200).json(resp);
  //   })
  //   .catch((err) => {
  //     res.status(500).json(err);
  //   });
});
router.put(async (req, res: NextApiResponse<unknown>) => {
  try {
    await sprintSchemaAdd.validate(req.body);

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    await mongoSprint.addOne(body).then((resp) => {
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

router.all((req, res) => {
  res.status(405).json({
    error: 'Method not allowed',
  });
});
export default router.handler({
  onError(err, req, res) {
    res.status(500).json({
      error: (err as Error).message,
    });
  },
});
