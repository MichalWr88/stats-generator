'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { FaFileDownload } from 'react-icons/fa';
import { type Column } from 'react-table';
import SprintForm from '@/components/Forms/SprintForm';
import Button from '@/components/shared/Button/Button';
import Modal from '@/components/shared/Button/Modal';
import Table from '@/components/table/Table';
import useGetSprints from '@/hooks/useGetSprints';
import { type SprintWithStats } from '@/models/Sprint';
import { setStatsSprints } from '@/utils/SprintsMapper';
import { getIssueCSV, getAllSprintsCSV } from '@/utils/reportsUtils';

type EditSprint = {
  isOpen: boolean;
  sprint: SprintWithStats | undefined;
};
const cssBug = 'sticky top-7 vertical-rl uppercase p-2 border-2 border-zinc-900 bg-red-300';
const cssRequest = 'sticky top-7 uppercase vertical-rl p-2 border-2 border-zinc-900 bg-indigo-300';

const SprintListPage = () => {
  const { data } = useGetSprints();
  const [sprintsList, setSprintsList] = useState<Array<SprintWithStats>>([]);
  const [editSprint, setEditSprint] = useState<EditSprint>({ isOpen: false, sprint: undefined });

  useEffect(() => {
    if (!data) return;
    const list = [...data.data].sort((a, b) => {
      return a.nr > b.nr ? 1 : -1;
    });
    setSprintsList(() => {
      return setStatsSprints(list).splice(2).reverse();
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
        className: 'sticky top-0 p-2 border-2 border-zinc-900 bg-slate-500 text-white',
        columns: [
          {
            Header: 'NR',
            accessor: 'nr',
            className: 'sticky top-7 vertical-rl p-2 border-2 border-zinc-900 bg-slate-500 text-white',
          },
          {
            Header: 'Start',
            accessor: 'start',
            className: 'sticky top-7 p-2 border-2 border-zinc-900 bg-slate-500 text-white',
            Cell: ({ value }: { value: Date }) => new Date(value).toLocaleDateString('pl-PL'),
          },
          {
            Header: 'Koniec',
            accessor: 'end',
            className: 'sticky top-7 p-2 border-2 border-zinc-900 bg-slate-500 text-white',
            Cell: ({ value }: { value: Date }) => new Date(value).toLocaleDateString('pl-PL'),
          },
          {
            Header: 'Zaplanowane',
            accessor: 'plan',
            className: 'sticky top-7 vertical-rl p-2 border-2 border-zinc-900 bg-slate-500 text-white',
          },
          {
            Header: 'Dowiezione',
            accessor: 'delivered',
            className: 'sticky top-7 vertical-rl p-2 border-2 border-zinc-900 bg-slate-500 text-white',
          },
        ],
      },

      {
        Header: 'Statystyki',
        className: 'sticky top-0 p-2 border-2 border-zinc-900 bg-slate-500 text-white',
        columns: [
          {
            Header: 'Pręd ost 3',
            className: 'sticky top-7 vertical-rl p-2 border-2 border-zinc-900 bg-slate-500 text-white',
            accessor: 'speedThree',
          },
          {
            Header: 'Pręd ost 6',
            accessor: 'speedSix',
            className: 'sticky top-7 vertical-rl p-2 border-2 border-zinc-900 bg-slate-500 text-white',
          },
          {
            Header: 'Przewid.',
            accessor: 'predictability',

            className: 'sticky top-7 vertical-rl p-2 border-2 border-zinc-900 bg-slate-500 text-white',
          },
          {
            Header: 'Delta.',
            accessor: 'delta',
            className: 'sticky top-7 vertical-rl p-2 border-2 border-zinc-900 bg-slate-500 text-white',
          },
          {
            Header: 'Przewid. ost 3',
            accessor: 'predictabilityThree',
            className: 'sticky top-7 vertical-rl p-2 border-2 border-zinc-900 bg-slate-500 text-white',
          },
        ],
      },

      {
        Header: 'Bugs',
        className: 'sticky top-0 p-2  border-2 border-zinc-900 bg-red-300',
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
        Header: 'Requests',
        className: 'sticky top-0 p-2 border-2 border-zinc-900 bg-indigo-300',
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
        className: 'sticky top-7 p-2 border-2 border-zinc-900 bg-slate-500 text-white',

        Cell: (cell: { row: { original: SprintWithStats } }) => (
          <div className="flex items-center justify-center">
            <Button
              type="outline"
              clickHandle={() => {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                getIssueCSV(cell.row.original);
              }}
              className="flex items-center "
            >
              <FaFileDownload className="text-xl" /> Issues
            </Button>
            <Button
              clickHandle={() => {
                setEditSprint({ isOpen: true, sprint: cell.row.original });
              }}
            >
              edit
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
      <Button
        clickHandle={() => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          getAllSprintsCSV();
        }}
      >
        download all sprints
      </Button>
      <Table data={sprintsList} columns={columns} />
      {editSprint.isOpen && (
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
      )}
    </>
  );
};

export default SprintListPage;
