import React from 'react';
import { Button, Icon } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { MdOutlineAdd } from 'react-icons/md';
import { CUSTOM_ROUTES } from '../../../../../settings/CUSTOM_ROUTES.js';

const AddNewWorklogButton = ({ text="Add New Worklog" }) => {
    const history = useHistory();

    const handleButtonClick = () => {
        history.push(`${CUSTOM_ROUTES.WORKLOG.ACTION}?mode=add`);
    };

    return (
        <Button variant='brand' fontWeight='500' onClick={handleButtonClick}>
            <Icon as={MdOutlineAdd} color='white' w='24px' h='24px' />
            {text}
        </Button>
    );
};

export default AddNewWorklogButton;
