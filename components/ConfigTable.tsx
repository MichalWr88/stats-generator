import { AppConfig, AppConfigResponse } from '@/models/AppConfig';
import React, { useEffect, useMemo, useState } from 'react';
import { Column } from 'react-table';
import useGetAppConfig from './api/hooks/useGetAppConfig';
import Table from './table/Table';

const ConfigTable = () => {
  const { data } = useGetAppConfig();
  const [appConfig, setAppConfig] = useState<Array<AppConfigResponse>>([]);
  // const [editSprint, setEditSprint] = useState<EditSprint>({ isOpen: false, sprint: undefined });

  useEffect(() => {
    if (!data) return;

    setAppConfig(() => data);
    // setEditSprint({ isOpen: false, sprint: undefined });
    return () => {
      setAppConfig([]);
    };
  }, [data]);

  const columns: Array<Column<AppConfig>> = useMemo(
    () => [
      {
        Header: 'Config Table',
        columns: [
          {
            Header: 'Type',
            accessor: 'type',
            className: 'p-2 border-2 border-zinc-900 bg-slate-500 text-white',
          },
          {
            Header: 'Name',
            accessor: 'name',
            className: 'p-2 border-2 border-zinc-900 bg-slate-500 text-white',
          },
          {
            Header: 'value',
            accessor: 'value',
            // className: 'p-2 border-2 border-zinc-900 bg-slate-500 text-white',
          },
          {
            Header: 'Color',
            accessor: 'colorPalette',
            // className: 'p-2 border-2 border-zinc-900 bg-slate-500 text-white',
          },
          {
            Header: 'numPalette',
            accessor: 'numPalette',
            // className: 'p-2 border-2 border-zinc-900 bg-slate-500 text-white',
          },
          {
            Header: 'epicsSearch',
            accessor: 'epicsSearch',
            // className: 'p-2 border-2 border-zinc-900 bg-slate-500 text-white',
            Cell: (cell: { row: { original: AppConfigResponse } }) => {
              if ('epicsSearch' in cell.row.original) {
                return (
                  <div>
                    {cell.row.original.epicsSearch.map((epic) => (
                      <b key={epic}> | {epic}</b>
                    ))}
                  </div>
                );
              }

              return null;
            },
          },
          {
            Header: 'textSearch',
            accessor: 'textSearch',

            Cell: (cell: { row: { original: AppConfigResponse } }) => {
              if ('textSearch' in cell.row.original) {
                return (
                  <div>
                    {cell.row.original.textSearch.map((epic) => (
                      <b key={epic}> | {epic}</b>
                    ))}
                  </div>
                );
              }

              return null;
            },
          },
          {
            Header: 'createdAt',
            accessor: 'createdAt',
            Cell: (cell: { row: { original: AppConfigResponse } }) => {
              return <div>{new Date(cell.row.original.createdAt).toLocaleString('pl-PL')}</div>;

              return null;
            },
          },
          {
            Header: 'updatedAt',
            accessor: 'updatedAt',
            Cell: (cell: { row: { original: AppConfigResponse } }) => {
              return <div>{new Date(cell.row.original.updatedAt).toLocaleString('pl-PL')}</div>;

              return null;
            },
          },

          {
            Header: 'Actions',
            Cell: (cell: { row: { original: AppConfigResponse } }) => (
              <div className="flex items-center justify-center">
                <button
                  onClick={() => {
                    console.log({ isOpen: true, sprint: cell.row.original });
                  }}
                  type="button"
                  className="h-8 px-3 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  edit
                </button>
              </div>
            ),
          },
        ],
      },
    ],
    []
  );

  return (
    <>
      <Table data={appConfig} columns={columns} />
      {/* <Modal
        title="Edycja sprintu"
        opened={editSprint.isOpen}
        onCloseHandle={() => setEditSprint({ isOpen: false, sprint: undefined })}
      >
        {!editSprint.sprint ? (
          <>not selected sprint</>
        ) : (
          <SprintForm
            issues={[]}
            sprint={{
              nr: editSprint.sprint.nr,
              start: editSprint.sprint.start,
              end: editSprint.sprint.end,
              plan: editSprint.sprint.plan,
              delivered: editSprint.sprint.delivered,
              request: editSprint.sprint.request,
              bug: editSprint.sprint.bug,
            }}
          />
        )}
      </Modal> */}
    </>
  );
};

export default ConfigTable;
