// Chakra imports
import { Box, Grid, useColorModeValue, Text, Icon, Flex, Button } from "@chakra-ui/react";

// Custom components
import Swal from 'sweetalert2';
import PaymentAmountField from '../components/fields/PaymentAmountField.js';
import PaymentNameField from '../components/fields/PaymentNameField.js';
import PaymentDescriptionField from '../components/fields/PaymentDescriptionField.js';
import PaymentNoteField from '../components/fields/PaymentNoteField.js';
import PaymentMethodField from '../components/fields/PaymentMethodField.js';
import PaymentStatusField from '../components/fields/PaymentStatusField.js';
import PaymentPersonField from '../components/fields/PaymentPersonField.js';
import PaymentRepairField from '../components/fields/PaymentRepairField.js';

// Assets
import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from 'react-router-dom';
import Card from '../../../../components/card/Card.js';
import Loader from '../../../../helpers/Loader.js';
import ErrorsPopup from '../../../../helpers/ErrorsPopup.js';
import {MdOutlineSave, MdOutlineDeleteForever, MdOutlineCancel, MdOutlineList, MdOutlineInfo} from 'react-icons/md';
import { CUSTOM_ROUTES } from '../../../../settings/CUSTOM_ROUTES.js';
import Payments from '../../../../classes/Payments.js';
import Persons from '../../../../classes/Persons.js';
import Repairs from '../../../../classes/Repairs.js';
import {PAYMENT_METHODS, PAYMENT_STATUSES} from '../../../../settings/PAYMENT_CONSTS.js';

export default function PaymentAction() {
    const history = useHistory();
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const [personValue, setPersonValue] = useState('');
    const [repairValue, setRepairValue] = useState('');
    const [amountValue, setAmountValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [noteValue, setNoteValue] = useState('');
    const [methodValue, setMethodValue] = useState('');
    const [statusValue, setStatusValue] = useState('');
    const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);

    const [payment, setPayment] = useState([]);
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
        amount: {
            isDisabled: false,
            isRequired: true,
        },
        name: {
            isDisabled: false,
            isRequired: true,
        },
        description: {
            isDisabled: false,
            isRequired: false,
        },
        note: {
            isDisabled: false,
            isRequired: false,
        },
        method: {
            isDisabled: false,
            isRequired: true,
        },
        status: {
            isDisabled: false,
            isRequired: true,
        },
    }

    // Get query string
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const paymentId = searchParams.get('paymentId');
    const repairId = searchParams.get('repairId');
    const mode = searchParams.get('mode');
    const classIns = Payments


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
        if (fieldsSettings.amount.isRequired) {
            if (!amountValue.trim().length) {
                errors.push('Amount is required')
            }
        }
        if (fieldsSettings.name.isRequired) {
            if (!nameValue.trim().length) {
                errors.push('Name is required')
            }
        }
        if (fieldsSettings.description.isRequired) {
            if (!descriptionValue.trim().length) {
                errors.push('Description is required')
            }
        }
        if (fieldsSettings.method.isRequired) {
            if (!methodValue.toString().length) {
                errors.push('You must select payment method')
            }
        }
        if (fieldsSettings.status.isRequired) {
            if (!statusValue.toString().length) {
                errors.push('You must select status')
            }
        }
        if (fieldsSettings.note.isRequired) {
            if (!noteValue.trim().length) {
                errors.push('Note is required')
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

                    const response = await classIns.getRecordAndRelatedData(paymentId);
                    if (!response.state) {
                        history.push(CUSTOM_ROUTES.PAYMENTS.LIST);
                        return
                    }

                    setPayment(response.data.payment)
                    setRepairs(response.data.repairs)
                    setPersons(response.data.persons)

                    // Assuming the data fetched is an object with name, job, address, and phone properties
                    setPersonValue(response.data.payment.personID);
                    setRepairValue(response.data.payment.repairID);
                    setAmountValue(response.data.payment.amount);
                    setNameValue(response.data.payment.name);
                    setDescriptionValue(response.data.payment.description);
                    setNoteValue(response.data.payment.note);
                    setMethodValue(response.data.payment.method);
                    setStatusValue(response.data.payment.status);

                    Loader.closeLoader(); // Hide the loading after data is fetched
                } catch (error) {
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

            // Set default method
            setMethodValue(PAYMENT_METHODS[0].key)
            // Set default status
            setStatusValue(PAYMENT_STATUSES[0].key)

            Loader.closeLoader(); // Hide the loading after data is fetched
        }

    }, [mode]);

    const handleRepairChange = (_value) => {
        setRepairValue(_value);
    };
    const handlePersonChange = (_value) => {
        setPersonValue(_value);
    };
    const handleAmountChange = (_value) => {
        setAmountValue(_value);
    };
    const handleNameChange = (_value) => {
        setNameValue(_value);
    };
    const handleDescriptionChange = (_value) => {
        setDescriptionValue(_value);
    };
    const handleNoteChange = (_value) => {
        setNoteValue(_value);
    };
    const handleMethodChange = (_value) => {
        setMethodValue(_value);
    };
    const handleStatusChange = (_value) => {
        setStatusValue(_value);
    };
    const clearFields = () => {
        setRepairValue('')
        setPersonValue('')
        setAmountValue('')
        setNameValue('')
        setDescriptionValue('')
        setMethodValue('')
        setStatusValue('')
        setNoteValue('')
    }

    const handleSaveButton = async () => {
        if (validateFields() === true) {
            const data = {
                repairID: repairValue,
                personID: personValue,
                amount: amountValue,
                name: nameValue,
                description: descriptionValue,
                method: methodValue,
                status: statusValue,
                note: noteValue,
            }

            Loader.showLoader()

            if (mode === 'edit') {
                const response = await classIns.updateRecordData(paymentId, data)
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
        history.push(CUSTOM_ROUTES.REPAIRS.LIST);
    }

    const handleDeleteButton = async () => {
        Swal.fire({
            icon: "question",
            title: "Delete Payment?",
            text: "You will not be able to recover this data!",
            confirmButtonText: 'Yes, Delete!',
            showDenyButton: true,
            denyButtonText: 'No, Dont!',
            dangerMode: true,
        }).then(async function (action) {
            if (action.isConfirmed) {
                const response = await classIns.deleteRecord(paymentId)
                if (response.state) {
                    // clear fields
                    clearFields()

                    Swal.fire({
                        icon: 'success',
                        title: 'Yay',
                        text: 'Data deleted successfully',
                    }).then(() => {
                        history.push(CUSTOM_ROUTES.PAYMENTS.LIST);
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
                        {mode === 'add'? 'Add Payment':'Edit Payment'}
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
                    {repairId?
                        <Button variant='brand' fontWeight='500' onClick={() => history.push(`${CUSTOM_ROUTES.REPAIRS.DATA}?recordId=${repairId}`)} >
                            <Icon as={MdOutlineInfo} color='white' w='24px' h='24px' mx={1} />
                            View Repair Data
                        </Button>:''
                    }
                    <Button variant='brand' fontWeight='500' mx={2} onClick={() => history.push(CUSTOM_ROUTES.PAYMENTS.LIST)} >
                        <Icon as={MdOutlineList} color='white' w='24px' h='24px' mx={1} />
                        Payments List
                    </Button>
                </Flex>
            </Card>
            <Card mb={{ base: "0px", "2xl": "20px" }} >
                <PaymentRepairField value={repairValue} onChange={handleRepairChange} isRequired={fieldsSettings.repair.isRequired} repairs={repairs} />
                <PaymentPersonField value={personValue} onChange={handlePersonChange} isRequired={fieldsSettings.person.isRequired} persons={persons} />
                <PaymentAmountField value={amountValue} onChange={handleAmountChange} isRequired={fieldsSettings.amount.isRequired} />
                <PaymentNameField value={nameValue} onChange={handleNameChange} isRequired={fieldsSettings.name.isRequired} />
                <PaymentDescriptionField value={descriptionValue} onChange={handleDescriptionChange} isRequired={fieldsSettings.description.isRequired} />
                <PaymentMethodField value={methodValue} onChange={handleMethodChange} isRequired={fieldsSettings.method.isRequired} />
                <PaymentStatusField value={statusValue} onChange={handleStatusChange} isRequired={fieldsSettings.method.isRequired} />
                <PaymentNoteField value={noteValue} onChange={handleNoteChange} isRequired={fieldsSettings.description.isRequired} />
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
