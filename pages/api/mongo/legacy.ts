// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PaginationRequest, PaginationResponse } from "@/models/mongo/Mongo";
import { LegacyIssue } from "@/models/mongo/SprintSchema";
import { Issue, ResponsSprint, sprintSchemaAdd } from "@/models/Sprint";
import { mongoSprint } from "@/server/services/mongoService";
import { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { ValidationError } from "yup";
import { issue } from "../../../data/issue-sprints-old.json";
const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res: NextApiResponse<unknown>) => {
  let correctResp:number = 0;


  try {
    for await (const obj of issue) {
      const legacyObj = obj as LegacyIssue;
      await mongoSprint.updateLegacySprintsIssueArr(legacyObj).then((resp) => {
        console.log(resp)
        correctResp = correctResp+1;
      });
    }
    res.status(200).json(correctResp);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json(error.errors.join("\n"));
    } else {
      res.status(500).json(error);
    }
  }
});

router.all((req, res) => {
  res.status(405).json({
    error: "Method not allowed",
  });
});
export default router.handler({
  onError(err, req, res) {
    res.status(500).json({
      error: (err as Error).message,
    });
  },
});