import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import FooterPage from './FooterPage'
import { BiSolidPhoneCall } from "react-icons/bi";
import { Carousel } from 'antd';

const SinglePage = () => {
    const [single, setSingle] = useState({});
    const { singleId } = useParams()
    const [path, setPath] = useState("")
   
    useEffect(() => {
        axios.get(`http://localhost:8001/single-products/${singleId}`)
            .then((res) => {
                console.log("dfghjhhcccggggg", res.data)
                setSingle(res.data.data)
                setPath(res.data.filepath)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [singleId])

    const callHandle = () => {
        window.location.href = `tel:${single.number}`;
    };
  
    return (

        <>
            <Container fluid>
                <Row>
                    <Col md={8}>
                        <div className='border border mt-10 shadow'>
                            <Carousel autoplay>
                                {single.photo && single.photo.map((pic, j) => {
                                    console.log('aaaaaaaaaaa', pic)
                                    return (
                                        <div key={j}>
                                            <div>
                                                <img src={path + '/' + pic} alt={""} className='w-100' />
                                            </div>
                                        </div>
                                    )
                                })}
                   
                            </Carousel>

                            <img src={path + '/' + single.photo} alt="" width={"100%"} />
                        </div>
                        <div className='border border shadow'>
                            <h4 className='ml-8 mt-4 font-bold'> Details </h4> <br />
                            <p className='ml-8'> Brand : <span className='ml-10'>    {single.carCategory?.car_name}</span> <span className='ml-28'> KM: <span className='ml-24'> {single.driven} Km</span></span>
                                <span className='ml-14'>Transmission :</span>
                                <span className='ml-10'>  {single.transCategory?.transmission_name}</span>
                            </p>
                            <p className='ml-8'> Year :<span className='ml-12'> {single.year} </span> <span className='ml-24'> Fuel :</span>
                                <span className='ml-24'> {single.fuelCategory?.fuel_name}</span>
                            </p>
                        </div>
                        <div className='border border shadow'>
                            <h4 className='ml-8 mt-4 font-bold'> Description </h4> <br />
                            <p className='ml-8'> {single.description} </p>
                        </div>
                    </Col>

                    <Col md={4}>
                        <div className='border border shadow mt-10'>
                            <h1 className='mt-4 ml-4'> ₹  {single.price}</h1>
                            <p className='ml-6'> {single.carCategory?.car_name}</p>
                            <p className='ml-6'> {single.title}</p>
                        </div>

                        <div className='border border shadow text-2xl p-4 mt-8'>
                            <h3 className='font-bold text-center pb-4'> Details Of Seller</h3>
                            Name :   <span className='ml-4 mt-4 '> {single.name}</span> <br />
                            <br />
                            Email :  <span className='ml-4 mt-4'> {single.email}</span>
                            <br />
                            <br />
                            <div className=' d-flex'>
                                <div>  Contact me: </div>
                                <BiSolidPhoneCall onClick={callHandle} className='phone_1 ml-20' />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className="mt-16">
                <FooterPage />
            </div>
        </>
    )
}

export default SinglePage