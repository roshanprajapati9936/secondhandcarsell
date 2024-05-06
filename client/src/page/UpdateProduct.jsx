import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Table, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState('');
  const [delete1, setDelete1] = useState();
  const [path, setPath] = useState('');
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allPro = await axios.get(`http://localhost:8001/getAll-products`);
        setProduct(allPro.data.data);
        setPath(allPro.data.filepath);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [delete1]);

  // delete handle
  const deleteHandle = (id) => {
    setDeleteItemId(id);
    setConfirmDeleteVisible(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:8001/delete-product/${deleteItemId}`)
      .then((res) => {
        console.log(res);
        setDelete1(deleteItemId);
        notification.success({ message: 'Deleted Successfully' });
        setConfirmDeleteVisible(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancelDelete = () => {
    setConfirmDeleteVisible(false);
  };

  // edit navigate
  const setEdit = (id) => {
    navigate(`/editproduct/${id}`);
  };
  // Back 
  const navigateBacke = () => {
    navigate('/sell');
  };

  return (
    <>
      <Container className="mt-20" fluid>
        <Row>
          <Col md={12}>
            <button onClick={navigateBacke} className="p-2 border mb-4 bg-secondary">
              Back
            </button>
            <Table bordered>
              <thead className="thead_1">
                <tr className="text-center">
                  <th> SrNo </th>
                  <th> Brand </th>
                  <th> Fuel </th>
                  <th> Transmission</th>
                  <th> Year</th>
                  <th> Driven</th>
                  <th> Description</th>
                  <th> Title</th>
                  <th> Price</th>
                  <th> Photo</th>
                  <th> Email</th>
                  <th> Number</th>
                  <th> Name</th>
                  <th> Action</th>
                  <th> Action</th>
                </tr>
              </thead>
              <tbody>
                {product &&
                  product.map((elem, ind) => {
                    return (
                      <tr className="text-center" key={elem._id}>
                        <th> {++ind}</th>
                        <th> {elem.carCategory.car_name}</th>
                        <th> {elem.fuelCategory.fuel_name}</th>
                        <th> {elem.transCategory.transmission_name}</th>
                        <th> {elem.year}</th>
                        <th> {elem.driven}</th>
                        <th> {elem.description.substring(0, 10)}</th>
                        <th> {elem.title.substring(0, 10)}</th>
                        <th> {elem.price}</th>
                        <th>
                          <img src={path + '/' + elem.thumbnail} alt=""  style={{height:"50px"}}/>
                        </th>
                        <th> {elem.email}</th>
                        <th> {elem.number}</th>
                        <th> {elem.name}</th>
                        <th>
                         
                          <MdDelete onClick={() => deleteHandle(elem._id)} />
                        </th>
                        <th>
                        
                          <FaRegEdit onClick={() => setEdit(elem._id)} />
                        </th>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      {/* Confirm Delete Modal */}
      <Modal show={confirmDeleteVisible} onHide={handleCancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateProduct;
