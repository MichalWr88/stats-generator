import { EpicGroup, Issue } from "@/models/Sprint";
import { Group } from "next/dist/shared/lib/router/utils/route-regex";
import { useRef } from "react";

interface Props {
  onLoad?: (file: Array<Issue>) => void;
}
enum ReaderType {
  URL = "url",
  BUFFER = "buffer",
  TEXT = "text",
}
type AcceptType = ".txt" | ".csv" | ".xls" | ".xlsx" | ".html";
interface ConfigMapperGroup {
  name: EpicGroup;
  epics: Array<string>;
  texts: Array<string>;
}
const accept: Array<AcceptType> = [".html"];
const readerType: ReaderType = ReaderType.BUFFER;

const parseCsv = (csv: string): Array<Issue> => {
  let lines = csv.split("\n");
  // @ts-ignore for shift()
  const header = lines
    .shift()
    .split(",")
    .map((head) => {
      const regexp = /\W/g;

      return head.split(regexp).join("");
    });
  console.log(lines);

  lines.shift(); // get rid of definitions

  const issueList = lines.map((line) => {
    const bits = line.split("\t");

    let obj = {};
    header.forEach((h, i) => {
      // @ts-ignore for obj[h]
      if (!checkIsCorrectHeader(h)) return;

      // @ts-ignore for obj[h] ? bits[i].slice(1, -1) :
      return (obj[h] = bits[i] ?? null);
    }); // or use reduce here
    return obj;
  });

  return issueList as Array<Issue>;
};

const parseHTML = (csv: string): Array<Issue> => {
  const html = document.createElement("html");
  html.innerHTML = csv;
  const body = html.getElementsByTagName("tbody");
  const htmlLines = body[0].getElementsByTagName("tr");

  const lines = Array.from(htmlLines).map((tr) => {
    const arr = Array.from(tr.getElementsByTagName("td"));
    return arr.map((td) => td.innerText);
  });

  // @ts-ignore for shift()
  const header = lines.shift().map((head) => {
    const regexp = /\W/g;

    return head.split(regexp).join("");
  });
  console.log(lines);

  lines.shift(); // get rid of definitions

  const issueList = lines.map((line) => {
    let obj: Issue = {
      IssueKey: "",
      Issuesummary: "",
      Hours: "",
      IssueType: "",
      EpicLink: "",
      Username: "",
      WorkDescription: "",
      ParentKey: "",
      Typeofwork: null,
      EpicGroup: null,
    };
    header.forEach((h, i) => {
      console.log(obj[h]);
      if (h === "EpicLink" && obj[h]) {
        return (obj[h] = `${line[i]} - ${obj[h]}`);
      }
      // @ts-ignore for obj[h]
      if (!checkIsCorrectHeader(h)) return;

      // @ts-ignore for obj[h] ? bits[i].slice(1, -1) :
      return (obj[h] = line[i] ?? null);
    }); // or use reduce here
    return mappedValidateIsuue(obj);
  });

  return issueList as Array<Issue>;
};
const imoMappedIssue = (obj: Issue): Issue => {
  const mappedIssue = { ...obj };
  const ORGTasks = ["CSS-1812", "CSS-1811"];
  if (ORGTasks.includes(obj.IssueKey)) {
    mappedIssue.Typeofwork = "Organization";
  }
  if (obj.IssueType === "Bug") {
    mappedIssue.Typeofwork = "Bugs";
  }
  return mappedIssue;
};
class Mapper {
  constructor(public issue: Issue) {
    this.issue = issue;
  }

  public imoMappedIssue(): Mapper {
    const ORGTasks = ["CSS-1812", "CSS-1811"];
    if (ORGTasks.includes(this.issue.IssueKey)) {
      this.issue.Typeofwork = "Organization";
    }
    if (this.issue.IssueType === "Bug") {
      this.issue.Typeofwork = "Bugs";
    }
    return this;
  }
  public groupEpicMappedIssue(): Mapper {
    const configArr: Array<ConfigMapperGroup> = [
      {
        name: "CIC",
        epics: ["CSS-1169"],
        texts: ["cic", "ssi"],
      },
      {
        name: "NLW",
        epics: ["CSS-3371"],
        texts: ["NLW"],
      },
    ];
    configArr.forEach((config) => {
      if (
        [...config.texts, ...config.epics].some(
          (text) =>
            this.issue.Issuesummary.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
            this.issue.EpicLink.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
            this.issue.WorkDescription.toLocaleLowerCase().includes(text.toLocaleLowerCase())
        )
      ) {
        this.issue.EpicGroup = config.name;
      }
    });

    return this;
  }
}

const mappedValidateIsuue = (obj: Issue): Issue => {
  const mappedIssue = { ...obj };
  const mapper = new Mapper(mappedIssue);
  return mapper.imoMappedIssue().groupEpicMappedIssue().issue;
};

const checkIsCorrectHeader = (header: keyof Issue) => {
  const correctHEaders: Array<keyof Issue> = [
    "IssueKey",
    "Issuesummary",
    "Hours",
    "IssueType",
    "EpicLink",
    "Username",
    "WorkDescription",
    "ParentKey",
    "Typeofwork",
  ];
  return correctHEaders.includes(header);
};

const UploadFile = ({ onLoad }: Props) => {
  const fileInput = useRef(null);
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
    if (fileInput.target.files && fileInput.target.files[0]) {
      if (!isAcceptType(fileInput.target.files[0].name, accept)) {
        console.log("niepoprawny format pliku");
      }

      if (isToBigSize(fileInput.target.files[0].size)) {
        console.log(" za duzy plik");
      }

      const file = fileInput.target.files[0];
      const reader = new FileReader();

      reader.addEventListener("load", (e: ProgressEvent<FileReader>) => {
        if (typeof reader.result === "string") {
          const res = parseHTML(reader.result);
          console.log(res);

          onLoad(res);
        }
      });

      reader.readAsText(file);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col justify-center items-center pt-5 pb-6">
          <svg
            aria-hidden="true"
            className="mb-3 w-10 h-10 text-gray-400"
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
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleChange}
          accept={accept.join()}
        />
      </label>
    </div>
  );
};

export default UploadFile;
