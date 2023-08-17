import React from 'react';
import { Button, Icon } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { MdOutlineAdd } from 'react-icons/md';

const AddNewPersonButton = ({ text="Add New Person" }) => {
    const history = useHistory();

    const handleButtonClick = () => {
        history.push(`/admin/people-add?mode=add`);
    };

    return (
        <Button variant='brand' fontWeight='500' onClick={handleButtonClick}>
            <Icon as={MdOutlineAdd} color='white' w='24px' h='24px' />
            {text}
        </Button>
    );
};

export default AddNewPersonButton;
