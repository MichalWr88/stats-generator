import { ResponsSprint, SprintWithStats } from '@/models/Sprint';

export const setStatsSpritnts = (arr: Array<ResponsSprint>): Array<SprintWithStats> => {
  const sprints: Array<SprintWithStats> = [];

  arr.forEach((sprint, index, array) => {
    const sprintWithStats: SprintWithStats = {
      ...sprint,
      predictability: ((sprint.delivered / sprint.plan) * 100).toFixed(1),
      predictabilityThree: '0',
      speedThree: '0',
      delta: '0',
      speedSix: '0',
    };

    if (index === 0) {
      sprintWithStats.speedThree = sprint.delivered.toFixed(2);
      sprintWithStats.speedSix = sprint.delivered.toFixed(2);
    }
    if (index === 1) {
      sprintWithStats.speedThree = (
        [sprint.delivered, array[index - 1].delivered].reduce((a, b) => a + b, 0) / 2
      ).toFixed(2);
      sprintWithStats.speedSix = (
        [sprint.delivered, array[index - 1].delivered].reduce((a, b) => a + b, 0) / 2
      ).toFixed(2);
    }
    if (index > 1) {
      sprintWithStats.speedThree = (
        [sprint.delivered, array[index - 1].delivered, array[index - 2].delivered].reduce((a, b) => a + b, 0) / 3
      ).toFixed(2);
      if (index > 6) {
        const prevArr = new Array(6).fill('').map((_, id) => {
          return array[index - id].delivered;
        });
        sprintWithStats.speedSix = (prevArr.reduce((a, b) => a + b, 0) / 6).toFixed(2);
      } else {
        const prevArr = new Array(index - 1).fill('').map((elem, id) => {
          return array[index - id].delivered;
        });
        // todo fix speedSix for old sprints
        sprintWithStats.speedSix = (
          [sprint.delivered, ...prevArr].reduce((a, b) => a + b, 0) / prevArr.length +
          1
        ).toFixed(2);
      }

      sprintWithStats.predictabilityThree = (
        [
          Number(sprintWithStats.predictability),
          Number(sprints[index - 1].predictability),
          Number(sprints[index - 2].predictability),
        ].reduce((a, b) => a + b, 0) / 3
      ).toFixed(1);
      sprintWithStats.delta = Math.abs(100 - Number(sprintWithStats.predictability)).toFixed(1);
    }

    return sprints.push(sprintWithStats);
  });

  return sprints;
};
