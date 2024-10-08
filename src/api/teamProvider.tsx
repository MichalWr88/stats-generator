import { getCurrentWeekNumber, getMaxWeeksNumberByYear } from '@/utils/dateHelpers';

type PayloadConfig = {
  currentDailyPerson: string;
  nextDailyPerson: string;
  currentPresentationPerson: string;
  nextPresentationPerson: string;
};
export type Person = {
  name: string;
  id: number;
};

export const personsList: Array<Person> = [
  {
    name: 'Daniel',
    id: 1,
  },
  {
    name: 'Szymon',
    id: 2,
  },
  {
    name: 'Tomek',
    id: 3,
  },
  {
    name: 'Marcin',
    id: 4,
  },
  {
    name: 'Michał',
    id: 5,
  },
];

export const getWeekListWithPersons = (year: number) => {
  const weekList: Array<{
    weekNumber: number;
    person: Person;
  }> = [];
  const maxWeeksNumber = getMaxWeeksNumberByYear(year);
  let personIndex = 0;
  for (let week = 1; week <= maxWeeksNumber; week++) {
    weekList.push({
      weekNumber: week,
      person: personsList[personIndex],
    });
    personIndex = (personIndex + 1) % personsList.length;
  }
  return weekList;
};
export const getTwiceWeekListWithPersons = (year: number) => {
  const weekList: Array<{
    weekNumber: number;
    person: Person;
  }> = [];
  const maxWeeksNumber = getMaxWeeksNumberByYear(year);
  let personIndex = 0;
  for (let week = 1; week <= maxWeeksNumber; week += 2) {
    weekList.push(
      {
        weekNumber: week,
        person: personsList[personIndex],
      },
      {
        weekNumber: week + 1,
        person: personsList[personIndex],
      }
    );
    personIndex = (personIndex + 1) % personsList.length;
  }
  return weekList;
};
const payload = ({
  currentDailyPerson,
  nextDailyPerson,
  currentPresentationPerson,
  nextPresentationPerson,
}: PayloadConfig) => {
  if (!process.env.SLACK_GROUP_ID || !process.env.SLACK_URL) {
    throw new Error('Missing env variables');
  }
  return {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `<!subteam^${process.env.SLACK_GROUP_ID}>  :bell: * Ogłoszenia Parafialne * :bell:`,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `
              W tym tygodniu daily prowadzi :duda_irony: : 
              *${currentDailyPerson}*
              Nastepny w kolejce :soon: :
              *${nextDailyPerson}*
              `,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `
              Najbliższą prezentacje prowadzi:duda_irony: :
              *${currentPresentationPerson}*
              Nastepny w kolejce :soon: :
              *${nextPresentationPerson}*`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `:clipboard: <${process.env.NEXT_PUBLIC_VERCEL_URL}|Lista zespołu>`,
        },
      },
    ],
  };
};

export const sendToSlack = async () => {
  const dailyList = getWeekListWithPersons(new Date().getFullYear())
    .filter(({ weekNumber }) => weekNumber >= getCurrentWeekNumber())
    .slice(0, 2);
  const presentationList = getTwiceWeekListWithPersons(new Date().getFullYear())
    .filter(({ weekNumber }) => weekNumber >= getCurrentWeekNumber())
    .slice(0, 4);

  await fetch(process.env.SLACK_URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      payload({
        currentDailyPerson: dailyList[0].person.name,
        nextDailyPerson: dailyList[1].person.name,
        currentPresentationPerson: presentationList[0].person.name,
        nextPresentationPerson: presentationList[2].person.name,
      })
    ),
  });
};
