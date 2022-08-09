/* eslint-disable @typescript-eslint/ban-ts-comment */
import { downloadIssuesCSV, getAllSprints } from '@/components/api/dataProvider';
import Modal from '@/components/Modal';
import SprintForm from '@/components/SprintForm';
import Table from '@/components/table/Table';
import { SprintWithStats } from '@/models/Sprint';
import WithNavBar from 'layouts/WithNavBar';
import React, { useEffect, useState, useMemo } from 'react';
import { Column } from 'react-table';
import { parseLocalDate } from 'utils';
import { setStatsSpritnts } from 'utils/SprintsMapper';

type EditSprint = {
  isOpen: boolean;
  sprint: SprintWithStats | undefined;
};

const SprintListPage = () => {
  const [data, setData] = useState<Array<SprintWithStats>>([]);

  const [editSprint, setEditSprint] = useState<EditSprint>({ isOpen: false, sprint: undefined });

  const getIssueCSV = (sprint: SprintWithStats) => {
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

  useEffect(() => {
    getAllSprints().then((resp) => {
      const arr = resp.data.reverse();
      setData(() => {
        return setStatsSpritnts(arr).reverse();
      });
    });
  }, []);

  // @ts-ignore
  const columns: Array<Column<SprintWithStats>> = useMemo(
    () => [
      {
        Header: 'Sprint',
        columns: [
          {
            Header: 'NR',
            accessor: 'nr',
            className: 'p-2 border-2 border-zinc-900 bg-slate-500 text-white',
          },
          {
            Header: 'Start',
            accessor: 'start',
            Cell: ({ value }: { value: Date }) => new Date(value).toLocaleDateString('pl-PL'),
          },
          {
            Header: 'Koniec',
            accessor: 'end',

            Cell: ({ value }: { value: Date }) => new Date(value).toLocaleDateString('pl-PL'),
          },
          {
            Header: 'Zaplanowane',
            accessor: 'plan',
            className: 'vertical-rl p-2 border-2 border-zinc-900 bg-slate-500 text-white',
          },
          {
            Header: 'Dowiezione',
            accessor: 'delivered',
            className: 'vertical-rl p-2 border-2 border-zinc-900 bg-slate-500 text-white',
          },
        ],
      },

      {
        Header: 'Statystyki',
        columns: [
          {
            Header: 'Pręd ost 3',
            accessor: 'speedThree',
          },
          {
            Header: 'Przewid.',
            accessor: 'predictability',
            className: 'vertical-rl p-2 border-2 border-zinc-900 bg-slate-500 text-white',
          },
          {
            Header: 'Przewid. ost 3',
            accessor: 'predictabilityThree',
            className: 'vertical-rl p-2 border-2 border-zinc-900 bg-slate-500 text-white',
          },
        ],
      },

      {
        Header: 'Bug',
        className: ' p-2 border-2 border-zinc-900 bg-red-300',
        columns: [
          {
            Header: 'Closed',
            accessor: 'bug.closed',
            className: 'vertical-rl p-2 border-2  border-zinc-900 bg-red-300',
          },
          {
            Header: 'review',
            accessor: 'bug.review',
            className: 'vertical-rl p-2 border-2 border-zinc-900 bg-red-300',
          },
          {
            Header: 'accepted',
            accessor: 'bug.accepted',
            className: 'vertical-rl p-2 border-2 border-zinc-900  bg-red-300',
          },
          {
            Header: 'inProgress',
            accessor: 'bug.inProgress',
            className: 'vertical-rl p-2 border-2 border-zinc-900 bg-red-300',
          },
          {
            Header: 'inTesting',
            accessor: 'bug.inTesting',
            className: 'vertical-rl p-2 border-2  border-zinc-900 bg-red-300',
          },
          {
            Header: 'rfd',
            accessor: 'bug.rfd',
            className: 'vertical-rl p-2 border-2 border-zinc-900  bg-red-300',
          },
          {
            Header: 'onHold',
            accessor: 'bug.onHold',
            className: 'vertical-rl p-2 border-2 border-zinc-900   bg-red-300',
          },
        ],
      },
      {
        Header: 'Request',
        className: ' p-2 border-2 border-zinc-900 bg-indigo-300',
        columns: [
          {
            Header: 'new',
            accessor: 'request.new',
            className: 'vertical-rl p-2 border-1 border-zinc-900 bg-indigo-300',
          },
          {
            Header: 'review',
            accessor: 'request.review',
            className: 'vertical-rl p-2 border-2 border-zinc-900 bg-indigo-300',
          },

          {
            Header: 'in Progress',
            accessor: 'request.inProgress',
            className: 'vertical-rl p-2 border-2 border-zinc-900 bg-indigo-300',
          },
          {
            Header: 'in Testing',
            accessor: 'request.inTesting',
            className: 'vertical-rl p-2 border-2 border-zinc-900 bg-indigo-300',
          },
          {
            Header: 'rfd',
            accessor: 'request.rfd',
            className: 'vertical-rl p-2 border-2 border-zinc-900 bg-indigo-300',
          },
          {
            Header: 'done',
            accessor: 'request.done',
            className: 'vertical-rl p-2 border-2 border-zinc-900 bg-indigo-300',
          },
        ],
      },
      {
        Header: 'Actions',
        Cell: (cell: { row: { original: SprintWithStats } }) => (
          <div>
            <button
              onClick={() => getIssueCSV(cell.row.original)}
              className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
              csv
            </button>
            {/* <button
              onClick={() => getIssueCSV(cell.row.original)}
              className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
              edit
            </button> */}
            {/* <button
              onClick={() => {
                setEditSprint({ isOpen: true, sprint: cell.row.original });
              }}
              type="button"
              className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              edit
            </button> */}
          </div>
        ),
      },
    ],
    []
  );

  return (
    // apply the table props

    <WithNavBar>
      <>
        <Table data={data} columns={columns} />
        {/* {activeSprint && (
          <div className="grid grid-cols-4 relative grid-rows-4 max-h-96 grid-flow-row">
            <h5 className="col-span-2 self-end font-bold	place-self-center p-2 border-2 border-pink-700">
              Sprint: #{activeSprint.nr} {new Date(activeSprint.start).toLocaleDateString('pl-PL')}-
              {new Date(activeSprint.end).toLocaleDateString('pl-PL')}
            </h5>
            <div className="row-span-2 row-start-2">
              <ChartSprintCircle sprint={activeSprint} type="bug" />
            </div>
            <div className="row-span-2 row-start-2">
              <ChartSprintCircle sprint={activeSprint} type="request" />
            </div>
          </div>
        )} */}
        <Modal opened={editSprint.isOpen} onCloseHandle={() => setEditSprint({ isOpen: false, sprint: undefined })}>
          <SprintForm issues={[]} sprint={editSprint.sprint} />
        </Modal>
      </>
    </WithNavBar>
  );
};

export default SprintListPage;
