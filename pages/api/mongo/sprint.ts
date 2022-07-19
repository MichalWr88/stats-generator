// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { initConnectMongo, mongoUser } from "@/server/services/mongooseService";
import { checkMongoConnected } from "@/helpers/mongoHelpers";
import { ResponsSprint, Sprint } from "@/models/Sprint";
import { initConnectMongo, mongoSprint } from "@/server/services/mongoService";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

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
router.put(async (req, res: NextApiResponse<Sprint>) => {
  console.log(req.body);
  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  await mongoSprint
    .addOne(body)
    .then((resp) => {
      console.log(resp);
      res.status(200).json(resp);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
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
