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
import RepairNameField from '../components/fields/RepairNameField.js';
import RepairDescriptionField from '../components/fields/RepairDescriptionField.js';
import RepairIsCompletedField from '../components/fields/RepairIsCompletedField.js';
import Repairs from '../../../../classes/Repairs.js';

// Assets
import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from 'react-router-dom';
import Card from '../../../../components/card/Card.js';
import Loader from '../../../../helpers/Loader.js';
import ErrorsPopup from '../../../../helpers/ErrorsPopup.js';
import RepairsListButton from '../components/buttons/RepairsListButton.js';
import { MdOutlineSave, MdOutlineDeleteForever, MdOutlineCancel } from 'react-icons/md';
import { CUSTOM_ROUTES } from '../../../../settings/CUSTOM_ROUTES.js';

export default function RepairsAction() {
    const history = useHistory();

    const [nameValue, setNameValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [isCompletedValue, setIsCompletedValue] = useState('0');
    const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);

    const fieldsSettings = {
        name: {
            isRequired: true,
        },
        description: {
            isRequired: false,
        },
        isCompleted: {
            isRequired: true,
        },
    }

    // Get query string
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const mode = searchParams.get('mode');
    const classIns = Repairs

    const textColor = useColorModeValue("secondaryGray.900", "white");

    const validateFields = () => {
        const errors = []

        // Validate fields
        if (fieldsSettings.name.isRequired) {
            if (!nameValue.trim().length) {
                errors.push('Name cannot be empty')
            }
        }
        if (fieldsSettings.description.isRequired) {
            if (!descriptionValue.trim().length) {
                errors.push('Description cannot be empty')
            }
        }
        if (fieldsSettings.isCompleted.isRequired) {
            if (!isCompletedValue.trim().length) {
                errors.push('Completed cannot be empty')
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

    useEffect(() => {
        if (mode === 'edit') {
            const fetchData = async () => {
                try {
                    Loader.showLoader(); // Show loading before making the request

                    const response = await classIns.getRecordData(id);
                    if (!response.state) {
                        history.push(CUSTOM_ROUTES.REPAIRS.LIST);
                        return
                    }

                    // Assuming the data fetched is an object with name, job, address, and phone properties
                    setNameValue(response.data.name);
                    setDescriptionValue(response.data.description);
                    setIsCompletedValue(response.data.isCompleted);

                    Loader.closeLoader(); // Hide the loading after data is fetched
                }
                catch (error) {
                    console.error('Error fetching data:', error);
                    // Loader.hideLoader(); // Hide the loading if an error occurs
                }
            };
            fetchData();

            setDeleteButtonVisible(true)
        }
    }, [mode]);

    const handleNameChange = (_value) => {
        setNameValue(_value);
    };
    const handleDescriptionChange = (_value) => {
        setDescriptionValue(_value);
    };
    const handleIsCompletedChange = (_value) => {
        setIsCompletedValue(_value);
    };
    const clearFields = () => {
        setNameValue('')
        setDescriptionValue('')
        setIsCompletedValue('')
    }

    const handleSaveButton = async () => {
        if (validateFields() === true) {
            const data = {
                name: nameValue,
                description: descriptionValue,
                isCompleted: isCompletedValue,
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
        history.push(CUSTOM_ROUTES.REPAIRS.LIST);
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
                        history.push(CUSTOM_ROUTES.REPAIRS.LIST);
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
                        {mode === 'add'? 'Add Repair':'Edit Repair'}
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
                    <RepairsListButton />
                </Flex>
            </Card>
            <Card mb={{ base: "0px", "2xl": "20px" }} >
                <RepairNameField value={nameValue} onChange={handleNameChange} isRequired={fieldsSettings.name.isRequired} />
                <RepairDescriptionField value={descriptionValue} onChange={handleDescriptionChange} isRequired={fieldsSettings.description.isRequired} />
                <RepairIsCompletedField value={isCompletedValue} onChange={handleIsCompletedChange} isRequired={fieldsSettings.isCompleted.isRequired} />
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
