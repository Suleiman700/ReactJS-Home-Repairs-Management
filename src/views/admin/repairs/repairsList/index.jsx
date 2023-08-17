import {Box, Flex, Grid, Icon, SimpleGrid, useColorModeValue, Text} from "@chakra-ui/react";

// Custom components
import MiniStatistics from "../../../../components/card/MiniStatistics.js";
import IconBox from "../../../../components/icons/IconBox.js";
import React, { useEffect, useState } from "react";
import { MdOutlineHomeRepairService, MdOutlineCheck, MdOutlineClose } from "react-icons/md";
import { RepairsTable, RepairsTableColumns } from './components/tables/RepairsTable.js';
import AddNewRepairButton from '../components/buttons/AddNewRepairButton.js';
import Repairs from '../../../../classes/Repairs.js';
import Loader from '../../../../helpers/Loader.js';
import Card from '../../../../components/card/Card.js';

export default function RepairsList() {
    // Chakra Color Mode
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const iconColor = useColorModeValue("secondaryGray.300", "white");
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const [data, setData] = useState([])

    Loader.showLoader()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Repairs.fetchDataFromServer();

                const data = Repairs.data
                console.log(response)

                // sort repairs DESC (newest first)
                data.sort(function(a, b) {
                    return parseFloat(b.id) - parseFloat(a.id);
                });

                // sort repairs by isCompleted
                data.sort(function(a, b) {
                    return parseFloat(a.isCompleted) - parseFloat(b.isCompleted);
                });

                setData(data);
                Loader.closeLoader()
            } catch (error) {
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
                        Repairs List
                    </Text>
                    <Text
                        color={textColor}
                        fontSize='18px'
                        py='10px'
                        lineHeight='100%'>
                        Manage your home repairs data
                    </Text>
                </Grid>
                <Flex justifyContent='end' >
                    <AddNewRepairButton />
                </Flex>
            </Card>
            <SimpleGrid
                columns={{ base: 1, md: 3 }}
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
                    name='Repairs'
                    value={data.length}
                />
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdOutlineCheck} color='green' />
                            }
                        />
                    }
                    name='Completed'
                    value={data.filter(test => test.isCompleted==1).length}
                /><MiniStatistics
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
                    name='In-Completed'
                    value={data.filter(test => test.isCompleted==0).length}
                />
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1 }} gap='20px' mb='20px'>
                <RepairsTable columnsData={RepairsTableColumns} tableData={data??[]} />
            </SimpleGrid>
        </Box>
    );
}
