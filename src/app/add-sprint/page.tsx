import useGetAppConfig from '@/components/api/hooks/useGetAppConfig';
import SelectField from '@/components/SelectField';
import SprintForm from '@/components/SprintForm';
import Table from 'src/components/table/Table';
import UploadFile from '@/components/UploadFile';
import { allImoGroups } from 'src/data/epicGroups';
import { Issue } from 'src/models/Sprint';
import WithNavBar from 'layouts/WithNavBar';
import React, { useState, useMemo } from 'react';
import { Column } from 'react-table';

const AddSprintPage = () => {
  const { data: epicList = [] } = useGetAppConfig('epic');

  const [data, setData] = useState<Array<Issue>>([]);
  const updateMyData = (value: string, rowIndex: number, columnId: string) => {
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };
  const columns: Array<Column<Issue>> = useMemo(
    () => [
      {
        Header: 'Issues',
        columns: [
          {
            Header: 'IssueKey',
            accessor: 'IssueKey',
          },
          {
            Header: 'EpicGroup',
            accessor: 'EpicGroup',
            Cell: (cell) => {
              return (
                <div
                  className={`p-2 ${
                    (cell.row.original.Typeofwork === 'Organization' && cell.row.original.EpicGroup) ||
                    (cell.row.original.Typeofwork !== 'Organization' && !cell.row.original.EpicGroup)
                      ? 'bg-red-500'
                      : ''
                  }`}
                >
                  <SelectField
                    options={epicList.map((epic) => epic.name)}
                    initValue={cell.row.original.EpicGroup}
                    updateMyData={(value) => updateMyData(value, cell.row.index, cell.column.id)}
                  />
                </div>
              );
            },
          },
          {
            Header: 'Typeofwork',
            accessor: 'Typeofwork',
            Cell: (cell) => {
              return (
                <SelectField
                  options={Object.keys(allImoGroups)}
                  initValue={cell.row.original.Typeofwork}
                  updateMyData={(value) => updateMyData(value, cell.row.index, cell.column.id)}
                />
              );
            },
          },
          {
            Header: 'Issuesummary',
            accessor: 'Issuesummary',
          },
          {
            Header: 'Hours',
            accessor: 'Hours',
          },
          {
            Header: 'IssueType',
            accessor: 'IssueType',
          },
          {
            Header: 'EpicLink',
            accessor: 'EpicLink',
          },
          {
            Header: 'Username',
            accessor: 'Username',
          },
          {
            Header: 'WorkDescription',
            accessor: 'WorkDescription',
          },
          {
            Header: 'ParentKey',
            accessor: 'ParentKey',
          },
        ],
      },
      // {
      //   Header: 'Typeofwork',
      //   columns: [
      //     {
      //       Header: '',
      //       accessor: 'Typeofwork',
      //       Cell: (cell: { row: { original: Issue } }) => {
      //         return (
      //           <SelectField
      //             options={Object.keys(allImoGroups)}
      //             initValue={cell.row.original.EpicGroup}
      //             updateMyData={(value) => updateMyData(value, cell.row)}
      //           />
      //         );
      //       },
      //     },
      //   ],

      //   // className: "p-2 flex bg-gray-900 text-white w-200",
      // },
    ],
    [epicList]
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
