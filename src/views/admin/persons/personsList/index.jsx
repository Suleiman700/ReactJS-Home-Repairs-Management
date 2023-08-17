import {Box, Flex, Grid, Icon, SimpleGrid, useColorModeValue, Text} from "@chakra-ui/react";

// Custom components
import MiniStatistics from "../../../../components/card/MiniStatistics.js";
import IconBox from "../../../../components/icons/IconBox.js";
import React, { useEffect, useState } from "react";
import { MdPeopleAlt } from "react-icons/md";
import { PeopleTable, PeopleTableColumns } from './components/tables/PeopleTable.js';
import AddNewPersonButton from '../components/buttons/AddNewPersonButton.js';
import People from '../../../../classes/Persons.js';
import Loader from '../../../../helpers/Loader.js';
import Card from '../../../../components/card/Card.js';

export default function PersonsList() {
    // Chakra Color Mode
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const iconColor = useColorModeValue("secondaryGray.300", "white");
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const [peopleData, setPeopleData] = useState([])

    Loader.showLoader()

    useEffect(() => {
        const fetchData = async () => {
            try {
                await People.fetchDataFromServer();
                console.log(People.data);
                setPeopleData(People.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle the error here, e.g., show an error message or fallback data
            }

            Loader.closeLoader()
        };
        fetchData();
    }, []); // Empty dependency array to run the effect only once


    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <Card mb={{ base: "2px", "2xl": "20px" }} my='25px' >
                <Grid>
                    <Text
                        color={textColor}
                        fontSize='22px'
                        fontWeight='700'
                        lineHeight='100%'>
                        Persons List
                    </Text>
                    <Text
                        color={textColor}
                        fontSize='18px'
                        py='10px'
                        lineHeight='100%'>
                        Manage your home repairs persons data
                    </Text>
                </Grid>
                <Flex justifyContent='end' >
                    <AddNewPersonButton />
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
                                <Icon w='32px' h='32px' as={MdPeopleAlt} color={brandColor} />
                            }
                        />
                    }
                    name='Persons'
                    value={People.data.length}
                />
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1 }} gap='20px' mb='20px'>
                <PeopleTable columnsData={PeopleTableColumns} tableData={peopleData??[]} />
                {/*<CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck}/>*/}
            </SimpleGrid>
        </Box>
    );
}
