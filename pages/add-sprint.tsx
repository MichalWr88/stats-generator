import SprintForm from "@/components/SprintForm";
import Table from "@/components/table/Table";
import UploadFile from "@/components/UploadFile";
import { Issue } from "@/models/Sprint";
import WithNavBar from "layouts/WithNavBar";
import React, { useState } from "react";
import { Column } from "react-table";

const AddSprintPage = () => {
  const [data, setData] = useState<Array<Issue>>([]);
  const columns: Array<Column<Issue>> = React.useMemo(
    () => [
      {
        Header: "IssueKey",
        accessor: "IssueKey",

        // className: "p-2 flex bg-gray-900 text-white w-200",
      },
      {
        Header: "EpicGroup",
        accessor: "EpicGroup",

        // className: "p-2 flex bg-gray-900 text-white w-200",
      },
      {
        Header: "Typeofwork",
        accessor: "Typeofwork",

        // className: "p-2 flex bg-gray-900 text-white w-200",
      },
      {
        Header: "Issuesummary",
        accessor: "Issuesummary",
      },
      {
        Header: "Hours",
        accessor: "Hours",
      },
      {
        Header: "IssueType",
        accessor: "IssueType",
      },
      {
        Header: "EpicLink",
        accessor: "EpicLink",
      },
      {
        Header: "Username",
        accessor: "Username",
      },
      {
        Header: "WorkDescription",
        accessor: "WorkDescription",
      },
      {
        Header: "ParentKey",
        accessor: "ParentKey",
      },
    ],
    []
  );

  const addFile = (arr: Array<Issue>) => {
    setData(arr);
  };
  return (
    <WithNavBar>
      <SprintForm issues={data} />
      <UploadFile onLoad={addFile} />
      <div className="">
        <Table data={data} columns={columns} />
      </div>
    </WithNavBar>
  );
};

export default AddSprintPage;