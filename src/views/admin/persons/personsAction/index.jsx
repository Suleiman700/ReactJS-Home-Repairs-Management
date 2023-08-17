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
import PeopleNameField from '../components/fields/PeopleNameField.js';
import PeopleJobField from '../components/fields/PeopleJobField.js';
import PeopleAddressField from '../components/fields/PeopleAddressField.js';
import PeoplePhoneField from '../components/fields/PeoplePhoneField.js';
import People from '../../../../classes/Persons.js';

// Assets
import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from 'react-router-dom';
import Card from '../../../../components/card/Card.js';
import Loader from '../../../../helpers/Loader.js';
import ErrorsPopup from '../../../../helpers/ErrorsPopup.js';
import { PhoneValidator } from '../../../../helpers/Validators.js';
import PeopleListButton from '../components/buttons/PeopleListButton.js';
import { MdOutlineSave, MdOutlineDeleteForever, MdOutlineCancel } from 'react-icons/md';

export default function PersonsAction() {
    const history = useHistory();

    const [nameValue, setNameValue] = useState('');
    const [jobValue, setJobValue] = useState('');
    const [addressValue, setAddressValue] = useState('');
    const [phoneValue, setPhoneValue] = useState('');
    const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);

    const fieldsSettings = {
        name: {
            isRequired: true,
        },
        job: {
            isRequired: true,
        },
        address: {
            isRequired: true,
        },
        phone: {
            isRequired: true,
        },
    }

    // Get query string
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const mode = searchParams.get('mode');

    const textColor = useColorModeValue("secondaryGray.900", "white");

    const validateFields = () => {
        const errors = []

        // Validate fields
        if (fieldsSettings.name.isRequired) {
            // if (!nameValue.trim().length) {
            //     errors.push('Name cannot be empty')
            // }
        }
        if (fieldsSettings.job.isRequired) {
            if (!jobValue.trim().length) {
                errors.push('Job cannot be empty')
            }
        }
        if (fieldsSettings.address.isRequired) {
            if (!addressValue.trim().length) {
                errors.push('Address cannot be empty')
            }
        }
        if (fieldsSettings.phone.isRequired) {
            const isValidPhone = PhoneValidator(phoneValue)
            if (!isValidPhone.valid) {
                errors.push(isValidPhone.errors[0].message)
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

                    const response = await People.getRecordData(id);
                    if (!response.state) {
                        history.push(`/admin/persons-list`);
                        return
                    }

                    // Assuming the data fetched is an object with name, job, address, and phone properties
                    setNameValue(response.data.name);
                    setJobValue(response.data.job);
                    setAddressValue(response.data.address);
                    setPhoneValue(response.data.phone);

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

    const handleNameChange = (_value) => {
        setNameValue(_value);
    };
    const handleJobChange = (_value) => {
        setJobValue(_value);
    };
    const handleAddressChange = (_value) => {
        setAddressValue(_value);
    };
    const handlePhoneChange = (_value) => {
        setPhoneValue(_value);
    };


    const handleSaveButton = async () => {
        if (validateFields() === true) {
            const data = {
                name: nameValue,
                job: jobValue,
                address: addressValue,
                phone: phoneValue,
            }

            if (mode === 'edit') {
                const response = await People.updateRecordData(id, data)
                if (response.state) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Yay',
                        text: 'Data updated successfully',
                    })
                }
            }
            else if (mode === 'add') {
                const response = await People.addNewRecord(data)
                if (response.state) {
                    // clear fields
                    setNameValue('')
                    setJobValue('')
                    setAddressValue('')
                    setPhoneValue('')

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
        history.push(`/admin/persons-list`);
    }

    const handleDeleteButton = async () => {
        Swal.fire({
            icon: "question",
            title: "Delete Person?",
            text: "You will not be able to recover this data!",
            confirmButtonText: 'Yes, Delete!',
            showDenyButton: true,
            denyButtonText: 'No, Dont!',
            dangerMode: true,
        }).then(async function (action) {
            if (action.isConfirmed) {
                const response = await People.deleteRecord(id)
                if (response.state) {
                    // clear fields
                    setNameValue('')
                    setJobValue('')
                    setAddressValue('')
                    setPhoneValue('')

                    Swal.fire({
                        icon: 'success',
                        title: 'Yay',
                        text: 'Data deleted successfully',
                    }).then(() => {
                        history.push(`/admin/persons-list`);
                    })
                }
            }
        })
    }

    // useEffect(() => {}, [jobValue]);

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <Card mb={{ base: "2px", "2xl": "20px" }} my='25px' >
                <Grid>
                    <Text
                        color={textColor}
                        fontSize='22px'
                        fontWeight='700'
                        lineHeight='100%'>
                        {mode === 'add'? 'Add Person':'Edit Person'}
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
                    <PeopleListButton />
                </Flex>
            </Card>
            <Card mb={{ base: "0px", "2xl": "20px" }} >
                <PeopleNameField value={nameValue} onChange={handleNameChange} isRequired={fieldsSettings.name.isRequired} />
                <PeopleJobField value={jobValue} onChange={handleJobChange} isRequired={fieldsSettings.job.isRequired} />
                <PeopleAddressField value={addressValue} onChange={handleAddressChange} isRequired={fieldsSettings.address.isRequired} />
                <PeoplePhoneField value={phoneValue} onChange={handlePhoneChange} isRequired={fieldsSettings.phone.isRequired} />
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
