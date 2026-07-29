"use client"

import { post } from "@/core/httpClient";
import { useRouter } from "next/navigation";
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useForm } from "react-hook-form";

export default function LoginPage() {

    const router = useRouter();

    const {
                register,
                handleSubmit,
                formState: {errors}
            }    = useForm({
                mode: "onSubmit"
            });
            
        return (
            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <Col md={6}>
                    <Form>
                    <h1>Log in</h1>
                    <Row className="mb-3">
                        <Col md={12}>
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            {...register("username", {
                            required: "Username is required!",
                            maxLength: 50,
                            minLength: 3,
                            })}
                        />
                        {typeof errors.username?.message === "string" && (
                            <span className="text-danger">{errors.username.message}</span>
                        )}
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={12}>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            {...register("password", {
                            required: "Password is required!",
                            })}
                        />
                        {typeof errors.password?.message === "string" && (
                            <span className="text-danger">{errors.password.message}</span>
                        )}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                        <Button
                            className="btn btn-primary w-100"
                            type="button"
                            onClick={() => {
                            handleSubmit(async (data : any) => {
                                try {
                                    const response = await post("/auth/login", data);

                                    const { token, expiresIn } = response.data;
                                
                                    localStorage.setItem("token", token);
                                    
                                    router.push("/");
                                } catch (error) {
                                    alert("Failed");
                                }
                            })();
                            }
                        }
                        >
                            Submit
                        </Button>
                        </Col>
                    </Row>
                    </Form>
                </Col>
            </Container>
                
        );
}