'use client';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useState, useMemo } from 'react';
import { type Column } from 'react-table';
import SelectField from '@/components/Forms/SelectField';
import SprintForm from '@/components/Forms/SprintForm';
import GroupedByEpicGroup from '@/components/GruppedByEpicGroup';
import UploadFile from '@/components/shared/UploadFile';
import Table from '@/components/table/Table';
import { allImoGroups } from '@/data/epicGroups';
import useGetAppConfig from '@/hooks/useGetAppConfig';
import { type Issue } from '@/models/Sprint';

const AddSprintPage = () => {
  const { data: epicList = [] } = useGetAppConfig('epic');
  const { data: sessions } = useSession();
  if (!sessions) {
    redirect('/');
  }
  const [data, setData] = useState<Array<Issue>>([]);
  const updateMyData = (value: string, rowIndex: number, columnId: keyof Issue) => {
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
    (): Array<Column<Issue>> => [
      {
        Header: 'Issues',
        columns: [
          {
            Header: 'IssueKey',
            accessor: 'IssueKey',
            Cell: (cell) => {
              return (
                <a
                  href={`https://jira.trans.eu/${cell.row.original.IssueKey}`}
                  className="text-blue-500 hover:text-blue-800"
                >
                  {cell.row.original.IssueKey}
                </a>
              );
            },
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
                    updateMyData={(value) =>
                      updateMyData(value, cell.row.index, cell.column.id as unknown as keyof Issue)
                    }
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
                  updateMyData={(value) =>
                    updateMyData(value, cell.row.index, cell.column.id as unknown as keyof Issue)
                  }
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
            Cell: (cell) => {
              return (
                cell.row.original.ParentKey && (
                  <a
                    href={`https://jira.trans.eu/${cell.row.original.ParentKey}`}
                    className="text-blue-500 hover:text-blue-800"
                  >
                    {cell.row.original.ParentKey}
                  </a>
                )
              );
            },
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
    <>
      <SprintForm issues={data} />
      <UploadFile onLoad={addFile} />
      <GroupedByEpicGroup issues={data} />
      <Table data={data} columns={columns} />
    </>
  );
};

export default AddSprintPage;
