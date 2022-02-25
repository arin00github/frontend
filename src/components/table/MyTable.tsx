import React from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
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
  useAsyncDebounce,
} from "react-table";
import { useState } from "react";
import { useEffect } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import {
  putCurrentNumber,
  putLocation,
  putSearchWord,
  selectPage,
} from "../../redux/features/page";

interface ITable<T extends object> {
  columns: Column<T>[];
  data: T[];
  isIndex?: boolean;
  isSearch?: boolean;
  handleRowClick?: (row: any) => void;
  rowKey?: string;
  selectedId?: string;
}

export function MyTable<T extends object>({
  columns,
  data,
  isIndex,
  isSearch,
  handleRowClick,
  selectedId,
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

  const {
    headerGroups,
    pageOptions,
    headers,
    state: { pageIndex, globalFilter },
    getTableProps,
    page,
    pageCount,
    gotoPage,
    previousPage,
    nextPage,
    prepareRow,
    canNextPage,
    canPreviousPage,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = instance;

  const dispatch = useDispatch();

  const [pageNumberArray, setPageNumberArray] = useState<number[]>(
    pageOptions.slice(0, 5)
  );

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
          prepareRow(row); //꼭 써야 한다.
          return (
            <Tr
              {...row.getRowProps()}
              key={`row${i}`}
              bg={selectedId === row.values[rowKey] ? "gray.100" : ""}
              onClick={(e) => {
                handleRowClick(row.values[rowKey]);
              }}
            >
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

  const displayPageArray = (pageIndex: number) => {
    let newArray;
    const lastNumber = pageOptions.length;

    if (pageIndex >= 0 && pageIndex < 3) {
      newArray = pageOptions.slice(0, 5);
    } else if (pageIndex >= 3 && pageIndex < lastNumber - 2) {
      newArray = pageOptions.slice(pageIndex - 2, pageIndex + 3);
    } else if (pageIndex >= lastNumber - 2) {
      if (pageOptions.length >= 5) {
        newArray = pageOptions.slice(lastNumber - 5, lastNumber);
      } else {
        newArray = pageOptions.slice(0, 5);
      }
    }
    setPageNumberArray(newArray);
  };

  useEffect(() => {
    if (globalFilter === undefined) {
      console.log("globalfilter", globalFilter);
      setGlobalFilter("");
    }
    //console.log("render table");
  }, [globalFilter]);

  useEffect(() => {
    //console.log(pageIndex);
    dispatch(putCurrentNumber(pageIndex));
    dispatch(putLocation(window.location.pathname));
  }, [pageIndex]);

  return (
    <>
      {isSearch && (
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      )}
      <Table>
        {renderThead()}
        {renderTbody()}
        {/* {page.length !== 0 && renderTbody()} */}
      </Table>
      <Flex justify="space-between" w="100%">
        <HStack>
          <IconButton
            aria-label="firstpage"
            size="xs"
            colorScheme="gray"
            onClick={() => {
              gotoPage(0);
            }}
          >
            <ArrowLeftIcon />
          </IconButton>
          <IconButton
            disabled={!canPreviousPage}
            aria-label="previousPage"
            size="xs"
            colorScheme="gray"
            onClick={() => {
              previousPage();
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          {pageNumberArray !== undefined &&
            pageNumberArray.map((index) => (
              <Button
                key={`pagination${index}`}
                aria-label={`pagination${index}`}
                size="xs"
                colorScheme={index === pageIndex ? "red" : "gray"}
                onClick={() => {
                  gotoPage(index);
                  displayPageArray(index);
                }}
              >
                {index + 1}
              </Button>
            ))}

          <IconButton
            disabled={pageIndex === pageOptions.length - 1}
            aria-label="nextPage"
            size="xs"
            colorScheme="gray"
            onClick={() => {
              nextPage();
            }}
          >
            <ChevronRightIcon />
          </IconButton>

          <IconButton
            aria-label="lastpage"
            size="xs"
            colorScheme="gray"
            onClick={() => {
              gotoPage(pageCount - 1);
            }}
          >
            <ArrowRightIcon />
          </IconButton>
        </HStack>
        <Box display="flex">
          <Text lineHeight="40px" mr="10px">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </Text>
        </Box>
      </Flex>
    </>
  );
}

interface IGlobalFilter {
  preGlobalFilteredRows: any;
  globalFilter: string;
  setGlobalFilter: any;
}

function GlobalFilter({
  globalFilter,
  setGlobalFilter,
  preGlobalFilteredRows,
}: IGlobalFilter) {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const onChange = (value: string) => {
    setGlobalFilter(value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (globalFilter === undefined) {
      onChange("");
      setValue("");
    }
  }, [globalFilter]);

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup w={200}>
        <Input
          variant="outline"
          value={value}
          placeholder="검색어를 입력하세요"
          onKeyPress={(e) => {
            if (e.code === "Enter") {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
            dispatch(putSearchWord(e.target.value));
          }}
        />
        <InputRightElement>
          <IconButton
            size="md"
            bg="none"
            borderStartRadius="none"
            _focus={{ boxShadow: "none" }}
            _active={{ color: "white" }}
            _hover={{ bg: "gray.500", color: "white" }}
            aria-label="search-citizen"
            icon={<SearchIcon color="gray.300" />}
          />
        </InputRightElement>
      </InputGroup>
    </form>
  );
}
