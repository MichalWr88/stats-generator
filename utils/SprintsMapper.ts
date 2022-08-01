import { ResponsSprint, Sprint, SprintWithStats } from "@/models/Sprint";

export const setStatsSpritnts = (arr: Array<ResponsSprint>): Array<SprintWithStats> => {
    const sprints: Array<SprintWithStats> = [];
  
    arr.forEach((sprint, index, array) => {
      const sprintWithStats: SprintWithStats = {
        ...sprint,
        predictability: (((sprint.delivered / sprint.plan) * 100) / 100).toFixed(
          2
        ),
        predictabilityThree: "0",
        speedThree: "0",
      };
  
      if (index === 0) {
        sprintWithStats.speedThree = sprint.delivered.toFixed(2);
      }
      if (index === 1) {
        sprintWithStats.speedThree = (
          [sprint.delivered, array[index - 1].delivered].reduce(
            (a, b) => a + b,
            0
          ) / 2
        ).toFixed(2);
      }
      if (index > 1) {
        sprintWithStats.speedThree = (
          [
            sprint.delivered,
            array[index - 1].delivered,
            array[index - 2].delivered,
          ].reduce((a, b) => a + b, 0) / 3
        ).toFixed(2);
        sprintWithStats.predictabilityThree = (
          [
            Number(sprintWithStats.speedThree),
            Number(sprints[index - 1].speedThree),
            Number(sprints[index - 2].speedThree),
          ].reduce((a, b) => a + b, 0) / 3
        ).toFixed(2);
      }
  
      return sprints.push(sprintWithStats);
    });
  
    return sprints;
  };
  