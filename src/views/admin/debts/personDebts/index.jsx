import {Box, Flex, Grid, Icon, SimpleGrid, useColorModeValue, Text, Button} from "@chakra-ui/react";

// Custom components
import MiniStatistics from "../../../../components/card/MiniStatistics.js";
import IconBox from "../../../../components/icons/IconBox.js";
import React, { useEffect, useState } from "react";
import {
    MdOutlineHomeRepairService,
    MdOutlineCheck,
    MdOutlineClose,
    MdOutlineCalendarToday,
    MdOutlinePayment
} from "react-icons/md";
import Debts from '../../../../classes/Debts.js';
import Loader from '../../../../helpers/Loader.js';
import Card from '../../../../components/card/Card.js';
import { DebtItemsTable, DebtItemsTableColumns } from '../components/tables/DebtItemsTable.js';
import PaymentRepairField from '../../payments/components/fields/PaymentRepairField.js';
import PaymentPersonField from '../../payments/components/fields/PaymentPersonField.js';
import DatePickerComponent from '../../../../components/pickers/DatePickerComponent.js';
import {useLocation} from 'react-router-dom';

export default function PersonDebts() {
    // Get query string
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const personId = searchParams.get('personId');

    // Chakra Color Mode
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const [loading, setLoading] = useState(true)
    const [debtItems, setDebtItems] = useState([])
    const [personData, setPersonData] = useState([]);

    // Filters
    const [filtersApplied, setFiltersApplied] = useState(false);
    const [filteredDebts, setFilteredDebts] = useState([]);
    const [itemNameFilter, setItemNameFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                Loader.showLoader()
                const response = await Debts.getPersonDebtItems(personId);
                if (response.state) {
                    // Set debt items
                    setDebtItems(response.data.debtItems)
                    setFilteredDebts(response.data.debtItems)

                    // Set person data
                    setPersonData(response.data.personData)

                    Loader.closeLoader()
                    setLoading(false)
                }
            }
            catch (error) {
                console.error("Error fetching worklogs:", error);
                // Handle the error here, e.g., show an error message or fallback worklogs
            }
        };
        fetchData();
    }, []); // Empty dependency array to run the effect only once


    const handleRepairFilter = (_repairId) => {
        // setRepairFilter(_repairId);
        //
        // // Filter worklogs based on the selected repair and person filters
        // const filteredByRepair = worklogs.filter(worklog =>
        //     (_repairId === '' || worklog.repairId == _repairId) &&
        //     (personFilter === '' || worklog.personId == personFilter)
        // );
        //
        // // Update the filtered worklogs using both filters
        // setFilteredWorklogs(filteredByRepair);
        // setFiltersApplied(_repairId !== '' || personFilter !== '');
    };

    const handlePersonFilter = (_selectedPersonId) => {
        // setPersonFilter(_selectedPersonId);
        //
        // // Filter worklogs based on the selected person and repair filters
        // const filteredByPerson = worklogs.filter(worklog =>
        //     (_selectedPersonId === '' || worklog.personId == _selectedPersonId) &&
        //     (repairFilter === '' || worklog.repairId == repairFilter)
        // );
        //
        // // Update the filtered worklogs using both filters
        // setFilteredWorklogs(filteredByPerson);
        // setFiltersApplied(_selectedPersonId !== '' || repairFilter !== '');
    };

    const handleDateFilter = (_dateString) => {
        // setDateFilter(_dateString); // E.g. 2023-08-14
        //
        // // Filter worklogs based on the selected person and repair filters
        // const filteredByDate = worklogs.filter(worklog =>
        //     (_dateString === '' || worklog.date == _dateString) &&
        //     (dateFilter === '' || worklog.date == _dateString)
        // );
        //
        // // Update the filtered worklogs using both filters
        // setFilteredWorklogs(filteredByDate);
        // setFiltersApplied(_dateString !== '' || dateFilter !== '');
    };

    // In the applyFilters function, make sure to pass both personFilter and repairFilter:
    const applyFilters = (filteredWorklogs, personFilter, repairFilter, dateFilter) => {
        // const filteredByPerson = filteredWorklogs.filter(worklog =>
        //     (personFilter === '' || worklog.personId == personFilter)
        // );
        //
        // const filteredByPersonAndRepair = filteredByPerson.filter(worklog =>
        //     (repairFilter === '' || worklog.repairId == repairFilter)
        // );
        //
        // const filteredByPersonAndRepairAndDate = filteredByPersonAndRepair.filter(worklog =>
        //     (dateFilter === '' || worklog.date == dateFilter)
        // );
        //
        // setFilteredWorklogs(filteredByPersonAndRepair);
        // setFiltersApplied(personFilter !== '' || repairFilter !== '' || dateFilter !== '');
    };

    const resetFilters = () => {
        // setPersonFilter('');
        // setRepairFilter('');
        // setDateFilter('')
        // setFilteredWorklogs(worklogs);
        setFiltersApplied(false);
    }


    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <Card mb={{ base: "2px", "2xl": "20px" }} my='25px' >
                <Grid mb='20px'>
                    <Text
                        color={textColor}
                        fontSize='22px'
                        fontWeight='700'
                        lineHeight='100%'>
                        Person Debts
                    </Text>
                    <Text
                        color={textColor}
                        fontSize='18px'
                        py='10px'
                        lineHeight='100%'>
                        Manage your person debts
                    </Text>
                </Grid>
                <Flex justifyContent='end' >
                    {/*<AddNewWorklogButton />*/}
                </Flex>
            </Card>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px' mb='20px'>
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdOutlineCalendarToday} color={brandColor} />
                            }
                        />
                    }
                    name='Items'
                    value={debtItems.length}
                />
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdOutlineCalendarToday} color='green' />
                            }
                        />
                    }
                    name='Paid'
                    value={debtItems.filter(debtItem => debtItem.isPaid==1).length}
                />
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdOutlineClose} color='red' />
                            }
                        />
                    }
                    name='Non-Paid'
                    value={debtItems.filter(debtItem => debtItem.isPaid==0).length}
                />
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap='20px' mb='20px'>
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdOutlinePayment} />
                            }
                        />
                    }
                    name='Cash To Pay'
                    value={debtItems.filter(debtItem => debtItem.isPaid == "0").reduce((sum, debtItem) => sum + debtItem.itemPrice, 0)}
                />
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdOutlinePayment} />
                            }
                        />
                    }
                    name='Cash Paid'
                    value={debtItems.filter(debtItem => debtItem.isPaid == "1").reduce((sum, debtItem) => sum + debtItem.itemPrice, 0)}
                />
            </SimpleGrid>
            <Card mb={{ base: "2px", "2xl": "20px" }} my='25px' >
                <Text fontSize='lg' fontWeight='700' >Filters</Text>
                <SimpleGrid columns={{ base: 1, md: 4 }} gap='20px' mb='20px' my={5}>
                    {/*<PaymentRepairField repairs={repairs} value={repairFilter} onChange={handleRepairFilter} />*/}
                    {/*<PaymentPersonField persons={persons} value={personFilter} onChange={handlePersonFilter} />*/}
                    {/*<DatePickerComponent value={dateFilter} onChange={handleDateFilter} />*/}
                    {filtersApplied && (
                        <Button variant='outline' onClick={resetFilters} mt={8}>
                            Reset Filters
                        </Button>
                    )}
                </SimpleGrid>
            </Card>
            <SimpleGrid columns={{ base: 1 }} gap='20px' mb='20px'>
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1 }} gap='20px' mb='20px'>
                {filteredDebts.length > 0 && !loading ? (
                        <DebtItemsTable columnsData={DebtItemsTableColumns} tableData={debtItems??[]} />
                ) : (
                    <Card mb={{ base: "2px", "2xl": "20px" }} align='center' my='25px' >
                        <Text>No items match the selected filters.</Text>
                    </Card>
                )}
            </SimpleGrid>
        </Box>
    );
}
