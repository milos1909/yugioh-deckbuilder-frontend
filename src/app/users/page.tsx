'use client';
import Link from "next/link";
import useListData from "@/hooks/useListData";

import {useEffect, useState} from "react";
import {Button, Container, OverlayTrigger, Row, Spinner, Tooltip} from "react-bootstrap";
import DataTable from "react-data-table-component";
import UserModel from "@/models/userModel";

import {CiEdit, CiTrash} from "react-icons/ci";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import AllUserDialogs from "@/dialogs/allUserDialogs";
import UserPageModel from "@/models/userPageModel";

const optionTooltip = (text: string) => {
    return(
        <Tooltip>
            {text}
        </Tooltip>
    )
};

export const tableColumns = [
    {
        name: 'Email',
        selector: (row : UserModel) => `${row.email}`,
        sortable: false
    },
    {
        name: 'Username',
        selector: (row : UserModel) => `${row.username}`,
        sortable: false
    },
    {
        name: 'Options',
        selector: (row : UserModel) => ` `,
        cell: (row : UserModel) => {
            const {dispatch} = useListActions();

            return (
                <>
                    <OverlayTrigger placement='top' overlay={optionTooltip("Edit")}>
                        <Button className="btn btn-dark" variant="outline-light" onClick={() => {
                            dispatch({
                                type: listAction.UPDATE,
                                payload: row
                            })
                        }}>
                        <CiEdit />
                    </Button>
                    </OverlayTrigger>
                    
                    <OverlayTrigger placement='top' overlay={optionTooltip("Delete")}>
                        <Button className="btn btn-dark" variant="outline-light" onClick={() => {
                            dispatch({
                                type: listAction.DELETE,
                                payload: row
                            })
                        }}>
                            <CiTrash />
                        </Button>
                    </OverlayTrigger>
                        
                </>
            );
        },
        sortable: false
    }
]

export default function UserList() {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10); 
    const {state,dispatch} = useListActions();

    const initalData: UserPageModel = {
        users: [],
        totalPages: 0,
        totalElements: 0
    }

    const {getData, loading, data} = useListData(`user/get-page-list?pageNumber=${pageNumber-1}&pageSize=${pageSize}`, initalData);

    useEffect(() => {
        getData(`user/get-page-list?pageNumber=${pageNumber-1}&pageSize=${pageSize}`);
    }, [pageSize, pageNumber]);

    useEffect(() => {
        getData(`user/get-page-list?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`);
        dispatch({ type: listAction.RESET });
    }, [state.reload]);

    const handlePageChange = async (page : any) => {
        setPageNumber(page);
    };

    const handlePerRowsChange = async (newPerPage : any, page : any) => {
        setPageNumber(page);
        setPageSize(newPerPage);
    };

    return(
        <Container className="mt-5 mb-5">
            <h1 className="mb-5">Users</h1>
            {data != null && <DataTable data={data.users}
                       columns={tableColumns}
                       noHeader={true}
                       pagination
                       paginationServer
                       progressPending={loading}
                       paginationTotalRows={data.totalElements}
                       onChangePage={handlePageChange}
                       onChangeRowsPerPage={handlePerRowsChange}
                       progressComponent={  
                                            <div className="d-flex justify-content-center align-items-center mt-5" >
                                                <Spinner animation="border" role="status"/>
                                            </div>
                                        }
                       highlightOnHover
            />}
            <AllUserDialogs />
        </Container>
    );
}