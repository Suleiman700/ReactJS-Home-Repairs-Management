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
    useColorModeValue, Input, Switch, Button, Grid, Badge, Box,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";

// Custom components
import Card from "../../../../../components/card/Card.js";
import RepairPaymentsTableDropdown from '../dropdowns/PaymentsTableDropdowns.js';
import { REPAIRS_QUOTES_TABLE_SETTINGS } from '../../../../../settings/TABLES_SETTINGS.js';
import Swal from 'sweetalert2';

export const RepairPaymentsTableColumns = [
    {
        Header: "ID",
        accessor: "id",
    },
    {
        Header: "PERSON",
        accessor: "personName",
    },
    {
        Header: "AMOUNT",
        accessor: "amount",
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
        Header: "NOTE",
        accessor: "note",
    },
    {
        Header: "METHOD",
        accessor: "method",
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
export const PaymentsTableTableColumns = [
    {
        Header: "ID",
        accessor: "id",
    },
    {
        Header: "PERSON",
        accessor: "personName",
    },
    {
        Header: "REPAIR",
        accessor: "repairName",
    },
    {
        Header: "AMOUNT",
        accessor: "amount",
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
        Header: "NOTE",
        accessor: "note",
    },
    {
        Header: "METHOD",
        accessor: "method",
    },
    {
        Header: "STATUS",
        accessor: "status",
    },
    {
        Header: "CREATED",
        accessor: "created_at",
    },
    {
        Header: "OPTIONS",
        accessor: "options",
    },
];

export function PaymentsTable(props) {
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
            <Box overflowX="scroll">
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
                                        let data = "";
                                        if (cell.column.Header === "ID") {
                                            data = (
                                                <Flex fontSize='md' align='center' justifyContent='center' >
                                                    <Text >
                                                        {cell.value}
                                                    </Text>
                                                </Flex>
                                            );
                                        }
                                        else if (cell.column.Header === "PERSON") {
                                            data = (
                                                <Flex fontSize='md' align='center' justifyContent='center' color={textColor} >
                                                    <Text color={textColor} fontSize='md' fontWeight='700' align='center' dir='auto' width={150} >
                                                        {cell.value}
                                                    </Text>
                                                </Flex>
                                            );
                                        }
                                        else if (cell.column.Header === "REPAIR") {
                                            data = (
                                                <Flex fontSize='md' align='center' justifyContent='center' color={textColor} >
                                                    <Text color={textColor} fontSize='md' fontWeight='700' align='center' dir='auto' width={100} >
                                                        {cell.value}
                                                    </Text>
                                                </Flex>
                                            );
                                        }
                                        else if (cell.column.Header === "AMOUNT") {
                                            data = (
                                                <Flex color={textColor} fontSize='md' align='center' justify='center' >
                                                    <Text align='center' dir='auto' >
                                                        {cell.value}
                                                    </Text>
                                                </Flex>
                                            );
                                        }
                                        else if (cell.column.Header === "NAME") {
                                            data = (
                                                <Flex color={textColor} fontSize='md' align='center' justify='center' >
                                                    <Text align='center' dir='auto' width={150} >
                                                        {cell.value}
                                                    </Text>
                                                </Flex>
                                            );
                                        }
                                        else if (cell.column.Header === "DESCRIPTION") {
                                            data = (
                                                <Flex color={textColor} fontSize='md' align='center' justify='center' >
                                                    <Text color={textColor} fontSize='md' align='center' whiteSpace='pre-line' dir='auto' width={200} >
                                                        {cell.value.trim().length?
                                                            cell.value.trim().length>=REPAIRS_QUOTES_TABLE_SETTINGS.COLUMNS_LENGTH.DESCRIPTION_MAX_LENGTH_TO_ENABLE_SWAL?
                                                                <Flex flexDirection='column' alignItems='center' >
                                                                    <Text width={200} >
                                                                        {cell.value.substring(0,REPAIRS_QUOTES_TABLE_SETTINGS.COLUMNS_LENGTH.DESCRIPTION_MAX_LENGTH_TO_ENABLE_SWAL)}...
                                                                    </Text>
                                                                    <Button
                                                                        color='black'
                                                                        background='#2778c421'
                                                                        mt='3'
                                                                        width={150}
                                                                        onClick={() => {
                                                                            Swal.fire({
                                                                                icon: 'info',
                                                                                title: `Description #${cell.row.original.id}`,
                                                                                html: `
                                                                                <div >
                                                                                    <div>
                                                                                        <span style="text-decoration: underline;">Created At</span><br>
                                                                                        ${cell.row.original.created_at}
                                                                                    </div>
                                                                                    <div style="margin-top: 10px;">
                                                                                        <span style="text-decoration: underline;">Person</span><br>
                                                                                        ${cell.row.original.personName}
                                                                                    </div>
                                                                                    <div style="margin-top: 10px;">
                                                                                        <span style="text-decoration: underline;">Repair</span><br>
                                                                                        ${cell.row.original.repairName}
                                                                                    </div>
                                                                                    <div style="margin-top: 10px;">
                                                                                        <span style="text-decoration: underline;">Amount</span><br>
                                                                                        ${cell.row.original.amount}
                                                                                    </div>
                                                                                    <hr style="margin: 10px 0;" />
                                                                                    <div style="white-space: pre-line" dir="auto">
                                                                                        ${cell.value}
                                                                                    </div>
                                                                                </div>
                                                                            `
                                                                            })
                                                                        }}
                                                                    >
                                                                        View More
                                                                    </Button>
                                                                </Flex>
                                                                :cell.value
                                                            :'-'
                                                        }
                                                    </Text>
                                                </Flex>
                                            );
                                        }
                                        else if (cell.column.Header === "NOTE") {
                                            data = (
                                                <Flex color={textColor} fontSize='md' align='center' justify='center' >
                                                    <Text color={textColor} fontSize='md' align='center' whiteSpace='pre-line' dir='auto' width={150} >
                                                        {cell.value.trim().length?
                                                            cell.value.trim().length>=REPAIRS_QUOTES_TABLE_SETTINGS.COLUMNS_LENGTH.DESCRIPTION_MAX_LENGTH_TO_ENABLE_SWAL?
                                                                <Flex flexDirection='column' alignItems='center' >
                                                                    <Text width={150} >
                                                                        {cell.value.substring(0,REPAIRS_QUOTES_TABLE_SETTINGS.COLUMNS_LENGTH.DESCRIPTION_MAX_LENGTH_TO_ENABLE_SWAL)}...
                                                                    </Text>
                                                                    <Button
                                                                        color='black'
                                                                        background='#2778c421'
                                                                        mt='3'
                                                                        width={150}
                                                                        onClick={() => {
                                                                            Swal.fire({
                                                                                icon: 'info',
                                                                                title: `Note #${cell.row.original.id}`,
                                                                                html: `
                                                                                <div >
                                                                                    <div>
                                                                                        <span style="text-decoration: underline;">Created At</span><br>
                                                                                        ${cell.row.original.created_at}
                                                                                    </div>
                                                                                    <div style="margin-top: 10px;">
                                                                                        <span style="text-decoration: underline;">Person</span><br>
                                                                                        ${cell.row.original.personName}
                                                                                    </div>
                                                                                    <div style="margin-top: 10px;">
                                                                                        <span style="text-decoration: underline;">Repair</span><br>
                                                                                        ${cell.row.original.repairName}
                                                                                    </div>
                                                                                    <div style="margin-top: 10px;">
                                                                                        <span style="text-decoration: underline;">Amount</span><br>
                                                                                        ${cell.row.original.amount}
                                                                                    </div>
                                                                                    <hr style="margin: 10px 0;" />
                                                                                    <div style="white-space: pre-line" dir="auto">
                                                                                        ${cell.value}
                                                                                    </div>
                                                                                </div>
                                                                            `
                                                                            })
                                                                        }}
                                                                    >
                                                                        View More
                                                                    </Button>
                                                                </Flex>
                                                                :cell.value
                                                            :'-'
                                                        }
                                                    </Text>
                                                </Flex>
                                            );
                                        }
                                        else if (cell.column.Header === "METHOD") {
                                            data = (
                                                <Flex fontSize='md' justifyContent='center' width={100} >
                                                    <Badge background='orange' color='white' dir='auto' align='center' whiteSpace='pre-line' >
                                                        {cell.value}
                                                    </Badge>
                                                </Flex>
                                            );
                                        }
                                        else if (cell.column.Header === "STATUS") {
                                            data = (
                                                <Flex fontSize='md' justifyContent='center' width={100} >
                                                    <Badge background='orange' color='white' dir='auto' align='center' whiteSpace='pre-line' >
                                                        {cell.value}
                                                    </Badge>
                                                </Flex>
                                            );
                                        }
                                        else if (cell.column.Header === "CREATED") {
                                            data = (
                                                <Flex color={textColor} fontSize='md' align='center' justify='center' >
                                                    <Text align='center' dir='auto' width={100} >
                                                        {cell.value}
                                                    </Text>
                                                </Flex>
                                            );
                                        }
                                        else if (cell.column.Header === "OPTIONS") {
                                            data = (
                                                <Flex fontSize='md' align='center' justifyContent='center' >
                                                    <RepairPaymentsTableDropdown recordId={cell.row.values.id} repairId={cell.row.original.repairID} />
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
            </Box>
        </Card>
    );
}
