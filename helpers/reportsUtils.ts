import { SprintWithStats } from '@/models/Sprint';
import { downloadAllSprintsCSV, downloadIssuesCSV } from '@/components/api/dataProvider';
import { parseLocalDate } from 'utils';

export const getIssueCSV = (sprint: SprintWithStats) => {
  downloadIssuesCSV(Number(sprint.nr)).then((data) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      sprint.nr +
        ' ' +
        parseLocalDate(new Date(sprint.start || new Date())) +
        '-' +
        parseLocalDate(new Date(sprint.end || new Date()))
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};
export const getAllSprintsCSV = () => {
  downloadAllSprintsCSV().then((data) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `rangersSprints ${parseLocalDate(new Date())}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};
