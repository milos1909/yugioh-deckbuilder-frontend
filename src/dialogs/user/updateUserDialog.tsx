import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, ModalTitle} from "react-bootstrap";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {put} from "@/core/httpClient";
import UserModel from "@/models/userModel";
import DialogProps from "../dialogProps";

export const UpdateUserDialog = ({isOpen}: DialogProps) => {
    const {state, dispatch} = useListActions();
    const user = state.row as UserModel;

    const toggle = () => dispatch({
        type: listAction.RESET
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
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
                <ModalTitle>Update user</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col md={6}>
                        <input type="email" className="form-control" placeholder="Email" {...register("email", {
                            required: "Email is required!",
                        })}/>
                        {errors && errors.email && (
                            <span className="text-danger">{errors.email.message}</span>
                        )}
                    </Col>

                    <Col md={6}>
                        <input type="text" className="form-control" placeholder="Username" {...register("username", {
                            required: "Username is required!",
                            maxLength: 50,
                            minLength: 3,
                        })} />
                        {errors && errors.username && (
                            <span className="text-danger">{errors.username.message}</span>
                        )}
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button className="btn btn-success" type="button" onClick={() => {
                    handleSubmit(async (data) => {
                        await put("/user/update", data);

                        dispatch({
                            type: listAction.RELOAD,
                            payload: true
                        });
                    })();
                }}>
                    Submit
                </Button>
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default UpdateUserDialog;