"use client";

import useListData from '@/hooks/useListData';
import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { SearchBar } from '@/components/searchBar/page';
import { Pagination } from '@/components/pagination/page';
import { Loading } from '@/components/loading/page';
import printCards from '@/utils/printCards';
import CardPageModel from '@/models/cardPageModel';

export default function Home() {
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const initalData: CardPageModel = {
    cards: [],
    totalPages: 0,
    totalElements: 0,
  }

  const {getData, loading, data} = useListData<CardPageModel>(`card/get-page-list?pageNumber=${pageNumber}&searchTerm=${searchTerm}`, initalData);

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


  return (
    <>
      <div className="p-5 text-center bg-body-tertiary">
          <Container className="py-5">
              <h1 className="text-body-emphasis">Yu-Gi-Oh! Deck Builder</h1>
              <span className="col-lg-8 mx-auto lead">
                    Dive into the full Yu-Gi-Oh! card library and discover new combos, archetypes, and strategies!
              </span>
              <SearchBar handleSubmit={handleSubmit}/>
          </Container>
      </div>
      <Pagination data={data} handlePageChange={handlePageChange} pageNumber={pageNumber}/>
      <Container>
        {loading ? (
          <Loading/>
        ):(
          <Row>
            {data.cards.map((card) => printCards(card,'right',134,196))}
          </Row>
        )}
      </Container>
    </>
  );
}