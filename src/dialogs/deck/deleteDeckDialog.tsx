import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, ModalTitle} from "react-bootstrap";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {put} from "@/core/httpClient";
import DeckModel from "@/models/deckModel";
import DialogProps from "../dialogProps";



export const DeleteDeckDialog = ({isOpen}: DialogProps) => {
    const {state, dispatch} = useListActions();
    const deck = state.row as DeckModel;

    const toggle = () => dispatch({
        type: listAction.RESET
    });

    const {
        handleSubmit,
        setValue
    }    = useForm<DeckModel>({
        mode: "onSubmit",
        defaultValues: state.row,
    });

    useEffect(() => {
        setValue("id", deck.id)
        setValue("name", deck.name)
        
    }, [state]);

    return (
        <Modal show={isOpen} onHide={toggle}>
            <ModalHeader closeButton>
                <ModalTitle>Delete deck</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <span>Are you sure you want to delete "{deck.name}"</span>
            </ModalBody>
            <ModalFooter>
                <Button className="btn btn-success" type="button" onClick={() => {
                    handleSubmit(async (data) => {
                        await put("/deck/delete", data);

                        dispatch({
                            type: listAction.RELOAD,
                            payload: true
                        });
                    })();
                }}>
                    Confirm
                </Button>
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default DeleteDeckDialog;