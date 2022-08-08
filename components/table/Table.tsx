/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { Column, useTable } from 'react-table';
interface Props<T> {
  selectSprint?: (sprint: T) => void;
  readonly data: Array<T & object>;
  readonly columns: Array<Column<T & object>>;
}

const Table = <T,>({ data, selectSprint, columns }: Props<T>) => {
  const tableInstance = useTable<T & object>({ columns, data });
  if (!data) return <div>Loading....</div>;
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
  return (
    <table {...getTableProps()} className="m-2 border-emerald-500 border-2 table-auto">
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
                      column.render('Header')
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
                // className={`${
                //   row.original.Typeofwork === "Organization"
                //     ? "bg-green-600"
                //     : ""
                // }
                // ${row.original.Typeofwork === "Bugs" ? "bg-red-600" : ""}
                // ${
                //   row.original.Typeofwork === "Maintenance"
                //     ? "bg-orange-400"
                //     : ""
                // }
                // ${row.original.Typeofwork === "Innovation" ? "bg-blue-400" : ""}

                // hover:bg-slate-400 transition-colors cursor-pointer`}
                onClick={() => selectSprint && selectSprint(row.original)}
              >
                {
                  // Loop over the rows cells
                  row.cells.map((cell, id2d) => {
                    // Apply the cell props

                    return (
                      <td {...cell.getCellProps()} key={id2d} className="p-2 border-2 border-zinc-900">
                        {
                          // Render the cell contents
                          cell.render('Cell')
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

export default Table;
