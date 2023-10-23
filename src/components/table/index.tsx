import React from "react";
import { useTable } from "react-table";

import styles from "./table.module.scss";

type DataItem = {
  name: string;
  categoryValueId: string;
  classificationId: string;
  status: boolean;
  createdAt: string;
  modifiedBy: string;
  id: string;
};

interface DataTableProps {
  data: DataItem[];
}
const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Element Category",
        accessor: "categoryValueId",
      },
      {
        Header: "Element Classification",
        accessor: "classificationId",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (value ? "Active" : "Inactive"),
      },
      {
        Header: "Created At",
        accessor: "createdAt",
      },
      {
        Header: "Modified By",
        accessor: "modifiedBy",
      },
      {
        Header: "Action",
        accessor: "id",
        Cell: ({ value }) => (
          <div className={styles.action}>
            <span>...</span>
          </div>
        ),
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <table {...getTableProps()} className={styles.table}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: "10px",
                      borderBottom: ".5px solid #CDE1E3",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
