/* eslint-disable @typescript-eslint/ban-ts-comment */
import { downloadIssuesCSV } from '@/components/api/dataProvider';
import Modal from '@/components/Modal';
import SprintForm from '@/components/SprintForm';
import Table from '@/components/table/Table';
import { SprintWithStats } from '@/models/Sprint';
import WithNavBar from 'layouts/WithNavBar';
import React, { useEffect, useState, useMemo } from 'react';
import { Column } from 'react-table';
import { parseLocalDate } from 'utils';
import { setStatsSpritnts } from 'utils/SprintsMapper';
import { FaFileDownload } from 'react-icons/fa';
import useGetSprints from '@/components/api/hooks/useGetSprints';

type EditSprint = {
  isOpen: boolean;
  sprint: SprintWithStats | undefined;
};
const cssBug = 'vertical-rl uppercase p-2 border-2 border-zinc-900   bg-red-300';
const cssRequest = ' uppercase vertical-rl p-2 border-2 border-zinc-900 bg-indigo-300';

const SprintListPage = () => {
  const { data } = useGetSprints();
  const [sprintsList, setSprintsList] = useState<Array<SprintWithStats>>([]);
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
    if (!data) return;
    const list = data.data.reverse();

    setSprintsList(() => {
      return setStatsSpritnts(list).splice(2).reverse();
    });
    setEditSprint({ isOpen: false, sprint: undefined });
    return () => {
      setSprintsList([]);
    };
  }, [data]);

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
            className: cssBug,
          },
          {
            Header: 'review',
            accessor: 'bug.review',
            className: cssBug,
          },
          {
            Header: 'accepted',
            accessor: 'bug.accepted',
            className: cssBug,
          },
          {
            Header: 'in Progress',
            accessor: 'bug.inProgress',
            className: cssBug,
          },
          {
            Header: 'inTesting',
            accessor: 'bug.inTesting',
            className: cssBug,
          },
          {
            Header: 'rfd',
            accessor: 'bug.rfd',
            className: cssBug,
          },
          {
            Header: 'onHold',
            accessor: 'bug.onHold',
            className: cssBug,
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
            className: cssRequest,
          },
          {
            Header: 'review',
            accessor: 'request.review',
            className: cssRequest,
          },

          {
            Header: 'in Progress',
            accessor: 'request.inProgress',
            className: cssRequest,
          },
          {
            Header: 'in Testing',
            accessor: 'request.inTesting',
            className: cssRequest,
          },
          {
            Header: 'rfd',
            accessor: 'request.rfd',
            className: cssRequest,
          },
          {
            Header: 'done',
            accessor: 'request.done',
            className: cssRequest,
          },
        ],
      },
      {
        Header: 'Actions',
        Cell: (cell: { row: { original: SprintWithStats } }) => (
          <div className="flex items-center justify-center">
            <button
              onClick={() => getIssueCSV(cell.row.original)}
              className="flex items-center h-8  px-3 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
              <FaFileDownload className="text-xl" /> Issues
            </button>
            <button
              onClick={() => {
                setEditSprint({ isOpen: true, sprint: cell.row.original });
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
    []
  );

  return (

    <WithNavBar>
      <>
        <Table data={sprintsList} columns={columns} />
        <Modal
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
        </Modal>
      </>
    </WithNavBar>
  );
};

export default SprintListPage;
