import React from 'react';
import { Button, Icon } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { MdOutlineList } from 'react-icons/md';
import { CUSTOM_ROUTES } from '../../../../../settings/CUSTOM_ROUTES.js';

const RepairsQuotesListButton = ({ text="Repairs Quotes List" }) => {
    const history = useHistory();

    const handleButtonClick = () => {
        history.push(CUSTOM_ROUTES.REPAIRS_QUOTES.LIST);
    };

    return (
        <Button variant='brand' fontWeight='500' onClick={handleButtonClick}>
            <Icon as={MdOutlineList} color='white' w='24px' h='24px' />
            {text}
        </Button>
    );
};

export default RepairsQuotesListButton;
