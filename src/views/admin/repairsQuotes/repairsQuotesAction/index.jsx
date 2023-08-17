// Chakra imports
import {
    Box,
    FormControl,
    FormLabel,
    Grid,
    Input,
    useColorModeValue,
    Text,
    InputGroup,
    InputRightElement, Icon, Flex, Checkbox, Button
} from "@chakra-ui/react";

// Custom components
import Swal from 'sweetalert2';

import RepairQuotePersonIdField from '../components/fields/RepairQuotePersonIdField.js';
import RepairQuoteRepairIdField from '../components/fields/RepairQuoteRepairIdField.js';
import RepairQuoteNameField from '../components/fields/RepairQuoteNameField.js';
import RepairQuoteDescriptionField from '../components/fields/RepairQuoteDescriptionField.js';
import RepairQuotePriceField from '../components/fields/RepairQuotePriceField.js';
import RepairQuoteNoteField from '../components/fields/RepairQuoteNoteField.js';
import RepairQuoteStatusField from '../components/fields/RepairQuoteStatusField.js';
import RepairsQuotes from '../../../../classes/RepairsQuotes.js';

// Assets
import React, {useCallback, useEffect, useState} from "react";
import {useHistory, useLocation} from 'react-router-dom';
import Card from '../../../../components/card/Card.js';
import Loader from '../../../../helpers/Loader.js';
import ErrorsPopup from '../../../../helpers/ErrorsPopup.js';
import RepairsQuotesListButton from '../components/buttons/RepairsQuotesListButton.js';
import RepairDataButton from '../components/buttons/RepairDataButton.js';
import { MdOutlineSave, MdOutlineDeleteForever, MdOutlineCancel } from 'react-icons/md';
import { CUSTOM_ROUTES } from '../../../../settings/CUSTOM_ROUTES.js';
import { REPAIRS_QUOTES_STATUSES } from '../../../../settings/STATUSES.js';
import Persons from '../../../../classes/Persons.js';
import Repairs from '../../../../classes/Repairs.js';

export default function RepairsQuotesAction() {
    const history = useHistory();
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const [loading, setLoading] = useState(true);
    const [personsData, setPersonsData] = useState('');
    const [repairsData, setRepairsData] = useState('');
    const [repairIdValue, setRepairIdValue] = useState('');
    const [personIdValue, setPersonIdValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [priceValue, setPriceValue] = useState('');
    const [noteValue, setNoteValue] = useState('');
    const [statusValue, setStatusValue] = useState('');
    const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);

    const fieldsSettings = {
        repairId: {
            isRequired: true,
            isDisabled: true,
            validationErrorMessage: 'Please select repair'
        },
        personId: {
            isRequired: true,
            validationErrorMessage: 'Please select person'
        },
        name: {
            isRequired: true,
            validationErrorMessage: 'Name is required'
        },
        description: {
            isRequired: false,
            validationErrorMessage: 'Description is required'
        },
        price: {
            isRequired: true,
            validationErrorMessage: 'Price is required'
        },
        note: {
            isRequired: false,
            validationErrorMessage: 'Note is required'
        },
        status: {
            isRequired: true,
            validationErrorMessage: 'Status is required'
        },
    }

    // Get query string
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const repairId = searchParams.get('repairId');
    const mode = searchParams.get('mode');
    const classIns = RepairsQuotes
    const routes = CUSTOM_ROUTES.REPAIRS_QUOTES

    const validateFields = () => {
        const errors = []

        if (fieldsSettings.repairId.isRequired && !repairIdValue) {
            errors.push(fieldsSettings.repairId.validationErrorMessage)
        }
        if (fieldsSettings.personId.isRequired && !personIdValue) {
            errors.push(fieldsSettings.personId.validationErrorMessage)
        }
        if (fieldsSettings.price.isRequired && !priceValue) {
            errors.push(fieldsSettings.price.validationErrorMessage)
        }
        if (fieldsSettings.name.isRequired && !nameValue.trim().length) {
            errors.push(fieldsSettings.name.validationErrorMessage)
        }
        if (fieldsSettings.description.isRequired && !descriptionValue.trim().length) {
            errors.push(fieldsSettings.description.validationErrorMessage)
        }
        if (fieldsSettings.status.isRequired && !statusValue.trim().length) {
            errors.push(fieldsSettings.status.validationErrorMessage)
        }
        if (fieldsSettings.note.isRequired && !noteValue.trim().length) {
            errors.push(fieldsSettings.note.validationErrorMessage)
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
        // Get persons
        await Persons.fetchDataFromServer()
        setPersonsData(Persons.data)
        // Get repairs
        await Repairs.fetchDataFromServer()
        setRepairsData(Repairs.data)

        setLoading(false); // Data is loaded, set loading to false
        if (mode === 'edit') {
            const fetchData = async () => {
                try {
                    Loader.showLoader(); // Show loading before making the request

                    const response = await classIns.getRecordData(id);
                    if (!response.state) {
                        history.push(CUSTOM_ROUTES.REPAIRS.LIST);
                        return
                    }

                    setRepairIdValue(response.data.repairID);
                    setPersonIdValue(response.data.person_id);
                    setNameValue(response.data.name);
                    setDescriptionValue(response.data.description);
                    setPriceValue(response.data.price);
                    setNoteValue(response.data.comment);
                    setStatusValue(response.data.status);

                    Loader.closeLoader(); // Hide the loading after data is fetched
                } catch (error) {
                    console.error('Error fetching data:', error);
                    // Loader.hideLoader(); // Hide the loading if an error occurs
                }
            };
            fetchData();

            setDeleteButtonVisible(true)
        }
    }, [mode]);

    // useEffect(async () => {
    //     // This useEffect listens for changes in personsData and logs the updated value.
    //     console.log(personsData);
    // }, [personsData]); // Add personsData as a dependency

    const handleRepairIdChange = (_value) => {
        setRepairIdValue(_value)
    }
    const handlePersonIdChange = (_value) => {
        setPersonIdValue(_value)
    }
    const handleNameChange = (_value) => {
        setNameValue(_value)
    }
    const handleDescriptionChange = (_value) => {
        setDescriptionValue(_value)
    }
    const handlePriceChange = (_value) => {
        setPriceValue(_value)
    }
    const handleNoteChange = (_value) => {
        setNoteValue(_value)
    }
    const handleStatusChange = (_value) => {
        setStatusValue(_value)
    }

    const clearFields = () => {
        setRepairIdValue('')
        setPersonIdValue('')
        setNameValue('')
        setDescriptionValue('')
        setPriceValue('')
        setNoteValue('')
        setStatusValue('')
    }

    const handleSaveButton = async () => {
        if (validateFields() === true) {
            const data = {
                person_id: personIdValue,
                name: nameValue,
                description: descriptionValue,
                price: priceValue,
                comment: noteValue,
                status: statusValue,
            }

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
                const response = await classIns.addNewRecord(data)
                if (response.state) {
                    // clear fields
                    clearFields()

                    Swal.fire({
                        icon: 'success',
                        title: 'Yay',
                        text: 'Data added successfully',
                    })
                }
            }
        }
    }

    const handleCancelButton = () => {
        history.push(routes.LIST);
    }

    const handleDeleteButton = async () => {
        Swal.fire({
            icon: "question",
            title: "Delete Repair?",
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
                        history.push(routes.LIST);
                    })
                }
            }
        })
    }

    // useEffect(() => {}, [nameValue]);

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <Card mb={{ base: "2px", "2xl": "20px" }} my='25px' >
                <Grid mb={{ base: "2px", "2xl": "20px" }} my='25px' >
                    <Text
                        color={textColor}
                        fontSize='22px'
                        fontWeight='700'
                        lineHeight='100%'>
                        {mode === 'add'? 'Add Repair Quote':'Edit Repair Quote'}
                    </Text>
                    <Text
                        color={textColor}
                        fontSize='18px'
                        py='10px'
                        lineHeight='100%'>
                        Repairs Quotes helps you store pricing quotes you get from people about your repairs
                    </Text>
                </Grid>
                <Flex justifyContent='end' py='15px' >
                    <RepairDataButton repairId={repairId} />
                </Flex>
            </Card>
            <Card mb={{ base: "0px", "2xl": "20px" }} >
                {loading?'':
                    <div>
                        <RepairQuoteRepairIdField value={repairIdValue} options={repairsData} isRequired={fieldsSettings.repairId.isRequired} isDisabled={fieldsSettings.repairId.isDisabled} />
                        <RepairQuotePersonIdField value={personIdValue} options={personsData} onChange={handlePersonIdChange} isRequired={fieldsSettings.personId.isRequired}/>
                        <RepairQuotePriceField value={priceValue} onChange={handlePriceChange} isRequired={fieldsSettings.price.isRequired}/>
                        <RepairQuoteNameField value={nameValue} onChange={handleNameChange} isRequired={fieldsSettings.name.isRequired}/>
                        <RepairQuoteDescriptionField value={descriptionValue} onChange={handleDescriptionChange} isRequired={fieldsSettings.description.isRequired}/>
                        <RepairQuoteStatusField value={statusValue} options={REPAIRS_QUOTES_STATUSES} onChange={handleStatusChange} isRequired={fieldsSettings.status.isRequired}/>
                        <RepairQuoteNoteField value={noteValue} onChange={handleNoteChange} isRequired={fieldsSettings.note.isRequired}/>
                    </div>
                }
                <Grid
                    mb="20px"
                    templateColumns={{ base: "1fr", xl: "repeat(2, 1fr)" }}
                    gap={{ base: "20px", xl: "20px" }}
                    display={{ base: "block", xl: "grid" }}>
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
