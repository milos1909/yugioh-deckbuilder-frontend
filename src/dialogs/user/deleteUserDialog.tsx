import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, ModalTitle} from "react-bootstrap";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {put} from "@/core/httpClient";
import UserModel from "@/models/userModel";
import DialogProps from "../dialogProps";

export const DeleteUserDialog = ({isOpen}: DialogProps) => {
    const {state, dispatch} = useListActions();
    const user = state.row as UserModel;

    const toggle = () => dispatch({
        type: listAction.RESET
    });

    const {
        handleSubmit,
        setValue
    }    = useForm<UserModel>({
        mode: "onSubmit",
        defaultValues: state.row,
    });

    useEffect(() => {
        setValue("id" ,user.id)
        setValue("email", user.email);
        setValue("username", user.username);
    }, [state]);

    return (
        <Modal show={isOpen} onHide={toggle}>
            <ModalHeader closeButton>
                <ModalTitle>Delete user</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <span>Are you sure you want to delete user {user.username}</span>
            </ModalBody>
            <ModalFooter>
                <Button className="btn btn-success" type="button" onClick={() => {
                    handleSubmit(async (data) => {
                        await put("/user/delete", data);

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

export default DeleteUserDialog;