// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { ResponsSprint, sprintSchemaAdd } from "@/models/Sprint";
import { mongoSprint } from "@/server/services/mongoService";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { ValidationError } from "yup";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res: NextApiResponse<ResponsSprint[]>) => {
  await mongoSprint
    .getAll()
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
router.put(async (req, res: NextApiResponse<unknown>) => {
  try {
    await sprintSchemaAdd.validate(req.body);

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

   

    await mongoSprint.addOne(body).then((resp) => {
      console.log(resp);
      res.status(200).json(resp);
    });
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
