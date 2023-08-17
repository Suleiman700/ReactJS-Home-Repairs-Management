import React from 'react';
import { Button, Icon } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { MdOutlineList } from 'react-icons/md';

const PeopleListButton = ({ text="People List" }) => {
    const history = useHistory();

    const handleButtonClick = () => {
        history.push(`/admin/persons-list`);
    };

    return (
        <Button variant='brand' fontWeight='500' onClick={handleButtonClick}>
            <Icon as={MdOutlineList} color='white' w='24px' h='24px' />
            {text}
        </Button>
    );
};

export default PeopleListButton;
