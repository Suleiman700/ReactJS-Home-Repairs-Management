import React, {useEffect, useState} from 'react';
import {
    Button,
    Icon,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import {MdOutlineAdd, MdOutlineCancel, MdOutlineDeleteForever, MdOutlineSave} from 'react-icons/md';
import { CUSTOM_ROUTES } from '../../../../../settings/CUSTOM_ROUTES.js';

/*
    props:
    mode: edit|add (string)
 */
const RepairTimelineEditModal = (props) => {
    const {isOpen, timelineData, onSave, onDelete, onClose, mode } = props
    const [timelineComment, setTimelineComment] = useState(timelineData.comment??'');
    const [saveBtnDisabled, setSaveBtnDisabled] = useState(true)

    // Modal comment onChange event
    const handleTimelineCommentChange = event => {
        setTimelineComment(event.target.value); // Update the updatedTimelineComment state with the textarea value
        setSaveBtnDisabled(false)
    }

    const handleDeleteBtn = () => {
        onDelete(timelineData.id)
    }

    const handleCloseBtn = () => {
        onClose()
    }

    const handleSaveBtn = () => {
        const modifiedTimelineData = {
            ...timelineData,
            comment: timelineComment // Store new comment
        }

        onSave(modifiedTimelineData)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader align='center' >
                    Edit Timeline
                    <br />
                    {timelineData.created_at}
                </ModalHeader>
                <ModalBody>
                    <Textarea
                        dir='auto'
                        rows='10'
                        onChange={handleTimelineCommentChange}>
                        {timelineData.comment}
                    </Textarea>
                </ModalBody>
                <ModalFooter justifyContent='center' >
                    {mode==='edit'?
                        <Button colorScheme='red' mr={3} onClick={handleDeleteBtn}>
                            <Icon as={MdOutlineDeleteForever} mr={1} />
                            Delete
                        </Button>:''
                    }
                    <Button colorScheme='orange' mr={3} onClick={handleCloseBtn}>
                        <Icon as={MdOutlineCancel} mr={1} />
                        Cancel
                    </Button>
                    <Button colorScheme="blue" mr={3} onClick={handleSaveBtn} disabled={saveBtnDisabled} >
                        <Icon as={MdOutlineSave} mr={1} />
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default RepairTimelineEditModal;
