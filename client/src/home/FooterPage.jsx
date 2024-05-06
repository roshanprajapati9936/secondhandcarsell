import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const FooterPage = () => {
    return (
        <Container fluid>
            <Row className='footer'>
                <Col md={3} >
                    <h5 className='mt-6 ml-6 font-bold'>POPULAR LOCATIONS</h5>
                    <div className='ml-6'>
                        <p> Kolkata</p>
                        <p>Mumbai</p>
                        <p>Chennai</p>
                        <p>Pune</p>
                    </div>

                </Col>
                <Col md={3}>
                    <h5 className='mt-6  font-bold'> TRENDING LOCATIONS</h5>
                    <div className='ml-1'>
                    <p>Bhubaneshwar</p>
                    <p>Hyderabad</p>
                    <p>Chandigarh</p>
                    <p>Nashik</p>
                    </div>
                  
                </Col>
                <Col md={3}>
                    <h5 className='mt-6 ml-6 font-bold'> About us</h5>
                    <div className='ml-6'>
                    <p>Contact Us</p>
                    </div>
                    
                </Col>

                <Col md={3}>
                    <h4 className='mt-6 ml-6 font-bold'> Sell Car</h4>
                    <div className='ml-6'>
                        <p> Help</p>
                        <p>Sitemap</p>
                        <p>Legal & Privacy information</p>
                        <p>Vulnerability Disclosure Program</p>
                    </div>

                </Col>
            </Row>
        </Container>
    )
}

export default FooterPage