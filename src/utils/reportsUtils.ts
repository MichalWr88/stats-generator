import { downloadIssuesCSV, downloadAllSprintsCSV } from '@/api/dataProvider';
import { type SprintWithStats } from '@/models/Sprint';
import { parseLocalDate } from '.';

export const getIssueCSV = async (sprint: SprintWithStats) => {
  await downloadIssuesCSV(Number(sprint.nr)).then((data) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `sasSprint-${sprint.nr.toString()} ${parseLocalDate(
        new Date(sprint.start || new Date())
      ).toString()}-${parseLocalDate(new Date(sprint.end || new Date())).toString()}.csv`
    );

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};
export const getAllSprintsCSV = async () => {
  await downloadAllSprintsCSV().then((data) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `sasSprints ${parseLocalDate(new Date())}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};
