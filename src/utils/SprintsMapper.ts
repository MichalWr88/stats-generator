
import { type IssueExcel, type ResponsSprint, type SprintWithStats, type ExcelSprint, type Issue } from '@/models/Sprint';
import { parseLocalDate } from '@/utils/dateHelpers';

export const formatNumberForExcel = (value: string | number) => {
  return value.toString().split('.').join(',');
};

export const issuesToExcelHours = (issues: Array<Issue>): IssueExcel => {
  const issueSummary: IssueExcel = {
    Innovation: 0,
    Organization: 0,
    Bugs: 0,
    Maintenance: 0,
  };
  issues.forEach((issue) => {
    if (!issue.Typeofwork) return;
    issueSummary[issue.Typeofwork] = Number(issueSummary[issue.Typeofwork]) + Number(issue.Hours);
  });
  return {
    Innovation: formatNumberForExcel(issueSummary.Innovation),
    Organization: formatNumberForExcel(issueSummary.Organization),
    Bugs: formatNumberForExcel(issueSummary.Bugs),
    Maintenance: formatNumberForExcel(issueSummary.Maintenance),
  };
};

export const setStatsSprints = (arr: Array<ResponsSprint>): Array<SprintWithStats> => {
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
        [sprint.delivered ?? 0, array[index - 1]?.delivered ?? 0].reduce((a, b) => a + b, 0) / 2
      ).toFixed(2);
      sprintWithStats.speedSix = (
        [sprint.delivered ?? 0, array[index - 1]?.delivered ?? 0].reduce((a, b) => a + b, 0) / 2
      ).toFixed(2);
    }
    if (index > 1) {
      sprintWithStats.speedThree = (
        [sprint.delivered ?? 0, array[index - 1]?.delivered ?? 0, array[index - 2]?.delivered ?? 0].reduce((a, b) => a + b, 0) / 3
      ).toFixed(2);
      if (index > 6) {
        const prevArr = new Array(6).fill('').map((_, id) => {
          return array[index - id]?.delivered ?? 0;
        });
        sprintWithStats.speedSix = (prevArr.reduce((a, b) => a + b, 0) / 6).toFixed(2);
      } else {
        const prevArr = new Array(index - 1).fill('').map((elem, id) => {
          return array[index - id]?.delivered ?? 0;
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
          Number(sprints[index - 1]?.predictability),
          Number(sprints[index - 2]?.predictability),
        ].reduce((a, b) => a + b, 0) / 3
      ).toFixed(1);
      sprintWithStats.delta = Math.abs(100 - Number(sprintWithStats.predictability)).toFixed(1);
    }

    return sprints.push(sprintWithStats);
  });

  return sprints;
};

export const sprintToExcelStat = (sprint: SprintWithStats): ExcelSprint => {

  const {
    issues,
    speedThree,
    speedSix,
    predictability,
    predictabilityThree,
    delta,
    nr,
    plan,
    delivered,
    start,
    end,
    request: { new: Rnew, review: Rreview, inProgress: RinProgress, inTesting: RinTesting, rfd: Rrfd, done: Rdone },
    bug: {
      closed: Bclosed,
      review: Breview,
      accepted: Baccepted,
      inProgress: BinProgress,
      inTesting: BinTesting,
      rfd: Brfd,
      onHold: BonHold,
    },
  } = sprint;
  return {
    nr: `#${nr} ${parseLocalDate(new Date(start))}-${parseLocalDate(new Date(end))}`,
    plan: formatNumberForExcel(plan),
    delivered: formatNumberForExcel(delivered),
    speedThree: formatNumberForExcel(speedThree),
    speedSix: formatNumberForExcel(speedSix),
    predictability: formatNumberForExcel(predictability),
    predictabilityThree: formatNumberForExcel(predictabilityThree),
    delta: formatNumberForExcel(delta),
    Rnew,
    Rreview,
    RinProgress,
    RinTesting,
    Rrfd,
    Rdone,
    Bclosed,
    Breview,
    Baccepted,
    BinProgress,
    BinTesting,
    Brfd,
    BonHold,
    ...issuesToExcelHours(issues ?? []),
  };
};
export const sprintsToExcelStats = (sprints: Array<ResponsSprint>): Array<ExcelSprint> => {
  const mappedSprint = setStatsSprints(sprints);

  return mappedSprint.map((sprint) => sprintToExcelStat(sprint));
};
