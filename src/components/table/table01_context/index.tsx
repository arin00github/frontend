import React, { createContext, useState } from "react";
import styled from "styled-components";
import Table from "./Table";
import TableFilter from "./TableFilter";

import makeData from "../makeData";

export const TableContext = createContext<any>(null);

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

const App = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName",
          },
          {
            Header: "Last Name",
            accessor: "lastName",
            // Use our custom `fuzzyText` filter on this column
            filter: "fuzzyText",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Age",
            accessor: "age",
          },
          {
            Header: "Visits",
            accessor: "visits",
          },
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Profile Progress",
            accessor: "progress",
          },
        ],
      },
    ],
    []
  );

  const data = React.useMemo(() => makeData(100000), []);
  const [instance, setInstance] = useState(null);

  return (
    <Styles>
      <TableContext.Provider value={{ instance, setInstance }}>
        <TableFilter />
        <Table columns={columns} data={data} />
      </TableContext.Provider>
    </Styles>
  );
};

export default App;
