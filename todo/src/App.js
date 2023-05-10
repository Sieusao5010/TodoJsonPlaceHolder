import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import TodoScreen from "./screen/TodoScreen";
import HomeScreen from "./screen/HomeScreen";

export default function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        {/* Header */}
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Siêu Sao</Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto">
              <Link to="/todo" className="nav-link">
                To do
              </Link>
            </Nav>
          </Container>
        </Navbar>
        {/* Header */}

        {/* Body */}
        <main>
          <Container>
            <Routes>
              <Route path="/todo/" element={<TodoScreen />} />

              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        {/* Body */}
      </div>
    </BrowserRouter>
  );
}
