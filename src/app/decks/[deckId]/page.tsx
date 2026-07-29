'use client';

import { Loading } from "@/components/loading/page";
import { Pagination } from "@/components/pagination/page";
import { SearchBar } from "@/components/searchBar/page";
import { put } from "@/core/httpClient";
import useListData from "@/hooks/useListData";
import CardModel from "@/models/cardModel";
import CardPageModel from "@/models/cardPageModel";
import DeckModel from "@/models/deckModel";
import { getIdFromToken } from "@/utils/jwtDecoder";
import printCards from "@/utils/printCards";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function EditDeck(){
    const params = useParams();
    const deckId = params.deckId;
    
    const [pageNumber, setPageNumber] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const initialDeck: DeckModel = {
        id: 0,
        name: "",
        userId: 0,
        main: [],
        extra: []
    }

    const loggedUserId = getIdFromToken();

    const {getData: getDeck, loading: loadingDeck, data: deckData} = useListData<DeckModel>(`deck/get-by-id?deckId=${deckId}`, initialDeck);

    const [mainDeck, setMainDeck] = useState<CardModel[]>([]);
    const [extraDeck, setExtraDeck] = useState<CardModel[]>([])
    
    useEffect(() => {
        getDeck(`deck/get-by-id?deckId=${deckId}`);
    }, [deckId]);

    useEffect(() => {
        setMainDeck(deckData.main);
        setExtraDeck(deckData.extra);
    }, [deckData]);

    const initialCatalogue: CardPageModel = {
        cards: [],
        totalPages: 0,
        totalElements: 0,
      }

    const {getData, loading, data} = useListData<CardPageModel>(`card/get-page-list?pageNumber=${pageNumber}&searchTerm=${searchTerm}`, initialCatalogue);

    useEffect(() => {
        getData(`card/get-page-list?pageNumber=${pageNumber}&searchTerm=${searchTerm}`);
    }, [pageNumber , searchTerm]);

    const handlePageChange = (selectedItem: { selected: number }) => {
        setPageNumber(selectedItem.selected) ; 
    };

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setSearchTerm(formData.get("search") as string);
        setPageNumber(0);
    }

    const addToDeck = async (card: CardModel) => {
        const isExtra = isExtraDeckType(card.type);
        const deck = isExtra ? extraDeck : mainDeck;

        const count = deck.filter(c => c.id === card.id).length;

        if (count >= 3) {
            return;
        }

        await put("deck/add-card", { deckId: deckData.id, cardId: card.id })

        if (isExtra) {
            setExtraDeck(prev => [...prev, card]);
            
        } else {
            setMainDeck(prev => [...prev, card]);
        }
    };

    const removeFromDeck = async (indexToRemove: number, card: CardModel) => {
        await put("deck/remove-card", { deckId: deckData.id, cardId: card.id })
        if (isExtraDeckType(card.type)) {
            setExtraDeck(prev => {
                const copy = [...prev];
                copy.splice(indexToRemove, 1);
                return copy;
            });
        } else {
            setMainDeck(prev => {
                const copy = [...prev];
                copy.splice(indexToRemove, 1);
                return copy;
            });
        }
    };

    const isExtraDeckType = (type?: string): boolean => {
        return type != null && (
            type.includes("Fusion Monster") ||
            type.includes("Fusion Pendulum Effect Monster") ||
            type.includes("Synchro Monster") ||
            type.includes("Synchro Pendulum Effect Monster") ||
            type.includes("XYZ Monster") ||
            type.includes("XYZ Pendulum Effect Monster") ||
            type.includes("Link Monster")
        );
    };

    useEffect(() => {
        if (!loadingDeck && deckData.userId !== 0 && deckData.userId !== loggedUserId) {
            window.location.href = "/";
        }
    }, [loadingDeck, deckData, loggedUserId]);

    return (
        <Container fluid className="py-1 h-100">
            <Row className="h-100">
                <Col lg={6} className="h-100">
                    {loadingDeck ? (
                        <Loading/>
                    ):(
                        <>
                            <h2>{deckData.name}</h2>
                            <h5>Main Deck - {mainDeck.length}</h5>
                            <Row className="g-0">
                                {mainDeck.map((card, index) => printCards(card,'right', 87, 127, () => removeFromDeck(index, card), `${card.id}-${index}` ))}
                            </Row>
                            <h5>Extra Deck - {extraDeck.length}</h5>
                            <Row className="g-0">
                                {extraDeck.map((card, index) => printCards(card,'right', 87, 127, () => removeFromDeck(index, card), `${card.id}-${index}` ))}
                            </Row>
                        </>
                    )}
                    
                </Col>
                <Col lg={6} className="d-flex flex-column justify-content-center h-100">
                    <SearchBar handleSubmit={handleSubmit}/>
                    <Container className="mt-5">
                        {loading ? (
                            <Loading/>
                        ):(
                        <Row className="mt-5">
                            {data.cards.map((card) => printCards(card,'left', 87, 127, () => addToDeck(card)))}
                        </Row>
                        )}
                    </Container>
                    <Pagination data={data} handlePageChange={handlePageChange} pageNumber={pageNumber}/>
                </Col>
            </Row>
        </Container>
    )
}