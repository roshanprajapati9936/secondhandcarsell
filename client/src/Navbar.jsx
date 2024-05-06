import React, { useContext, useEffect } from 'react'
//import {useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from './photos/logo-1.png'
import { useAuth } from './context/auth';
import { notification } from 'antd'
import { SearchContext } from './context/SearchContext';
import axios from 'axios';

const Navbarr = () => {
    // const navigate = useNavigate()
    const [auth, setAuth] = useAuth()
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ""
        })
        localStorage.removeItem("auth")
        //  navigate("/")
        notification.success({
            message: "Logout Successfully"
        });
    }
    // search 
    const { setSearch1 } = useContext(SearchContext)
    const getData = (val = '') => {
        axios.get('http://localhost:8001/getAll-products?search=' + val)
            .then((res) => {
                console.log(res.data)
                setSearch1(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const searchHandle = (e) => {
        getData(e.target.value)
    }
    useEffect(() => {
        getData()
    },[])

    return (
        <>
            <Navbar expand="lg" className="background">
                <Container>

                    <Navbar.Brand href="/" >
                        <img className='logo' src={logo} alt="logo" />
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <div className='login'>
                            <Nav.Link href="/">HOME</Nav.Link>
                        </div>

                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Find Cars"
                                className="me-2 f_18"
                                aria-label="Search"
                                onChange={searchHandle}
                            />
                            <Button variant="outline-success outline-success_1">Search</Button>

                        </Form>
                    </Navbar.Collapse>
                    {
                        !auth.user ? (<>
                            <div className='register'>
                                <Nav.Link href="/register">REGISTRATION</Nav.Link>
                            </div>
                            <div className='login'>
                                <Nav.Link href="/login">LOGIN</Nav.Link>
                            </div>
                        </>) : (<>
                            <div className='ml-10 login'>
                                <Nav.Link href="/logout" onClick={handleLogout}>LOGOUT</Nav.Link>
                            </div>

                            <div className='ml-10 login'>
                                <Nav.Link href="/sell">SELL</Nav.Link>
                            </div>
                        </>)
                    }

                </Container>
            </Navbar>
        </>
    )
}

export default Navbarr