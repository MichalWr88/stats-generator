import { getAllSprints } from "@/components/api/dataProvider";
import ChartSprintCircle from "@/components/ChartSprintCircle";
import ChartSprintsBar from "@/components/ChartSprintsBar";
import { Sprint, SprintWithStats } from "@/models/Sprint";
import WithNavBar from "layouts/WithNavBar";
import React, { useMemo, useEffect, useState, useDebugValue } from "react";
import { useTable } from "react-table";
import sprint from "./api/mongo/sprint";

const setStatsSpritnts = (arr: Array<Sprint>): Array<SprintWithStats> => {
  const sprints: Array<SprintWithStats> = [];

  arr.forEach((sprint, index, array) => {
    const sprintWithStats: SprintWithStats = {
      ...sprint,
      predictability: (((sprint.delivered / sprint.plan) * 100) / 100).toFixed(
        2
      ),
      predictabilityThree: "0",
      speedThree: "0",
    };

    if (index === 0) {
      sprintWithStats.speedThree = sprint.delivered.toFixed(2);
    }
    if (index === 1) {
      sprintWithStats.speedThree = (
        [sprint.delivered, array[index - 1].delivered].reduce(
          (a, b) => a + b,
          0
        ) / 2
      ).toFixed(2);
    }
    if (index > 1) {
      sprintWithStats.speedThree = (
        [
          sprint.delivered,
          array[index - 1].delivered,
          array[index - 2].delivered,
        ].reduce((a, b) => a + b, 0) / 3
      ).toFixed(2);
      sprintWithStats.predictabilityThree = (
        [
          Number(sprintWithStats.speedThree),
          Number(sprints[index - 1].speedThree),
          Number(sprints[index - 2].speedThree),
        ].reduce((a, b) => a + b, 0) / 3
      ).toFixed(2);
    }

    return sprints.push(sprintWithStats);
  });

  return sprints;
};

const SprintListPage = () => {
  const [data, setData] = useState<Array<SprintWithStats>>([]);
  const [activeSprint, setActiveSprint] = useState<SprintWithStats | null>(
    null
  );
  useEffect(() => {
    getAllSprints().then((resp) => {
      setData(() => {
        return setStatsSpritnts(resp);
      });
    });
    return () => {};
  }, []);
  const selectSprint = (sprint: SprintWithStats) => {
    setActiveSprint(sprint);
  };
  const columns = React.useMemo(
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
    ],
    []
  );
  // @ts-ignore
  const tableInstance = useTable({ columns, data });
  if (!data) return <div>Loading....</div>;
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    // apply the table props
    <WithNavBar>
      <table
        {...getTableProps()}
        className="m-2 border-emerald-500 border-2 table-auto"
      >
        <thead className="p-2 border-emerald-500">
          {
            // Loop over the header rows
            headerGroups.map((headerGroup, id) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()} key={id}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column, idd) => (
                    // Apply the header cell props
                    <th
                      className="p-2 border-2 border-zinc-900 bg-slate-500 text-white"
                      {...column.getHeaderProps([
                        {
                          // @ts-ignore
                          className: column.className,
                          // @ts-ignore
                          style: column.style,
                        },
                        //   getColumnProps(column),
                        //   getHeaderProps(column),
                      ])}
                      key={idd}
                    >
                      {
                        // Render the header
                        column.render("Header")
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row, id2d) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr
                  {...row.getRowProps()}
                  key={id2d}
                  className="hover:bg-slate-400 transition-colors cursor-pointer"
                  onClick={() => selectSprint(row.original)}
                >
                  {
                    // Loop over the rows cells
                    row.cells.map((cell, id2d) => {
                      // Apply the cell props
                      console.log(cell.getCellProps());
                      return (
                        <td
                          {...cell.getCellProps()}
                          key={id2d}
                          className="p-2 border-2 border-zinc-900"
                        >
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
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
    </WithNavBar>
  );
};

export default SprintListPage;
