// Chakra imports
import {Box, Grid, useColorModeValue, Text, Icon, Flex, Button, Input, FormLabel} from "@chakra-ui/react";

// Custom components
import Swal from 'sweetalert2';

// Assets
import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from 'react-router-dom';
import Card from '../../../../components/card/Card.js';
import Loader from '../../../../helpers/Loader.js';
import ErrorsPopup from '../../../../helpers/ErrorsPopup.js';
import {MdOutlineSave, MdOutlineDeleteForever, MdOutlineCancel, MdOutlineList, MdOutlineInfo} from 'react-icons/md';
import { CUSTOM_ROUTES } from '../../../../settings/CUSTOM_ROUTES.js';
import Worklog from '../../../../classes/Worklog.js';
import WorklogPersonField from '../components/fields/WorklogPersonField.js';
import WorklogRepairField from '../components/fields/WorklogRepairField.js';
import WorklogDateField from '../components/fields/WorklogDateField.js';
import WorklogStartHourField from '../components/fields/WorklogStartHourField.js';
import WorklogEndHourField from '../components/fields/WorklogEndHourField.js';
import WorklogIsPaidField from '../components/fields/WorklogIsPaidField.js';
import WorklogCommentField from '../components/fields/WorklogCommentField.js';
import Persons from '../../../../classes/Persons.js';
import Repairs from '../../../../classes/Repairs.js';

export default function WorklogAction() {
    const history = useHistory();
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const [personValue, setPersonValue] = useState('');
    const [repairValue, setRepairValue] = useState('');
    const [dateValue, setDateValue] = useState('');
    const [startHourValue, setStartHourValue] = useState('');
    const [endHourValue, setEndHourValue] = useState('');
    const [isPaidValue, setIsPaidValue] = useState('');
    const [commentValue, setCommentValue] = useState('');
    const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);
    const [loading, setLoading] = useState(true);


    const [worklog, setWorklog] = useState([]);
    const [repairs, setRepairs] = useState([]);
    const [persons, setPersons] = useState([]);

    const fieldsSettings = {
        person: {
            isDisabled: false,
            isRequired: true,
        },
        repair: {
            isDisabled: false,
            isRequired: true,
        },
        date: {
            isDisabled: false,
            isRequired: true,
        },
        startHour: {
            isDisabled: false,
            isRequired: true,
        },
        endHour: {
            isDisabled: false,
            isRequired: true,
        },
        isPaid: {
            isDisabled: false,
            isRequired: true,
        },
        comment: {
            isDisabled: false,
            isRequired: false,
        },
    }

    // Get query string
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const mode = searchParams.get('mode');
    const classIns = Worklog


    const validateFields = () => {
        const errors = []

        // Validate fields
        if (fieldsSettings.repair.isRequired) {
            if (isNaN(repairValue) || !repairValue.toString().length) {
                errors.push('You must select repair')
            }
        }
        if (fieldsSettings.person.isRequired) {
            if (isNaN(personValue) || !personValue.toString().length) {
                errors.push('You must select person')
            }
        }
        if (fieldsSettings.date.isRequired) {
            if (!dateValue.trim().length) {
                errors.push('Date is required')
            }
        }
        if (fieldsSettings.startHour.isRequired) {
            if (!startHourValue.trim().length) {
                errors.push('Start hour is required')
            }
        }
        if (fieldsSettings.endHour.isRequired) {
            if (!endHourValue.trim().length) {
                errors.push('End hour is required')
            }
        }
        if (fieldsSettings.isPaid.isRequired) {
            if (!isPaidValue.toString().length) {
                errors.push('You must select paid option')
            }
        }
        if (fieldsSettings.comment.isRequired) {
            if (!commentValue.toString().length) {
                errors.push('Comment hour is required')
            }
        }

        if (errors.length) {
            ErrorsPopup.html = errors.map(error => `<span>${error}</span>`)
            ErrorsPopup.show()
            return false
        }
        else {
            return true
        }
    }

    useEffect(async () => {
        if (mode === 'edit') {
            const fetchData = async () => {
                try {
                    Loader.showLoader(); // Show loading before making the request

                    const response = await classIns.getRecordAndRelatedData(id);
                    if (!response.state) {
                        history.push(CUSTOM_ROUTES.PAYMENTS.LIST);
                        return
                    }

                    // sort repairs DESC (newest first)
                    response.data.repairs.sort(function(a, b) {
                        return parseFloat(b.id) - parseFloat(a.id);
                    });

                    // sort repairs by isCompleted
                    response.data.repairs.sort(function(a, b) {
                        return parseFloat(a.isCompleted) - parseFloat(b.isCompleted);
                    });

                    setRepairs(response.data.repairs)
                    setPersons(response.data.persons)
                    setPersonValue(response.data.worklog.personId);
                    setRepairValue(response.data.worklog.repairId);
                    setWorklog(response.data.worklog)
                    setDateValue(response.data.worklog.date)
                    setStartHourValue(response.data.worklog.startHour)
                    setEndHourValue(response.data.worklog.endHour)
                    setIsPaidValue(response.data.worklog.isPaid)
                    setCommentValue(response.data.worklog.comment)

                    Loader.closeLoader(); // Hide the loading after data is fetched
                    setLoading(false)
                }
                catch (error) {
                    console.error('Error fetching data:', error);
                    // Loader.hideLoader(); // Hide the loading if an error occurs
                }
            };
            fetchData();

            setDeleteButtonVisible(true)
        }
        else if (mode === 'add') {
            Loader.showLoader()

            // Get persons
            const persons = await Persons.fetchDataFromServer()
            setPersons(persons)
            setPersonValue(persons[0].id) // Set default option

            // Get repairs
            const repairs = await Repairs.fetchDataFromServer()
            if (repairs.state) {
                setRepairs(repairs.data)
                setRepairValue(repairs.data[0].id) // Set default option
            }

            Loader.closeLoader(); // Hide the loading after data is fetched
            setLoading(false)
        }

    }, [mode]);

    const handleRepairChange = (_value) => {
        setRepairValue(_value);
    };
    const handlePersonChange = (_value) => {
        setPersonValue(_value);
    };
    const handleDateChange = (_dateString) => {
        setDateValue(_dateString);
    };
    const handleStartHourChange = (_string) => {
        setStartHourValue(_string);
    };
    const handleEndHourChange = (_string) => {
        setEndHourValue(_string);
    };
    const handleIsPaidChange = (_string) => {
        setIsPaidValue(_string);
    };
    const handleCommentChange = (_string) => {
        setCommentValue(_string);
    };
    const clearFields = () => {
        setRepairValue('')
        setPersonValue('')
        setDateValue('')
        setStartHourValue('')
        setEndHourValue('')
        setIsPaidValue('')
        setCommentValue('')
    }

    const handleSaveButton = async () => {
        if (validateFields() === true) {
            const data = {
                repairId: repairValue,
                personId: personValue,
                date: dateValue,
                startHour: startHourValue,
                endHour: endHourValue,
                isPaid: isPaidValue,
                comment: commentValue,
            }

            Loader.showLoader()

            if (mode === 'edit') {
                const response = await classIns.updateRecordData(id, data)
                if (response.state) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Yay',
                        text: 'Data updated successfully',
                    })
                }
            }
            else if (mode === 'add') {
                const response = await classIns.createNewRecord(data)
                if (response && response.state) {
                    // clear fields
                    clearFields()

                    Swal.fire({
                        icon: 'success',
                        title: 'Yay',
                        text: 'Data created successfully',
                    })
                }
            }
        }
    }

    const handleCancelButton = () => {
        history.push(CUSTOM_ROUTES.WORKLOG.LIST);
    }

    const handleDeleteButton = async () => {
        Swal.fire({
            icon: "question",
            title: "Delete Worklog?",
            text: "You will not be able to recover this data!",
            confirmButtonText: 'Yes, Delete!',
            showDenyButton: true,
            denyButtonText: 'No, Dont!',
            dangerMode: true,
        }).then(async function (action) {
            if (action.isConfirmed) {
                const response = await classIns.deleteRecord(id)
                if (response.state) {
                    // clear fields
                    clearFields()

                    Swal.fire({
                        icon: 'success',
                        title: 'Yay',
                        text: 'Data deleted successfully',
                    }).then(() => {
                        history.push(CUSTOM_ROUTES.WORKLOG.LIST);
                    })
                }
            }
        })
    }

    // useEffect(() => {}, [descriptionValue]);

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <Card mb={{ base: "2px", "2xl": "20px" }} my='25px' >
                <Grid>
                    <Text
                        color={textColor}
                        fontSize='22px'
                        fontWeight='700'
                        lineHeight='100%'>
                        {mode === 'add'? 'Add Worklog':'Edit Worklog'}
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
                    <Button variant='brand' fontWeight='500' mx={2} onClick={() => history.push(CUSTOM_ROUTES.WORKLOG.LIST)} >
                        <Icon as={MdOutlineList} color='white' w='24px' h='24px' mx={1} />
                        Worklog List
                    </Button>
                </Flex>
            </Card>
            <Card mb={{ base: "0px", "2xl": "20px" }} >
                {!loading?
                    <Grid>
                        <WorklogPersonField value={personValue} onChange={handlePersonChange} isRequired={fieldsSettings.person.isRequired} persons={persons} />
                        <WorklogRepairField value={repairValue} onChange={handleRepairChange} isRequired={fieldsSettings.repair.isRequired} repairs={repairs} />
                        <Grid mb={3}>
                            <WorklogDateField value={dateValue} onChange={handleDateChange} isRequired={fieldsSettings.date.isRequired} />
                        </Grid>
                        <Grid mb={3}>
                            <WorklogStartHourField value={startHourValue} onChange={handleStartHourChange} isRequired={fieldsSettings.startHour.isRequired} />
                        </Grid>
                        <Grid mb={3}>
                            <WorklogEndHourField value={endHourValue} onChange={handleEndHourChange} isRequired={fieldsSettings.endHour.isRequired} />
                        </Grid>
                        <WorklogIsPaidField value={isPaidValue} onChange={handleIsPaidChange} isRequired={fieldsSettings.isPaid.isRequired} />
                        <WorklogCommentField value={commentValue} onChange={handleCommentChange} isRequired={fieldsSettings.comment.isRequired} />
                    </Grid>
                    :''
                }
                <Grid
                    mb="20px"
                    templateColumns={{ base: "1fr", xl: "repeat(2, 1fr)" }}
                    gap={{ base: "20px", xl: "20px" }}
                    display={{ base: "block", xl: "grid" }}
                >
                    <Button
                        fontSize="sm"
                        variant="brand"
                        fontWeight="500"
                        w="100%" // The first button takes the full available width
                        h="50"
                        mb="12px"
                        onClick={handleSaveButton}>
                        <Icon as={MdOutlineSave} color="white" w="24px" h="24px" />
                        Save
                    </Button>
                    <Button
                        fontSize="sm"
                        variant="brand"
                        fontWeight="500"
                        w="100%" // The second button takes half of the available width
                        h="50"
                        mb="12px"
                        background="orange"
                        onClick={handleCancelButton}>
                        <Icon as={MdOutlineCancel} color="white" w="24px" h="24px" />
                        Cancel
                    </Button>
                    {deleteButtonVisible?
                        <Button
                            fontSize="sm"
                            variant="brand"
                            fontWeight="500"
                            w="100%" // The third button takes half of the available width
                            h="50"
                            mb="12px"
                            background="red"
                            onClick={handleDeleteButton}>
                            <Icon as={MdOutlineDeleteForever} color="white" w="24px" h="24px" />
                            Delete
                        </Button>:''
                    }
                </Grid>
            </Card>
        </Box>
    );
}
