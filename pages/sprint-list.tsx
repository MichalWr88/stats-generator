import { getAllSprints } from "@/components/api/dataProvider";
import { Sprint } from "@/models/Sprint";
import React, { useMemo, useEffect, useState, useDebugValue } from "react";
import { useTable } from "react-table";
type Props = {};

const SprintListPage = () => {
  const [data, setData] = useState<Array<Sprint>>([]);
  useEffect(() => {
    getAllSprints().then((resp) => {
      setData((prevData) => {
        return resp;
      });
    });
    return () => {};
  }, []);

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
          new Date(value).toLocaleDateString(),
      },
      {
        Header: "Bug",
        columns:[
            {
                Header:"Closed",
                accessor: "bug.closed",
            },
            {
                Header:"review",
                accessor: "bug.review",
            },
            {
                Header:"accepted",
                accessor: "bug.accepted",
            },
            {
                Header:"inProgress",
                accessor: "bug.inProgress",
            },
            {
                Header:"inTesting",
                accessor: "bug.inTesting",
            },
            {
                Header:"rfd",
                accessor: "bug.rfd",
            },
            {
                Header:"onHold",
                accessor: "bug.onHold",
            }
            

        ]
        
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
              <tr {...row.getRowProps()} key={id2d}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell, id2d) => {
                    // Apply the cell props
                    console.log(cell.getCellProps());
                    return (
                      <td {...cell.getCellProps()} key={id2d} className="p-2 border-2 border-zinc-900">
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
  );
};

export default SprintListPage;
