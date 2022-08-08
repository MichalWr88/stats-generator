/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { downloadIssuesCSV, getAllSprints } from '@/components/api/dataProvider';
import ChartSprintCircle from '@/components/ChartSprintCircle';
// import Modal from '@/components/Modal';
// import SprintForm from '@/components/SprintForm';
import Table from '@/components/table/Table';
import { SprintWithStats } from '@/models/Sprint';
import WithNavBar from 'layouts/WithNavBar';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Column } from 'react-table';
import { parseLocalDate } from 'utils';
import { setStatsSpritnts } from 'utils/SprintsMapper';

const SprintListPage = () => {
  const [data, setData] = useState<Array<SprintWithStats>>([]);
  const ref = useRef(null);
  // const [isEditModal, setIsEditModal] = useState(false);
  const [activeSprint, setActiveSprint] = useState<SprintWithStats | null>(null);
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
  const openModal = () => {
    console.log(ref);
  };
  useEffect(() => {
    getAllSprints().then((resp) => {
      setData(() => {
        return setStatsSpritnts(resp.data);
      });
    });
  }, []);
  const selectSprint = (sprint: SprintWithStats) => {
    setActiveSprint(sprint);
  };
  // @ts-ignore
  const columns: Array<Column<SprintWithStats>> = useMemo(
    () => [
      {
        Header: 'NR Sprintu',
        accessor: 'nr',

        // className: "p-2 flex bg-gray-900 text-white w-200",
      },
      {
        Header: 'Start Sprintu',
        accessor: 'start',
        Cell: ({ value }: { value: Date }) => new Date(value).toLocaleDateString('pl-PL'),
      },
      {
        Header: 'Koniec Sprintu',
        accessor: 'end',

        Cell: ({ value }: { value: Date }) => new Date(value).toLocaleDateString('pl-PL'),
      },
      {
        Header: 'Zaplanowane',
        accessor: 'plan',
      },
      {
        Header: 'Dowiezione',
        accessor: 'delivered',
      },
      {
        Header: 'Statystyki',
        columns: [
          {
            Header: 'Pręd ost 3 spr',
            accessor: 'speedThree',
          },
          {
            Header: 'Przewidywalność',
            accessor: 'predictability',
          },
          {
            Header: 'Przewid. ost 3 sprinty',
            accessor: 'predictabilityThree',
          },
        ],
      },

      {
        Header: 'Bug',
        columns: [
          {
            Header: 'Closed',
            accessor: 'bug.closed',
          },
          {
            Header: 'review',
            accessor: 'bug.review',
          },
          {
            Header: 'accepted',
            accessor: 'bug.accepted',
          },
          {
            Header: 'inProgress',
            accessor: 'bug.inProgress',
          },
          {
            Header: 'inTesting',
            accessor: 'bug.inTesting',
          },
          {
            Header: 'rfd',
            accessor: 'bug.rfd',
          },
          {
            Header: 'onHold',
            accessor: 'bug.onHold',
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
            <button
              onClick={() => getIssueCSV(cell.row.original)}
              className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
              edit
            </button>
            {/* <button
              onClick={() => {
                setIsEditModal(true);
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
        {activeSprint && (
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
        )}
        {/* <Modal>
          <SprintForm issues={[]} />
        </Modal> */}
      </>
    </WithNavBar>
  );
};

export default SprintListPage;
