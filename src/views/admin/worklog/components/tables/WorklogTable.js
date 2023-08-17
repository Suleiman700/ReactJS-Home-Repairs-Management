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
    useColorModeValue, Input, Switch, Icon, Button, Box,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";

// Custom components
import Swal from 'sweetalert2';
import Card from "../../../../../components/card/Card.js";
import WorklogTableDropdowns from '../dropdowns/WorklogTableDropdowns.js';
import {MdOutlineCancel, MdOutlineCheck} from 'react-icons/md';

export const WorklogTableColumns = [
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
        Header: "DATE",
        accessor: "date",
    },
    {
        Header: "START HOUR",
        accessor: "startHour",
    },
    {
        Header: "END HOUR",
        accessor: "endHour",
    },
    {
        Header: "TOTAL",
        accessor: "",
    },
    {
        Header: "PAID",
        accessor: "isPaid",
    },
    {
        Header: "COMMENT",
        accessor: "comment",
    },
    {
        Header: "OPTIONS",
        accessor: "options",
    },
];

export function WorklogTable(props) {
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
            <Box overflowX="scroll">
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
                                <Tr background={row.original.isPaid==1?'#00800024':''} {...row.getRowProps()} key={index}>
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
                                        else if (cell.column.Header === "PERSON") {
                                            data = (
                                                <Flex align='center' justifyContent='center' >
                                                    <Text color={textColor} fontSize='md' fontWeight='700' align='center' dir='auto' width={100} >
                                                        {cell.value}
                                                    </Text>
                                                </Flex>
                                            );
                                        }
                                        else if (cell.column.Header === "REPAIR") {
                                            data = (
                                                <Flex align='center' justifyContent='center' >
                                                    <Text color={textColor} fontSize='md' fontWeight='700' align='center' dir='auto' width={100} >
                                                        {cell.value}
                                                    </Text>
                                                </Flex>
                                            );
                                        }
                                        else if (cell.column.Header === "DATE") {
                                            data = (
                                                <Flex align='center' justifyContent='center' >
                                                    <Text color={textColor} fontSize='md' align='center' dir='auto' width={100} >
                                                        {cell.value}
                                                    </Text>
                                                </Flex>
                                            );
                                        }
                                        else if (cell.column.Header === "START HOUR") {
                                            const [hours, minutes] = cell.value.split(":").map(Number);
                                            const hoursString = hours.toString().padStart(2, '0')
                                            const minutesString = minutes.toString().padStart(2, '0')

                                            data = (
                                                <Flex align='center' justifyContent='center' >
                                                    <Text color={textColor} fontSize='md' align='center' dir='auto' width={100} >
                                                        {hoursString}:{minutesString}
                                                    </Text>
                                                </Flex>
                                            );
                                        }
                                        else if (cell.column.Header === "END HOUR") {
                                            const [hours, minutes] = cell.value.split(":").map(Number);
                                            const hoursString = hours.toString().padStart(2, '0')
                                            const minutesString = minutes.toString().padStart(2, '0')

                                            data = (
                                                <Flex align='center' justifyContent='center' >
                                                    <Text color={textColor} fontSize='md' align='center' dir='auto' width={100} >
                                                        {hoursString}:{minutesString}
                                                    </Text>
                                                </Flex>
                                            );
                                        }
                                        else if (cell.column.Header === "TOTAL") {
                                            const startHour = row.original.startHour;
                                            const endHour = row.original.endHour;
                                            const [startHours, startMinutes] = startHour.split(":").map(Number);
                                            const [endHours, endMinutes] = endHour.split(":").map(Number);
                                            const totalMinutes = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
                                            const totalHours = Math.floor(totalMinutes / 60);
                                            const remainingMinutes = totalMinutes % 60;

                                            data = (
                                                <Flex align='center' justifyContent='center' >
                                                    <Text color={textColor} fontSize='md' align='center' dir='auto' width={100} >
                                                        {String(totalHours).padStart(2, '0')}:{String(remainingMinutes).padStart(2, '0')}
                                                    </Text>
                                                </Flex>
                                            );
                                        }
                                        else if (cell.column.Header === "PAID") {
                                            data = (
                                                <Flex align='center' justifyContent='center' >
                                                    <Text color={textColor} fontSize='md' align='center' dir='auto' width={30} >
                                                        {cell.value=='1'?
                                                            <Icon as={MdOutlineCheck} color='green'/>:<Text color='red'>x</Text>
                                                        }
                                                    </Text>
                                                </Flex>
                                            );
                                        }
                                        else if (cell.column.Header === "COMMENT") {
                                            data = (
                                                <Flex align='center' justifyContent='center' >
                                                    <Text color={textColor} fontSize='md' align='center' whiteSpace='pre-line' dir='auto' width={200} >
                                                        {cell.value.trim().length?
                                                            cell.value.trim().length>=50?
                                                                <Flex flexDirection='column' alignItems='center' >
                                                                    <Text width={200} >
                                                                        {cell.value.substring(0, 50)}...
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
                                        else if (cell.column.Header === "OPTIONS") {
                                            data = (
                                                <Flex align='center' justifyContent='center' >
                                                    <WorklogTableDropdowns recordId={cell.row.values.id} />
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
