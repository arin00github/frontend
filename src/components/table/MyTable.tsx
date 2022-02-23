import React from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
//import {} from "./react-table-config";
import {
  useTable,
  useColumnOrder,
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  Column,
  useRowSelect,
  useRowState,
} from "react-table";

interface ITable<T extends object> {
  columns: Column<T>[];
  data: T[];
  isIndex?: boolean;
  handleRowClick?: (row: any) => void;
  rowKey?: string;
}

export function MyTable<T extends object>({
  columns,
  data,
  isIndex,
  handleRowClick,
  rowKey,
}: ITable<T>) {
  const instance = useTable<T>(
    { columns, data },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useColumnOrder,
    usePagination,
    useRowSelect,
    useRowSelect
  );

  const { headerGroups, headers, state, getTableProps, page } = instance;

  const renderThead = () => {
    return (
      <Thead>
        {headerGroups.map((group, index) => (
          <Tr key={`group${index}`} {...group.getHeaderGroupProps()}>
            {group.headers.map((column, idx) => {
              return (
                <Th key={`column${idx}`} {...column.getHeaderProps()}>
                  {column.render("Header")}
                </Th>
              );
            })}
          </Tr>
        ))}
      </Thead>
    );
  };

  const renderTbody = () => {
    return (
      <Tbody>
        {page.map((row, i) => {
          return (
            <Tr {...row.getRowProps()} key={`row${i}`}>
              {row.cells.map((cell, idx) => {
                return (
                  <Td {...cell.getCellProps()} key={`cell${idx}`}>
                    {cell.render("Cell")}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </Tbody>
    );
  };

  return (
    <>
      <Table>
        {renderThead()}
        {page.length !== 0 && renderTbody()}
      </Table>
    </>
  );
}
