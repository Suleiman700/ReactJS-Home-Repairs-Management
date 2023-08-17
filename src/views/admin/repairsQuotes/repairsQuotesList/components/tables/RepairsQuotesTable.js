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
    useColorModeValue, Input, Switch, Button, Grid, Badge,
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
import RepairsQuotesTableDropdowns from '../dropdowns/RepairsQuotesTableDropdowns.js';
import { REPAIRS_QUOTES_TABLE_SETTINGS } from '../../../../../../settings/TABLES_SETTINGS.js';
import Swal from 'sweetalert2';

export const RepairsTableColumns = [
    {
        Header: "ID",
        accessor: "id",
    },
    {
        Header: "REPAIR",
        accessor: "repairID",
    },
    {
        Header: "PERSON",
        accessor: "person_id",
    },
    {
        Header: "PRICE",
        accessor: "price",
    },
    {
        Header: "DESCRIPTION",
        accessor: "description",
    },
    {
        Header: "COMMENT",
        accessor: "comment",
    },
    {
        Header: "STATUS",
        accessor: "status",
    },
    {
        Header: "OPTIONS",
        accessor: "options",
    },
];

export function RepairsQuotesTable(props) {
    let { columnsData, tableData, repairs, persons } = props;

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
            <Flex px='25px' pb="25px" display="flex" flexWrap="wrap" justify='end' align='center'>
                {/*<Text*/}
                {/*    color={textColor}*/}
                {/*    fontSize='22px'*/}
                {/*    fontWeight='700'*/}
                {/*    my="10px"*/}
                {/*    lineHeight='100%'>*/}
                {/*    Repairs Quotes List*/}
                {/*</Text>*/}
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
            <Table {...getTableProps()} variant='striped' color='gray.500' mb='24px' >
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
                            <Tr {...row.getRowProps()} key={index}>
                                {row.cells.map((cell, index) => {
                                    // Find repair data foreach repair quote
                                    const repairData = repairs.find(repair => repair.id == row.original.repairID)
                                    // Find person data foreach repair quote
                                    const personData = persons.find(person => person.id == row.original.person_id)

                                    let data = "";
                                    if (cell.column.Header === "ID") {
                                        data = (
                                            <Flex fontSize='md' align='center' >
                                                <Text color='red' >
                                                    {cell.value}
                                                </Text>
                                            </Flex>
                                        );
                                    }
                                    else if (cell.column.Header === "REPAIR") {
                                        data = (
                                            <Flex fontSize='md' align='center' justify='center' >
                                                <Text color={textColor} fontSize='md' fontWeight='700' align='center' >
                                                    {repairData?repairData.name:'NOT FOUND'}
                                                </Text>
                                            </Flex>
                                        );
                                    }
                                    else if (cell.column.Header === "PERSON") {
                                        data = (
                                            <Flex fontSize='md' align='center' justify='center' color={textColor} >
                                                <Text color={textColor} fontSize='md' fontWeight='700' align='center' >
                                                    {personData?personData.name:'NOT FOUND'}
                                                </Text>
                                            </Flex>
                                        );
                                    }
                                    else if (cell.column.Header === "PRICE") {
                                        data = (
                                            <Flex color={textColor} fontSize='md' align='center' justify='center' >
                                                <Text align='center' >
                                                    {cell.value}
                                                </Text>
                                            </Flex>
                                        );
                                    }
                                    else if (cell.column.Header === "DESCRIPTION") {
                                        data = (
                                            <Text color={textColor} fontSize='md' align='center' whiteSpace='pre-line' dir='auto' >
                                                {cell.value.trim().length?
                                                    cell.value.trim().length>REPAIRS_QUOTES_TABLE_SETTINGS.COLUMNS_LENGTH.DESCRIPTION_MAX_LENGTH_TO_ENABLE_SWAL?
                                                        <Grid>
                                                            {cell.value.substring(0,REPAIRS_QUOTES_TABLE_SETTINGS.COLUMNS_LENGTH.DESCRIPTION_MAX_LENGTH_TO_ENABLE_SWAL)}...
                                                            <Button
                                                                color='black'
                                                                background='#2778c421'
                                                                mt='3'
                                                                onClick={() => {
                                                                    Swal.fire({
                                                                        icon: 'info',
                                                                        title: 'Description',
                                                                        html: `
                                                                    <div style="white-space: pre-line" dir='auto' >
                                                                        ${cell.value}
                                                                    </div>
                                                                `
                                                                    })
                                                                }}
                                                            >
                                                                View More
                                                            </Button>
                                                        </Grid>
                                                        :cell.value
                                                    :'-'
                                                }
                                            </Text>
                                        );
                                    }
                                    else if (cell.column.Header === "COMMENT") {
                                        data = (
                                            <Text color={textColor} fontSize='md' align='center' whiteSpace='pre-line' dir='auto' >
                                                {cell.value.trim().length?
                                                    cell.value.trim().length>REPAIRS_QUOTES_TABLE_SETTINGS.COLUMNS_LENGTH.COMMENT_MAX_LENGTH_TO_ENABLE_SWAL?
                                                        <Grid>
                                                            {cell.value.substring(0,REPAIRS_QUOTES_TABLE_SETTINGS.COLUMNS_LENGTH.COMMENT_MAX_LENGTH_TO_ENABLE_SWAL)}...
                                                            <Button
                                                                color='black'
                                                                background='#2778c421'
                                                                mt='3'
                                                                onClick={() => {
                                                                    Swal.fire({
                                                                        icon: 'info',
                                                                        title: 'Comment',
                                                                        html: `
                                                                    <div style="white-space: pre-line" dir='auto' >
                                                                        ${cell.value}
                                                                    </div>
                                                                `
                                                                    })
                                                                }}
                                                            >
                                                                View More
                                                            </Button>
                                                        </Grid>
                                                        :cell.value
                                                    :'-'
                                                }
                                            </Text>
                                        );
                                    }
                                    else if (cell.column.Header === "STATUS") {
                                        data = (
                                        <Flex fontSize='md' align='center' justify='center' >
                                            <Badge background='orange' color={textColor}>
                                                {cell.value}
                                            </Badge>
                                        </Flex>
                                        );
                                    }
                                    else if (cell.column.Header === "OPTIONS") {
                                        data = (
                                            <RepairsQuotesTableDropdowns recordId={cell.row.values.id} />
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
