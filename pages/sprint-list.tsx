import {
  downloadIssuesCSV,
  getAllSprints,
} from "@/components/api/dataProvider";
import ChartSprintCircle from "@/components/ChartSprintCircle";
import ChartSprintsBar from "@/components/ChartSprintsBar";
import Table from "@/components/table/Table";
import { Sprint, SprintWithStats } from "@/models/Sprint";
import WithNavBar from "layouts/WithNavBar";
import React, { useMemo, useEffect, useState, useDebugValue } from "react";
import { Column, useTable } from "react-table";
import { parseLocalDate } from "utils";
import { setStatsSpritnts } from "utils/SprintsMapper";
import sprint from "./api/mongo/sprint";

const SprintListPage = () => {
  const [data, setData] = useState<Array<SprintWithStats>>([]);
  const [activeSprint, setActiveSprint] = useState<SprintWithStats | null>(
    null
  );
  const getIssueCSV = (sprint: SprintWithStats) => {
    downloadIssuesCSV(Number(sprint.nr)).then((data) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        sprint.nr +
          " " +
          parseLocalDate(new Date(sprint.start || new Date())) +
          "-" +
          parseLocalDate(new Date(sprint.end || new Date()))
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };
  useEffect(() => {
    getAllSprints().then((resp) => {
      setData(() => {
        return setStatsSpritnts(resp.data);
      });
    });
    return () => {};
  }, []);
  const selectSprint = (sprint: SprintWithStats) => {
    setActiveSprint(sprint);
  };
  // @ts-ignore
  const columns: Array<Column<SprintWithStats>> = React.useMemo(
    () => [
      {
        Header: "NR Sprintu",
        accessor: "nr",

        // className: "p-2 flex bg-gray-900 text-white w-200",
      },
      {
        Header: "Start Sprintu",
        accessor: "start",
        Cell: ({ value }: { value: Date }) =>
          new Date(value).toLocaleDateString("pl-PL"),
      },
      {
        Header: "Koniec Sprintu",
        accessor: "end",

        Cell: ({ value }: { value: Date }) =>
          new Date(value).toLocaleDateString("pl-PL"),
      },
      {
        Header: "Zaplanowane",
        accessor: "plan",
      },
      {
        Header: "Dowiezione",
        accessor: "delivered",
      },
      {
        Header: "Statystyki",
        columns: [
          {
            Header: "Pręd ost 3 spr",
            accessor: "speedThree",
          },
          {
            Header: "Przewidywalność",
            accessor: "predictability",
          },
          {
            Header: "Przewid. ost 3 sprinty",
            accessor: "predictabilityThree",
          },
        ],
      },

      {
        Header: "Bug",
        columns: [
          {
            Header: "Closed",
            accessor: "bug.closed",
          },
          {
            Header: "review",
            accessor: "bug.review",
          },
          {
            Header: "accepted",
            accessor: "bug.accepted",
          },
          {
            Header: "inProgress",
            accessor: "bug.inProgress",
          },
          {
            Header: "inTesting",
            accessor: "bug.inTesting",
          },
          {
            Header: "rfd",
            accessor: "bug.rfd",
          },
          {
            Header: "onHold",
            accessor: "bug.onHold",
          },
        ],
      },
      {
        Header: "Actions",
        Cell: (cell: { row: { original: SprintWithStats } }) => (
          <div>
            <button
              onClick={() => getIssueCSV(cell.row.original)}
              className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
              csv
            </button>
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
              Sprint: #{activeSprint.nr}{" "}
              {new Date(activeSprint.start).toLocaleDateString("pl-PL")}-
              {new Date(activeSprint.end).toLocaleDateString("pl-PL")}
            </h5>
            <div className="row-span-2 row-start-2">
              <ChartSprintCircle sprint={activeSprint} type="bug" />
            </div>
            <div className="row-span-2 row-start-2">
              <ChartSprintCircle sprint={activeSprint} type="request" />
            </div>
          </div>
        )}
        <ChartSprintsBar sprints={data} />
      </>
    </WithNavBar>
  );
};

export default SprintListPage;
