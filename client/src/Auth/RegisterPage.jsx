import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios' 
import {notification} from 'antd'



const RegisterPage = () => {
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")


    const handleSubmit =async (e) => {
        e.preventDefault();
          try{
              const res = await axios.post('http://localhost:8001/register',
            {name , email, password, phone, address});
            if(res){
                notification.success({message:"Registration Successfully"})
                navigate("/login")
            }
          }catch(error){
            console.log(error)
            notification.error({message:'Something went wrong'})
          }
    }

    return (
        <>

            <Form className='form' onSubmit={handleSubmit}>
                <h2 className='text-center mt-2'> REGISTRATION </h2>

                <Form.Group className="mb-3 mt-10 pl-2" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Full Name :" 
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    required
                    />
                </Form.Group>

                <Form.Group className="mb-3 mt-10 pl-2" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Email:" 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    />
                </Form.Group>

                <Form.Group className="mb-3 mt-10 pl-2" controlId="formBasicEmail">
                    <Form.Control type="Number" placeholder="Mob-Number:" 
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                    required
                    />
                </Form.Group>

                <Form.Group className="mb-3 mt-10 pl-2" controlId="formBasicAddress">
                    <Form.Control type="textarea" placeholder="Address:" 
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}
                    required
                    />
                </Form.Group>

                <Form.Group className="mb-3 mt-10 pl-2" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password:" 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                </Form.Group>

                <div className='flex justify-center mt-5'>
                    <Button variant="primary" type="submit" className='w-28 text-2xl p-10' >
                        Submit
                    </Button>

                </div>
            </Form>


        </>
    )
}

export default RegisterPage