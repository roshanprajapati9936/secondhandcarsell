import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios' 
import {notification} from 'antd'
import { useAuth } from '../context/auth';



const  LoginPage = () => {
    const navigate = useNavigate()

    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth ,setAuth] = useAuth()
   

    const handleSubmit =async (e) => {
        e.preventDefault();
          try{
                const res = await axios.post('http://localhost:8001/login',
            {email, password});
            if(res){
                notification.success({message:"Login Successfully"})
                setAuth({
                    ...auth,
                    user:res.data.user,
                    token:res.data.token,
                })
                localStorage.setItem("auth",JSON.stringify(res.data));
                navigate("/")
            }
          }catch(error){
            console.log(error)
            notification.error({message:'Something went wrong'})
          }
    }

    return (
        <>

            <Form className='form' onSubmit={handleSubmit}>
                <h2 className='text-center mt-2'> LOGIN  </h2>
                <Form.Group className="mb-3 mt-10 pl-2" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Email:" 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
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
                        LOGIN
                    </Button>
                </div>
            </Form>
        </>
    )
}

export default  LoginPage