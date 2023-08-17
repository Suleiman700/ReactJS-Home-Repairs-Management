import {Box, Flex, Grid, Icon, SimpleGrid, useColorModeValue, Text, Button} from "@chakra-ui/react";

// Custom components
import MiniStatistics from "../../../../components/card/MiniStatistics.js";
import IconBox from "../../../../components/icons/IconBox.js";
import React, { useEffect, useState } from "react";
import { MdOutlinePayments, MdOutlineMoney, MdOutlineAdd } from "react-icons/md";
import PaymentPersonField from '../components/fields/PaymentPersonField.js';
import PaymentRepairField from '../components/fields/PaymentRepairField.js';
import PaymentMethodField from '../components/fields/PaymentMethodField.js';
import DatePickerComponent from '../../../../components/pickers/DatePickerComponent.js';
import { PaymentsTable, PaymentsTableTableColumns } from '../components/tables/PaymentsTable.js';
import Loader from '../../../../helpers/Loader.js';
import Card from '../../../../components/card/Card.js';
import Payments from '../../../../classes/Payments.js';
import {CUSTOM_ROUTES} from '../../../../settings/CUSTOM_ROUTES.js';
import {useHistory} from 'react-router-dom';
import Swal from 'sweetalert2';

export default function PaymentsList() {
    const history = useHistory();

    // Chakra Color Mode
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const [loading, setLoading] = useState([true])
    const [payments, setPayments] = useState([])
    const [repairs, setRepairs] = useState([])
    const [persons, setPersons] = useState([])

    // Filters
    const [filtersApplied, setFiltersApplied] = useState(false);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [personFilter, setPersonFilter] = useState('')
    const [repairFilter, setRepairFilter] = useState('')
    const [methodFilter, setMethodFilter] = useState('')
    const [dateFilter, setDateFilter] = useState('')


    const handlePersonFilter = (_selectedPersonId) => {
        setPersonFilter(_selectedPersonId);

        const filteredPaymentsByPerson = payments.filter(payment =>
            (_selectedPersonId === '' || payment.personID === _selectedPersonId)
        );

        applyFilters(filteredPaymentsByPerson, repairFilter, methodFilter);
    };

    const handleRepairFilter = (_repairId) => {
        setRepairFilter(_repairId);

        const filteredPaymentsByRepair = payments.filter(payment =>
            (_repairId === '' || payment.repairID === _repairId)
        );

        applyFilters(filteredPaymentsByRepair, personFilter, methodFilter);
    };

    const handleDateFilter = (_dateString) => {
        setDateFilter(_dateString); // E.g. 2023-08-14

        const filteredPaymentsByDate = payments.filter(payment =>
            (_dateString === '' || payment.created_at.includes(_dateString))
        );

        applyFilters(filteredPaymentsByDate, personFilter, methodFilter);
    };

    const handleMethodFilter = (_methodName) => {
        setMethodFilter(_methodName);

        const filteredPaymentsByMethod = payments.filter(payment =>
            (_methodName == '' || payment.method.toLowerCase() == _methodName.toLowerCase())
        );

        applyFilters(filteredPaymentsByMethod, personFilter, repairFilter);
    };

    const applyFilters = (filteredPayments, personFilter, repairFilter, dateFilter) => {
        const filteredPaymentsByPerson = filteredPayments.filter(payment =>
            (personFilter === '' || payment.personID === personFilter)
        );

        const filteredPaymentsByPersonAndRepair = filteredPaymentsByPerson.filter(payment =>
            (repairFilter === '' || payment.repairID === repairFilter)
        );

         filteredPaymentsByPersonAndRepair.filter(payment =>
            (dateFilter === '' || payment.created_at.includes(dateFilter))
        );

        setFilteredPayments(filteredPaymentsByPersonAndRepair);
        setFiltersApplied(personFilter !== '' || repairFilter !== '' || methodFilter !== '' || dateFilter !== '');
    };

    const resetFilters = () => {
        setPersonFilter('');
        setRepairFilter('');
        setMethodFilter('');
        setDateFilter('');
        setFilteredPayments(payments);
        setFiltersApplied(false);
    }

    const calculateFilteredPaymentsCount = () => {
        return filteredPayments.length;
    };

    const calculateFilteredMoneyPaid = () => {
        return filteredPayments.reduce((total, payment) => total + parseFloat(payment.amount), 0);
    };


    useEffect(() => {
        const fetchData = async () => {
            Loader.showLoader();
            try {
                const response = await Payments.getAllRecordsAndRelatedData()
                if (response.state) {
                    setPayments(response.data.payments)
                    setRepairs(response.data.repairs)
                    setPersons(response.data.persons)

                    // // Sort the payments state by id in descending order
                    // if (prevTimelines !== undefined) {
                    //     setPayments(prevTimelines => prevTimelines.sort((a, b) => b.id - a.id));
                    // }

                    if (response.data.payments.length) {
                        // Add persons names and repairs names to payments
                        const paymentsWithPersonsAndRepairsNames = response.data.payments.map(payment => {
                            const personData = response.data.persons.find(person => person.id == payment.personID)
                            const repairData = response.data.repairs.find(repair => repair.id == payment.repairID)
                            return {
                                ...payment,
                                personName: personData?personData.name:'NOT FOUND',
                                repairName: repairData?repairData.name:'NOT FOUND',
                            }
                        })
                        setPayments(paymentsWithPersonsAndRepairsNames)
                        setFilteredPayments(paymentsWithPersonsAndRepairsNames)
                    }

                    setLoading(false)
                    Loader.closeLoader()
                }
            }
            catch (error) {
                console.error("Error fetching data:", error);
                // Handle the error here, e.g., show an error message or fallback data
            }
        };
        fetchData();
    }, []); // Empty dependency array to run the effect only once

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <Card mb={{ base: "2px", "2xl": "20px" }} my='25px' >
                <Grid mb='20px'>
                    <Text
                        color={textColor}
                        fontSize='22px'
                        fontWeight='700'
                        lineHeight='100%'>
                        Payments List
                    </Text>
                    <Text
                        color={textColor}
                        fontSize='18px'
                        py='10px'
                        lineHeight='100%'>
                        View and manage your repair payments
                    </Text>
                </Grid>
                <Flex justifyContent='end' >
                    <Button variant='brand' fontWeight='500' onClick={() => history.push(`${CUSTOM_ROUTES.PAYMENTS.ACTION}?mode=add`)} >
                        <Icon as={MdOutlineAdd} color='white' w='24px' h='24px' mx={1} />
                        Add Payment
                    </Button>
                </Flex>
            </Card>
            <SimpleGrid
                columns={{ base: 1, md: 2 }}
                gap='20px'
                mb='20px'>
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdOutlinePayments} color={brandColor} />
                            }
                        />
                    }
                    name='Payments'
                    value={calculateFilteredPaymentsCount()}
                />
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdOutlineMoney} color='green' />
                            }
                        />
                    }
                    name='Money Paid'
                    value={calculateFilteredMoneyPaid()}
                />
            </SimpleGrid>
            <Card mb={{ base: "2px", "2xl": "20px" }} my='25px' >
                <Text fontSize='lg' fontWeight='700' >Filters</Text>
                <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px' mb='20px' my={5}>
                    <PaymentPersonField persons={persons} value={personFilter} onChange={handlePersonFilter} />
                    <PaymentRepairField repairs={repairs} value={repairFilter} onChange={handleRepairFilter} />
                    <DatePickerComponent value={dateFilter} onChange={handleDateFilter} />
                    <PaymentMethodField value={methodFilter} onChange={handleMethodFilter} />
                    {filtersApplied && (
                        <Button variant='outline' onClick={resetFilters} mt={8} >
                            Reset Filters
                        </Button>
                    )}
                </SimpleGrid>
            </Card>
            {/*<SimpleGrid columns={{ base: 1 }} gap='20px' mb='20px'>*/}
            {/*    <PaymentsTable columnsData={PaymentsTableTableColumns} tableData={payments??[]} />*/}
            {/*</SimpleGrid>*/}
            <SimpleGrid columns={{ base: 1 }} gap='20px' mb='20px'>
                {filteredPayments.length > 0 ? (
                    <PaymentsTable columnsData={PaymentsTableTableColumns} tableData={filteredPayments} />
                ) : (
                    <Card mb={{ base: "2px", "2xl": "20px" }} align='center' my='25px' >
                        <Text>No payments match the selected filters.</Text>
                    </Card>
                )}
            </SimpleGrid>
        </Box>
    );
}
