import useGetAppConfig from '@/hooks/useGetAppConfig';
import { type AppConfigResponse } from '@/models/AppConfig';
import { type TypeofworkList, type Issue } from '@/models/Sprint';

interface Props {
  // eslint-disable-next-line no-unused-vars
  onLoad?: (file: Array<Issue>) => void;
}

type AcceptType = '.txt' | '.csv' | '.xls' | '.xlsx' | '.html';

const accept: Array<AcceptType> = ['.html'];

const parseHTML = (csv: string, epicList: Array<AppConfigResponse>): Array<Issue> => {
  const html = document.createElement('html');
  html.innerHTML = csv;
  const body = html.getElementsByTagName('tbody');
  const htmlLines = body?.[0]?.getElementsByTagName('tr');

  const lines = Array.from(htmlLines ?? []).map((tr) => {
    const arr = Array.from(tr.getElementsByTagName('td'));
    return arr.map((td) => td.innerText);
  });

  const header = lines?.shift()?.map((head) => {
    const regexp = /\W/g;
    return head.split(regexp).join('');
  }) as (keyof Issue)[] | undefined;

  lines.shift(); // get rid of definitions

  const issueList = lines.map((line) => {
    const obj: Issue = {
      IssueKey: '',
      Issuesummary: '',
      Hours: '',
      IssueType: '',
      EpicLink: '',
      Username: '',
      WorkDescription: '',
      ParentKey: '',
      Typeofwork: null,
      EpicGroup: null,
    };

    header?.forEach((h, i) => {
      if (h === 'EpicLink' && obj[h]) {
        const value = `${line[i] ?? ''} - ${obj[h] ?? ''}`;
        return (obj[h] = value);
      }
      if (h === 'Hours' && line?.[i]?.includes(',')) {
        return (obj.Hours = line?.[i]?.split(',').join('.') ?? '');
      }

      if (!checkIsCorrectHeader(h as unknown as keyof Issue)) return;

      obj[h] = line?.[i] as unknown as TypeofworkList;
    }); // or use reduce here
    return mappedValidateIsuue(obj, epicList);
  });
  return [...issueList].sort((a, b) => {
    if (a.Typeofwork && b.Typeofwork) {
      return a.Typeofwork.localeCompare(b.Typeofwork);
    }
    return -1;
  });
};

class Mapper {
  constructor(public issue: Issue, public epicList: Array<AppConfigResponse>) {
    this.issue = issue;
    this.epicList = epicList;
  }

  public imoMappedIssue() {
    const ORGTasks = ['CSS-1812', 'CSS-1811'];
    if (ORGTasks.includes(this.issue.IssueKey)) {
      this.issue.Typeofwork = 'Organization';
    }
    if (this.issue.IssueType === 'Bug') {
      this.issue.Typeofwork = 'Bugs';
    }
    return this;
  }
  public groupEpicMappedIssue() {
    this.epicList.forEach((config) => {
      if (config.type === 'global') {
        throw new Error('config is not typeof EpicConfigResponse');
      }

      if (
        config.type === 'epic' &&
        config.epicsSearch.some(
          (text) =>
            this.issue.Issuesummary.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
            this.issue.EpicLink?.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
            this.issue.WorkDescription.toLocaleLowerCase().includes(text.toLocaleLowerCase())
        )
      ) {
        console.log(config.name, this.issue.EpicLink, config.textSearch);
        this.issue.EpicGroup = config.name;
      } else if (
        config.textSearch.some(
          (text) =>
            this.issue.Issuesummary.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
            this.issue.EpicLink?.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
            this.issue.WorkDescription.toLocaleLowerCase().includes(text.toLocaleLowerCase())
        )
      ) {
        console.log(config.name, this.issue.EpicLink, config.textSearch);
        this.issue.EpicGroup = this.issue.EpicGroup ?? config.name;
      } else if (
        config.epics?.some(
          (text) =>
            this.issue.Issuesummary.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
            this.issue.EpicLink?.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
            this.issue.WorkDescription.toLocaleLowerCase().includes(text.toLocaleLowerCase())
        )
      ) {
        this.issue.EpicGroup = this.issue.EpicGroup ?? config.name;
      }
    });

  
    return this;
  }
}

const mappedValidateIsuue = (obj: Issue, epicList: Array<AppConfigResponse>): Issue => {
  const mappedIssue = { ...obj };
  const mapper = new Mapper(mappedIssue, epicList);
  return mapper.imoMappedIssue().groupEpicMappedIssue().issue;
};

const checkIsCorrectHeader = (header: keyof Issue) => {
  const correctHEaders: Array<keyof Issue> = [
    'IssueKey',
    'Issuesummary',
    'Hours',
    'IssueType',
    'EpicLink',
    'Username',
    'WorkDescription',
    'ParentKey',
    'Typeofwork',
  ];
  return correctHEaders.includes(header);
};

const UploadFile = ({ onLoad }: Props) => {
  const { data: epicList = [] } = useGetAppConfig('epic');

  const isAcceptType = (name: string, accept: Array<AcceptType>) => {
    const reg = /\.[0-9a-z]+$/;
    const type = name.match(reg);
    if (!type) return false;
    return accept.some((e) => e === type[0]);
  };
  const isToBigSize = (kb: number) => {
    return kb / 1024 / 1024 > 10;
  };
  const handleChange = (fileInput: React.ChangeEvent<HTMLInputElement>) => {
    if (fileInput?.target?.files?.[0]) {
      if (!isAcceptType(fileInput.target.files[0].name, accept)) {
        console.log('niepoprawny format pliku');
      }

      if (isToBigSize(fileInput.target.files[0].size)) {
        console.log(' za duzy plik');
      }

      const file = fileInput.target.files[0];
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        if (typeof reader.result === 'string') {
          const res = parseHTML(reader.result, epicList);

          if (onLoad) {
            onLoad(res);
          }
        }
      });

      reader.readAsText(file);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-28 bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            aria-hidden="true"
            className="w-10 h-10 mb-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" onChange={handleChange} accept={accept.join()} />
      </label>
    </div>
  );
};

export default UploadFile;
