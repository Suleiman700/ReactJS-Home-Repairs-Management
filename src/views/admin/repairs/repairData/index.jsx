// Chakra imports
import {
    Box,
    Grid,
    useColorModeValue,
    Text,
    Flex,
    Tabs,
    Tab,
    SimpleGrid,
    useDisclosure,
    Button, Icon,
} from "@chakra-ui/react";

// Custom components
import Swal from 'sweetalert2';
import RepairNameField from '../components/fields/RepairNameField.js';
import RepairDescriptionField from '../components/fields/RepairDescriptionField.js';
import { RepairQuotesTable, RepairQuotesTableColumns } from '../../repairsQuotes/components/tables/RepairQuotesTable.js';
import RepairTimelineCard from '../components/cards/RepairTimelineCard.js';
import Repairs from '../../../../classes/Repairs.js';
import RepairTimelineEditModal from '../components/modals/RepairTimelineEditModal.js';
import { PaymentsTable, RepairPaymentsTableColumns } from '../../payments/components/tables/PaymentsTable.js';

// Assets
import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from 'react-router-dom';
import Card from '../../../../components/card/Card.js';
import Loader from '../../../../helpers/Loader.js';
import RepairsListButton from '../components/buttons/RepairsListButton.js';
import { CUSTOM_ROUTES } from '../../../../settings/CUSTOM_ROUTES.js';
import RepairsTimeline from '../../../../classes/RepairsTimeline.js';
import { MdOutlineAdd, MdOutlineRequestQuote, MdOutlinePayment, MdOutlinePayments } from 'react-icons/md';
import IconBox from '../../../../components/icons/IconBox.js';
import MiniStatistics from "../../../../components/card/MiniStatistics.js";

export default function RepairData() {
    const history = useHistory();
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

    const [loading, setLoading] = useState(true);
    const [repairData, setRepairData] = useState([]);
    const [repairQuotes, setRepairQuotes] = useState([]);
    const [persons, setPersons] = useState([]);
    const [repairPayments, setRepairPayments] = useState([]);
    const [repairTimeline, setRepairTimeline] = useState([]);
    const [selectedTab, setSelectedTab] = useState('quotes');

    // Repair timeline edit modal
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [timelineDataToEdit, setTimelineDataToEdit] = useState({});
    const [timelineEditModalMode, setTimelineEditModalMode] = useState('edit');

    // Button to open modal to add new timeline
    const handleTimelineAddBtn = () => {
        // Set mode to add
        setTimelineDataToEdit({});
        setTimelineEditModalMode('add')
        onOpen();
    }

    // Button to open modal that edits timeline
    const handleTimelineEditBtn = (_timelineData) => {
        setTimelineDataToEdit(_timelineData);
        setTimelineEditModalMode('edit')
        onOpen();
    }
    // Timeline edit modal delete button
    const handleTimelineModalDeleteBtn = async (_timelineId) => {
        Loader.showLoader()

        const isTimelineDeleted = await RepairsTimeline.deleteRecord(_timelineId)
        if (isTimelineDeleted.state) {
            // Update the repairTimeline state with the new comment data
            const updatedTimelines = repairTimeline.filter(timeline => timeline.id != _timelineId)
            setRepairTimeline(updatedTimelines);

            Swal.fire({
                icon: 'success',
                title: 'Yay',
                text: 'Timeline deleted successfully',
            })
            onClose(); // Close the modal
        }
    }

    /**
     * Handle timeline modal save button
     * @param _timelineData {object} Timeline data, Example:
     * {
     *     "id": 41,
     *     "repairID": 15,
     *     "comment": "New edited comment",
     *     "created_at": "2023-07-18 13:11:05"
     * }
     * @return {Promise<void>}
     */
    const handleTimelineModalSaveBtn = async (_timelineData) => {
        console.log(_timelineData)

        // Check if comment is empty
        if (!_timelineData.comment.trim().length) {
            Swal.fire({
                icon: 'error',
                title: 'Comment is required',
            })
            return
        }

        // Edit timeline
        if (timelineEditModalMode==='edit') {
            Loader.showLoader()
            const isTimelineCommentUpdated = await RepairsTimeline.updateRepairTimelineComment(timelineDataToEdit.id, _timelineData.comment)
            if (isTimelineCommentUpdated.state) {
                // Update the repairTimeline state with the new comment data
                const updatedTimelines = repairTimeline.map(timeline => {
                    if (timeline.id === timelineDataToEdit.id) {
                        return {
                            ...timeline,
                            created_at: 'Just Now',
                            comment: _timelineData.comment
                        };
                    }
                    return timeline;
                });
                setRepairTimeline(updatedTimelines);

                // onClose(); // Close the modal
                Swal.fire({
                    icon: 'success',
                    title: 'Yay',
                    text: 'Timeline updated successfully',
                })
            }
        }
        else if (timelineEditModalMode==='add') {
            Loader.showLoader()
            const isTimelineCommentUpdated = await RepairsTimeline.addNewRepairTimelineComment(recordId, _timelineData.comment)
            if (isTimelineCommentUpdated.state) {

                // Create a new timeline object
                const newTimeline = {
                    id: isTimelineCommentUpdated.data.newID,
                    created_at: 'Just Now',
                    comment: _timelineData.comment,
                };

                setRepairTimeline(prevTimelines => [...prevTimelines, newTimeline]);

                // Sort the repairTimeline state by id in descending order
                setRepairTimeline(prevTimelines => prevTimelines.sort((a, b) => b.id - a.id));

                // onClose(); // Close the modal
                Swal.fire({
                    icon: 'success',
                    title: 'Yay',
                    text: 'Timeline added successfully',
                })
            }
        }
    }


    // Get query string
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const recordId = searchParams.get('recordId');
    const mode = searchParams.get('mode');
    const classIns = Repairs


    useEffect(async () => {
        // Check if parameter is set
        if (typeof recordId !== undefined && recordId !== null && recordId.length) {
            // Get repair data
            try {
                Loader.showLoader(); // Show loading before making the request

                const allRepairData = await classIns.getRecordAndRelatedData(recordId);
                if (!allRepairData.state) {
                    history.push(CUSTOM_ROUTES.REPAIRS.LIST);
                    return
                }
                setRepairData(allRepairData.data.repairData);
                setPersons(allRepairData.data.persons)
                setRepairQuotes(allRepairData.data.repairQuotes)
                setRepairTimeline(allRepairData.data.repairTimeline)
                setRepairPayments(allRepairData.data.repairPayments)

                // Add person name to repair quotes
                const repairQuotesWithPersonsNames = allRepairData.data.repairQuotes.map(repairQuote => {
                    const personData = allRepairData.data.persons.find(person => person.id == repairQuote.person_id)
                    return {
                        ...repairQuote,
                        personName: personData?personData.name:'NOT FOUND'
                    }
                })
                setRepairQuotes(repairQuotesWithPersonsNames)

                // Add person name to repair payments
                const repairPaymentsWithPersonsNames = allRepairData.data.repairPayments.map(repairPayment => {
                    const personData = allRepairData.data.persons.find(person => person.id == repairPayment.personID)
                    return {
                        ...repairPayment,
                        personName: personData?personData.name:'NOT FOUND'
                    }
                })
                setRepairPayments(repairPaymentsWithPersonsNames)

                // Sort the repairPayments state by id in descending order
                setRepairPayments(prevTimelines => prevTimelines.sort((a, b) => b.id - a.id));

                Loader.closeLoader(); // Hide the loading after data is fetched

                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error);
                // Loader.hideLoader(); // Hide the loading if an error occurs
            }
        } else {
            history.push(CUSTOM_ROUTES.REPAIRS.LIST);
        }
    }, [mode]);


    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <Card mb={{ base: "2px", "2xl": "20px" }} my='25px' >
                <Grid>
                    <Text
                        color={textColor}
                        fontSize='22px'
                        fontWeight='700'
                        lineHeight='100%'>
                        Repair Data
                    </Text>
                    <Text
                        color={textColor}
                        fontSize='18px'
                        py='10px'
                        lineHeight='100%'>
                        Manage your home repair data like quotes timeline ...etc
                    </Text>
                </Grid>
                <Flex justifyContent='end' >
                    <RepairsListButton />
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
                                <Icon w='32px' h='32px' as={MdOutlineRequestQuote} color={brandColor} />
                            }
                        />
                    }
                    name='Quotes'
                    value={repairQuotes.length}
                />
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdOutlinePayment} color={brandColor} />
                            }
                        />
                    }
                    name='Payments'
                    value={repairPayments.length}
                /><MiniStatistics
                startContent={
                    <IconBox
                        w='56px'
                        h='56px'
                        bg={boxBg}
                        icon={
                            <Icon w='32px' h='32px' as={MdOutlinePayments} color='green' />
                        }
                    />
                }
                name='Money Paid'
                value={repairPayments.reduce((accumulator, repairPayment) => {return accumulator + parseInt(repairPayment.amount)}, 0)}
            />
            </SimpleGrid>
            <Card mb={{ base: "0px", "2xl": "20px" }} >
                <RepairNameField value={repairData.name} isDisabled={true} />
                <RepairDescriptionField value={repairData.description} isDisabled={true} />
            </Card>
            <Card mb={{ base: "0px", "2xl": "20px" }} my='25px' >
                <Tabs id="portfolio-main-tab" display='flex' className="nav nav-tabs">
                    <Tab onClick={() => setSelectedTab('quotes')}>
                        <div>Quotes</div>
                    </Tab>
                    <Tab onClick={() => setSelectedTab('payments')}>
                        <div>Payments</div>
                    </Tab>
                    <Tab onClick={() => setSelectedTab('timeline')}>
                        <div>Timeline</div>
                    </Tab>
                </Tabs>

                <SimpleGrid columns={{ base: 1 }} gap='20px' my='20px'>
                    {
                        selectedTab==='quotes' && loading===false?
                            <Grid>
                                <Text my='10px' fontSize='md' align='center' p={1} >
                                    Quotes helps you store pricing quotes you get from people about your repairs
                                </Text>
                                <RepairQuotesTable columnsData={RepairQuotesTableColumns} tableData={repairQuotes??[]} />
                            </Grid>
                        :''
                    }
                    {
                        selectedTab==='payments' && loading===false?
                            <Grid>
                                <Text my='10px' fontSize='md' align='center' p={1} >
                                    View and manage your repair payments
                                </Text>
                                <PaymentsTable columnsData={RepairPaymentsTableColumns} tableData={repairPayments??[]} />
                            </Grid>
                        :''
                    }
                    {
                        selectedTab==='timeline' && loading===false?
                            <Grid>
                                <Flex direction='column' align='center' p={1} my={3}>
                                    <Text fontSize='md' fontSize="md" align='center' >
                                        Timeline helps you add comments and updates about your repair
                                    </Text>
                                    <Button variant="brand" size='md' mt={2} onClick={handleTimelineAddBtn} >
                                        <Icon as={MdOutlineAdd} mr={1} />
                                        Add Comment
                                    </Button>
                                </Flex>
                                {repairTimeline.map(timeline => (<RepairTimelineCard timelineData={timeline} onEditClick={handleTimelineEditBtn} showEditBtn={true} />))}
                            </Grid>
                        :''
                    }
                </SimpleGrid>
            </Card>
            <RepairTimelineEditModal isOpen={isOpen} timelineData={timelineDataToEdit} onSave={handleTimelineModalSaveBtn} onClose={onClose} onDelete={handleTimelineModalDeleteBtn} mode={timelineEditModalMode} />
        </Box>
    );
}
