'use client';

import useListData from "@/hooks/useListData";
import {useEffect, useState} from "react";
import {Button, Container, OverlayTrigger, Row, Spinner, Tooltip} from "react-bootstrap";
import DataTable from "react-data-table-component";
import { FaPlus } from "react-icons/fa6";
import {CiEdit, CiTrash} from "react-icons/ci";
import {TbCards} from "react-icons/tb";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import DeckModel from "@/models/deckModel";
import AllDeckDialogs from "@/dialogs/allDeckDialogs";
import { post } from "@/core/httpClient";
import { useRouter } from "next/navigation";
import DeckPageModel from "@/models/deckPageModel";
import { getIdFromToken } from "@/utils/jwtDecoder";

const optionTooltip = (text: string) => {
    return(
        <Tooltip>
            {text}
        </Tooltip>
    )
};

export const tableColumns = [
    {
        name: 'Deck name',
        selector: (row : DeckModel) => `${row.name}`,
        sortable: false
    },
    {
        name: 'Options',
        selector: (row : DeckModel) => ` `,
        cell: (row : DeckModel) => {
            const {dispatch} = useListActions();
            const router = useRouter();
        
            return (
                <>  
                    <OverlayTrigger placement='top' overlay={optionTooltip("Edit")}>
                        <Button className="btn btn-dark" variant="outline-light" onClick={() => {
                            router.push(`/decks/${row.id}`)
                        }}>
                            <TbCards />
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement='top' overlay={optionTooltip("Rename")}>
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

export default function DeckList() {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10); 
    const {state,dispatch} = useListActions();

    const initalData: DeckPageModel = {
        decks: [],
        totalPages: 0,
        totalElements: 0
    }

    const {getData, loading, data} = useListData<DeckPageModel>(`deck/get-page-list?pageNumber=${pageNumber-1}&pageSize=${pageSize}&userId=${getIdFromToken()}`, initalData);

    useEffect(() => {
        getData(`deck/get-page-list?pageNumber=${pageNumber-1}&pageSize=${pageSize}&userId=${getIdFromToken()}`);
    }, [pageSize, pageNumber]);

    useEffect(() => {
        getData(`deck/get-page-list?pageNumber=${pageNumber-1}&pageSize=${pageSize}&userId=${getIdFromToken()}`);
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
            <h1 className="mb-5">My decks</h1>
            <OverlayTrigger placement='top' overlay={optionTooltip("New deck")}>
                <Button className="btn btn-dark" variant="outline-light" onClick={async () => {
                    await post("/deck/create", { userId: getIdFromToken() });

                    dispatch({
                        type: listAction.RELOAD,
                        payload: true
                    });
                }}>
                    <FaPlus />
                </Button>
            </OverlayTrigger>
            {data != null && <DataTable data={data.decks}
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
            <AllDeckDialogs />
        </Container>
    );
}