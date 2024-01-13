import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { ValidationError } from 'yup';

import { defaultErrorHandler } from 'src/utils/apiErrorHandler';
import { mongoEvent, mongoUser } from 'src/mongoService';
import { User, UserResponse } from 'src/models/User';
import { EventCalendar } from 'src/models/Events';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res: NextApiResponse<unknown>) => {
  try {
    const users = await mongoUser.getAll();

    const resp = await mongoEvent.addMany([...generateRetroEvents(14, users), ...generateEvents(7, users)]);
    res.status(200).json(resp);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json(error.errors.join('\n'));
    } else {
      res.status(500).json(error);
    }
  }
});

export default defaultErrorHandler(router);

const getWeekNumber = (current: string | Date) => {
  const currentDate = new Date(current);
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor((currentDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
  return Math.ceil(days / 7);
};

const lastWeek = getWeekNumber(new Date(new Date().getFullYear(), 11, 31));

const generateEvents = (offset: number, arrConfig: Array<UserResponse>): Array<EventCalendar> => {
  const events: Array<EventCalendar> = [];
  let startDate = new Date(`2023-01-01`);
  while (startDate.getDay() != 1) {
    startDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 1));
  }
  let endDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() + offset));

  for (let index = 0; index < lastWeek; index++) {
    const mod = index % arrConfig.length;

    events.push({
      type: 'daily',
      start: startDate,
      end: endDate,
      allDay: true,
      user: arrConfig[mod]._id,
    });
    startDate = new Date(new Date(endDate).setDate(new Date(endDate).getDate()));
    // if (endDate.getDate() === 5) {
    //   endDate = new Date(startDate.setDate(startDate.getDate() + 2));
    // }
    endDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() + offset));
  }
  console.log(events);
  return events;
};

const generateRetroEvents = (offset: number, arrConfig: Array<UserResponse>): Array<EventCalendar> => {
  const events: Array<EventCalendar> = [];
  let startDate = new Date(`2023-01-03`);
  while (startDate.getDay() !== 1) {
    startDate = new Date(startDate.setDate(startDate.getDate() + 1));
  }
  let endDate = startDate;

  for (let index = 1; index < lastWeek; index++) {
    const mod = index % arrConfig.length;
    // console.log(startDate, endDate);

    events.push({
      type: 'demo',
      start: startDate,
      end: endDate,
      allDay: true,
      user: arrConfig[mod]._id,
    });
    startDate = new Date(endDate.setDate(endDate.getDate() + offset));
    endDate = startDate;
  }
  return events;
};
