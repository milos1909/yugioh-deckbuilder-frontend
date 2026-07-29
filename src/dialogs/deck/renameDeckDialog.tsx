import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, ModalTitle} from "react-bootstrap";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {put} from "@/core/httpClient";
import DeckModel from "@/models/deckModel";
import DialogProps from "../dialogProps";

export const UpdateUserDialog = ({isOpen}: DialogProps) => {
    const {state, dispatch} = useListActions();
    const deck = state.row as DeckModel;

    const toggle = () => dispatch({
        type: listAction.RESET
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue
    }    = useForm<DeckModel>({
        mode: "onSubmit",
        defaultValues: state.row,
    });

    useEffect(() => {
        
        setValue("id", deck.id)
        setValue("name", deck.name);
               
    }, [state]);

    return (
        <Modal show={isOpen} onHide={toggle}>
            <ModalHeader closeButton>
                <ModalTitle>Rename</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col md={6}>
                        <input type="test" className="form-control" placeholder="Name" {...register("name", {
                            required: "Name is required!",
                        })}/>
                        {errors && errors.name && (
                            <span className="text-danger">{errors.name.message}</span>
                        )}
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button className="btn btn-success" type="button" onClick={() => {
                    handleSubmit(async (data) => {
                        await put("/deck/update", data);

                        dispatch({
                            type: listAction.RELOAD,
                            payload: true
                        });
                    })();
                }}>
                    Rename
                </Button>
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default UpdateUserDialog;