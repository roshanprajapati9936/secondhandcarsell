import React from 'react'
import { NavLink } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

const UserManu = () => {
    return (
        <>
            <div> 
                        <h1>User Panel</h1>
                        <ListGroup>
                            <NavLink to='/addDetails' className='nav-link'>
                                <ListGroup.Item>Add Details</ListGroup.Item>
                            </NavLink>

                            <NavLink to='/update' className='nav-link'>
                                <ListGroup.Item>Update Details</ListGroup.Item>
                            </NavLink>

                            {/* <NavLink to='/editproduct' className='nav-link'>
                                <ListGroup.Item> Edit Product</ListGroup.Item>
                            </NavLink> */}

                        </ListGroup>
                        </div>
        </>
    )
}

export default UserManu