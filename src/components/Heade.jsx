import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { logout } from '../redux/authSlice';
import { setSearchTerm } from '../redux/searchSlice';


function Heade() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [logedIn, setLogedIn] = useState(false)
  const isLoggedInRedux = useSelector((state) => state.auth.loggedIn)

  //logout function
  const handleLogout = () => {
    sessionStorage.clear()
    dispatch(logout())
    navigate('/')
    Swal.fire('Logout successful')
  }
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLogedIn(true)
    } else {
      setLogedIn(false)
    }
  }, [isLoggedInRedux])

  return (
    <div className="header-content">
      <Navbar expand="lg" bg="light" className="py-3">
        <Container fluid className="content-padding">
          <div className="d-flex align-items-center pe-2">
            <i className="fa-solid fa-blog fs-2 text-dark"></i>
          </div>

          <Navbar.Toggle aria-controls="navbarScroll" />

          <Navbar.Collapse id="navbarScroll">
            <div className="d-lg-flex justify-content-between align-items-center w-100 mt-3 mt-lg-0">

              <Form className="d-flex me-auto">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                />
              </Form>

              <Nav className="d-flex align-items-center gap-3 justify-content-end">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>

                {!logedIn && (
                  <Link to="/login">
                    <Button variant="outline-dark">Login</Button>
                  </Link>
                )}

                {logedIn && (
                  <>
                    <Nav.Link href="/admin"><i className="fa-solid fa-user"></i> Page</Nav.Link>

                    <Button variant="outline-dark" onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                )}
              </Nav>

            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Heade;
