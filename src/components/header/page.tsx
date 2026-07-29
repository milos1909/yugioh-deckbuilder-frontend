"use client";


import {useAuthStatus} from "@/hooks/useAuthStatus";
import { isAdmin } from "@/utils/jwtDecoder";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {Container, Nav} from "react-bootstrap";

export interface HeaderItem {
    text: string;
    link: string;
}

const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; 
};

export const Header = () => {

    const authenticated = useAuthStatus();

    const menuItems: HeaderItem[] = [
        { text: "Home", link: "/" },
        ...(authenticated ? [{ text: "Decks", link: "/decks" }] : []),
        ...(authenticated && isAdmin() ? [{ text: "Users", link: "/users" }] : [])
      ];

    const makeNavLink = (item : HeaderItem) => {
        return (
            <Nav.Link as={Link} key={item.link} href={item.link} className="px-2 text-white">
                {item.text}
            </Nav.Link>
        );
    }

    return(
        <header className="p-3 text-bg-dark">
            <Container>
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <Link href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <img src="/logo.png" alt="Logo" width="32" height="32" />
                    </Link>
                    <Nav className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        { menuItems.map(makeNavLink) }
                    </Nav>
                    <div className="text-end">
                        {authenticated ? (
                            <button type="button" className="btn btn-danger" onClick={handleLogout}>
                                Logout
                            </button>
                        ) : (
                            <>
                            <Link href="/login">
                                <button type="button" className="btn btn-outline-light me-2">Login</button>
                            </Link>
                            <Link href="/signup">
                                <button type="button" className="btn btn-warning">Sign-up</button>
                            </Link>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </header>

    );
}


