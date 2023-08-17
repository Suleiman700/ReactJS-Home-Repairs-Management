import {
    Flex,
    Table,
    Checkbox,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue, Input, Switch,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";

// Custom components
import Card from "../../../../../../components/card/Card.js";
import Menu from "../../../../../../components/menu/MainMenu.js";
import RepairsTableDropdowns from '../dropdowns/RepairsTableDropdowns.js';

export const RepairsTableColumns = [
    {
        Header: "ID",
        accessor: "id",
    },
    {
        Header: "NAME",
        accessor: "name",
    },
    {
        Header: "DESCRIPTION",
        accessor: "description",
    },
    {
        Header: "COMPLETED",
        accessor: "isCompleted",
    },
    {
        Header: "OPTIONS",
        accessor: "options",
    },
];

export function RepairsTable(props) {
    let { columnsData, tableData } = props;

    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);

    const tableInstance = useTable(
        {
            columns,
            data,
            // initialState: { pageIndex: 0, pageSize: 1 }
        },
        useGlobalFilter, // Add useGlobalFilter hook
        useSortBy,
        usePagination
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        initialState,
        setPageSize, // Add setPageSize function
        state, // Add state from tableInstance to get globalFilter value
        setGlobalFilter
    } = tableInstance;
    initialState.pageSize = 9999999;

    const { globalFilter } = state;

    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

    // const handleChangePageSize = (event) => {
    //     const newPageSize = Number(event.target.value);
    //     setPageSize(newPageSize);
    // };

    return (
        <Card
            direction='column'
            w='100%'
            px='0px'
            overflowX={{ sm: "scroll", lg: "hidden" }}>
            <Flex px='25px' pb="25px" display="flex" flexWrap="wrap" justify='space-between' align='center'>
                <Text
                    color={textColor}
                    fontSize='22px'
                    fontWeight='700'
                    my="10px"
                    lineHeight='100%'>
                    Repairs Table
                </Text>
                <Input
                    type='text'
                    value={globalFilter || ''}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder='Search...'
                    maxW='300px'
                    my="10px"
                    dir="auto"
                />
                {/*<Menu />*/}
            </Flex>
            {/*<select value={initialState.pageSize} onChange={handleChangePageSize}>*/}
            {/*    <option value={1}>1</option>*/}
            {/*    <option value={2}>2</option>*/}
            {/*    <option value={3}>3</option>*/}
            {/*    /!* Add more options as needed *!/*/}
            {/*</select>*/}
            <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px' >
                <Thead>
                    {headerGroups.map((headerGroup, index) => (
                        <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                            {headerGroup.headers.map((column, index) => (
                                <Th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    pe='10px'
                                    key={index}
                                    borderColor={borderColor}>
                                    <Flex
                                        justify='center'
                                        align='center'
                                        fontSize={{ sm: "10px", lg: "12px" }}
                                        color='gray.400'>
                                        {column.render("Header")}
                                    </Flex>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {page.map((row, index) => {
                        prepareRow(row);
                        return (
                            <Tr background={row.original.isCompleted==1?'#00800024':''} {...row.getRowProps()} key={index}>
                                {row.cells.map((cell, index) => {
                                    let data = "";
                                    if (cell.column.Header === "ID") {
                                        data = (
                                            <Flex align='center' justifyContent='center' >
                                                <Text color={textColor} fontSize='md' >
                                                    {cell.value}
                                                </Text>
                                            </Flex>
                                        );
                                    }
                                    else if (cell.column.Header === "NAME") {
                                        data = (
                                            <Flex align='center' justifyContent='center' >
                                                <Text color={textColor} fontSize='md' fontWeight='700' >
                                                    {cell.value}
                                                </Text>
                                            </Flex>
                                        );
                                    }
                                    else if (cell.column.Header === "DESCRIPTION") {
                                        data = (
                                            <Flex align='center' justifyContent='center' >
                                                <Text color={textColor} fontSize='md'>
                                                    {cell.value.trim().length?cell.value:'-'}
                                                </Text>
                                            </Flex>
                                        );
                                    } else if (cell.column.Header === "COMPLETED") {
                                        data = (
                                            <Flex align='center' justifyContent='center' >
                                                <Text color={cell.value==1?'green':'red'} fontSize='md' justifyContent='center' >
                                                    {cell.value==1?'✓':'x'}
                                                </Text>
                                            </Flex>
                                        );
                                    }
                                    else if (cell.column.Header === "OPTIONS") {
                                        data = (
                                            <Flex align='center' justifyContent='center' >
                                                <RepairsTableDropdowns recordId={cell.row.values.id} />
                                            </Flex>
                                        );
                                    }
                                    return (
                                        <Td
                                            {...cell.getCellProps()}
                                            key={index}
                                            fontSize={{ sm: "14px" }}
                                            minW={{ sm: "150px", md: "200px", lg: "auto" }}
                                            borderColor='transparent'>
                                            {data}
                                        </Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </Card>
    );
}
