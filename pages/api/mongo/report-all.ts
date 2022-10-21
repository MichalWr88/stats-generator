// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { ResponsSprintWithoutIssues } from '@/models/Sprint';
import { mongoSprint } from '@/server/services/mongoService';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { MongoServerError } from 'mongodb';
import { Parser } from 'json2csv';
import { parseLocalDate } from 'utils';
import { sprintsToExcelStats } from 'utils/SprintsMapper';
const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res: NextApiResponse<ResponsSprintWithoutIssues[] | null | string>) => {
  try {
    await mongoSprint.getAllWithoutMongoObj().then((resp) => {
      const json2csvParser = new Parser();
      const data = JSON.parse(JSON.stringify(resp));
      const csv = json2csvParser.parse(sprintsToExcelStats(data) || []);
      res.setHeader('Content-disposition', `attachment; filename='rangersSprints ${parseLocalDate(new Date())}`);
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
