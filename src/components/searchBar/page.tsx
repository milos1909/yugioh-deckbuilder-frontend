"use client"

import { Button, Form } from "react-bootstrap";

interface SearchBarProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const SearchBar = ( {handleSubmit} : SearchBarProps) => {
    return (
        <Form onSubmit={ handleSubmit }role="search" className='d-flex justify-content-center mt-4'>
            <input type="search" name='search' className="form-control w-25 me-2" placeholder="Search..." aria-label="Search" />
            <Button type="submit">Search</Button>
        </Form>
    );
}