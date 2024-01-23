import { type Column, useTable } from 'react-table';
interface Props<T> {
  // eslint-disable-next-line no-unused-vars
  selectSprint?: (sprint: T) => void;
  readonly data: Array<T & object>;
  readonly columns: Array<Column<T & object>>;
}

const Table = <T,>({ data, selectSprint, columns }: Props<T>) => {
  const tableInstance = useTable<T & object>({ columns, data });
  if (!data) return <div>Loading....</div>;
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
  return (
    <table {...getTableProps()} className="m-2 border-2 table-auto border-emerald-500">
      <thead className="p-2 border-emerald-500">
        {
          // Loop over the header rows
          headerGroups.map((headerGroup, id) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()} key={`${headerGroup.id}_${id}`}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column, idd) => (
                  // Apply the header cell props
                  <th
                    className="p-2 text-white bg-slate-500 sticky top-0 border-2 border-zinc-900"
                    {...column.getHeaderProps([
                      {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        className: column.className as string,
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        style: column.style as string,
                      },
                      //   getColumnProps(column),
                      //   getHeaderProps(column),
                    ])}
                    key={`${column.id}_${idd}`}
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
                key={`${row.id}_${id2d}`}
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
                onClick={() => selectSprint?.(row.original)}
              >
                {
                  // Loop over the rows cells
                  row.cells.map((cell, id2d) => {
                    // Apply the cell props

                    return (
                      <td
                        {...cell.getCellProps()}
                        key={`${cell.row.id}_${id2d}`}
                        className="p-2 border-2 border-zinc-900"
                      >
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
