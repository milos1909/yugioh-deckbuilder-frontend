"use client"

import { Spinner } from "react-bootstrap";

export const Loading = () => {
    return (
        <div className="d-flex justify-content-center align-items-center mt-5" >
            <Spinner animation="border" role="status"/>
        </div>
    );
}