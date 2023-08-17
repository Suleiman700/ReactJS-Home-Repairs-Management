import React from 'react';
import {Box, Button, Flex, Icon, Text} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { MdOutlineList, MdOutlineEdit } from 'react-icons/md';
import { CUSTOM_ROUTES } from '../../../../../settings/CUSTOM_ROUTES.js';
import Card from '../../../../../components/card/Card.js';

const RepairTimelineCard = (props) => {
    const history = useHistory();

    const handleButtonClick = () => {
        history.push(CUSTOM_ROUTES.REPAIRS.LIST);
    };

    return (
        <Card borderWidth="1px" borderRadius="md" p={0} key={props.timelineData.id}>
            <Flex justify="space-between" align="center" bg='brand.400' p={2}>
                <Text color="white" fontWeight="700" fontSize="md">
                    {props.timelineData.created_at}
                </Text>
                {props.showEditBtn?
                    <Button variant="brand" size="sm" colorScheme="green" onClick={() => props.onEditClick(props.timelineData)}>
                        <Icon as={MdOutlineEdit} mr={1} />
                        Edit
                    </Button>:''
                }
            </Flex>
            <Box p={3}>
                <Text dir='auto' whiteSpace='pre-line' >
                    {props.timelineData.comment}
                </Text>
            </Box>
        </Card>
    );
};

export default RepairTimelineCard;
