// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { LegacyIssue } from '@/models/Sprint';

import { mongoSprint } from '@/server/services/mongoService';

import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { ValidationError } from 'yup';
import { issue } from '../../../data/issue-sprints-old.json';
const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res: NextApiResponse<unknown>) => {
  let correctResp = 0;

  try {
    for await (const obj of issue) {
      const legacyObj = obj as LegacyIssue;
      await mongoSprint.updateLegacySprintsIssueArr(legacyObj).then((resp) => {
        console.log(resp);
        correctResp = correctResp + 1;
      });
    }
    res.status(200).json(correctResp);
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
