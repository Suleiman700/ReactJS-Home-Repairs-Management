import {Box, Flex, Icon, SimpleGrid, useColorModeValue, Text, Grid, Button} from "@chakra-ui/react";

// Custom components
import MiniStatistics from "../../../../components/card/MiniStatistics.js";
import IconBox from "../../../../components/icons/IconBox.js";
import React, { useEffect, useState } from "react";
import {MdOutlineHomeRepairService, MdOutlineList, MdOutlineCheck, MdOutlineClose, MdOutlineAdd} from "react-icons/md";
import { RepairsQuotesTable, RepairsTableColumns } from './components/tables/RepairsQuotesTable.js';
import AddNewRepairQuoteButton from '../components/buttons/AddNewRepairQuoteButton.js';
import RepairsQuotes from '../../../../classes/RepairsQuotes.js';
import Repairs from '../../../../classes/Repairs.js';
import Loader from '../../../../helpers/Loader.js';
import Persons from '../../../../classes/Persons.js';
import Card from '../../../../components/card/Card.js';
import {useHistory, useLocation} from 'react-router-dom';
import {CUSTOM_ROUTES} from '../../../../settings/CUSTOM_ROUTES.js';

export default function RepairsQuotesList() {
    const history = useHistory();

    // Chakra Color Mode
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const iconColor = useColorModeValue("secondaryGray.300", "white");
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const [repairsQuotes, setRepairsQuotes] = useState([])
    const [repairs, setRepairs] = useState([])
    const [persons, setPersons] = useState([])

    // Get query string
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const repairId = searchParams.get('repairId');
    const classIns = RepairsQuotes

    Loader.showLoader()

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get repairs quotes for specific repairId
                if (repairId!=null && repairId!=undefined && repairId!='') {
                    const response = await classIns.getRecordDataByKeyAndValue('repairID', repairId);
                    setRepairsQuotes(response.data);
                }
                // Get all repairs quotes
                else {
                    // Get repairs quotes
                    await classIns.fetchDataFromServer();
                    const data = classIns.data
                    setRepairsQuotes(data);
                }

                // Get repairs
                await Repairs.fetchDataFromServer()
                setRepairs(Repairs.data)

                // Get persons
                await Persons.fetchDataFromServer()
                setPersons(Persons.data)

                Loader.closeLoader()
            } catch (error) {
                console.error("Error fetching persons:", error);
                // Handle the error here, e.g., show an error message or fallback persons
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
                        Repairs Quotes List
                    </Text>
                    <Text
                        color={textColor}
                        fontSize='18px'
                        py='10px'
                        lineHeight='100%'>
                        Repairs Quotes helps you store pricing quotes you get from people about your repairs
                    </Text>
                </Grid>
                <Flex justify="end" >
                    <AddNewRepairQuoteButton />
                    {repairId?
                        <Button mx='10px' variant='brand' fontWeight='500' onClick={() => window.location.reload(history.push(CUSTOM_ROUTES.REPAIRS_QUOTES.LIST))}>
                            <Icon as={MdOutlineList} color='white' w='24px' h='24px' />
                            View All Data
                        </Button>:''
                    }
                </Flex>
            </Card>
            <SimpleGrid
                columns={{ base: 1 }}
                gap='20px'
                mb='20px'>
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdOutlineHomeRepairService} color={brandColor} />
                            }
                        />
                    }
                    name='Repairs Quotes'
                    value={repairsQuotes.length}
                />
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1 }} gap='20px' mb='20px'>
                <RepairsQuotesTable columnsData={RepairsTableColumns} tableData={repairsQuotes??[]} repairs={repairs} persons={persons} />
            </SimpleGrid>
        </Box>
    );
}
