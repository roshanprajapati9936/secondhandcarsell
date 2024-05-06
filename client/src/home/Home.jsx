import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import FooterPage from "./FooterPage";
import { SearchContext } from "../context/SearchContext";
import { notification, Select } from 'antd';
const { Option } = Select;

const Home = () => {
  const navigate = useNavigate();
  const { search1 } = useContext(SearchContext);
  const [visibleItem, setVisibleItem] = useState(8);
  const [carCategory, setCarCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [path, setPath] = useState("");

  const SeeLoadMore = () => {
    const newVisibleItem = visibleItem + 4;
    setVisibleItem(Math.min(newVisibleItem, search1.length));
  }

  const isvisibleItem = visibleItem < search1.length;

  const singlePage = (id) => {
    navigate(`/single-page/${id}`);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carRes = await axios.get("http://localhost:8001/get-categories");
        setCarCategories(carRes.data.categories);
        const productsRes = await axios.get("http://localhost:8001/getAll-products");
        console.log(productsRes.data.data.length,productsRes)
        setFilteredProducts(productsRes.data.data);
        setPath(productsRes.data.filepath);
      } catch (err) {
        console.error(err);
        notification.error({ message: "Error fetching data" });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = search1.filter(product => product.carCategory._id === selectedCategory);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(search1);
    }
  }, [selectedCategory, search1]);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={2}>
            <Select
              className='w-4/5 h-10 ml-8 mt-8'
              showSearch
              value={selectedCategory}
              onChange={value => setSelectedCategory(value)}
            >
              <Option value="">All Categories</Option>
              {carCategory.map((c, ind) => (
                <Option key={c._id} value={c._id}>{c.car_name}</Option>
              ))}
            </Select>
          </Col>
          <Col md={10}>
            <Row>
              {filteredProducts.slice(0, visibleItem).map((elem, ind) => (
                <Col key={ind} md={3} className="pt-4">
                  <Card style={{ width: "100%" }} onClick={() => singlePage(elem._id)}>
                    <Card.Img variant="top" src={path + '/' + elem.thumbnail} alt={elem.thumbnail} style={{ height: "200px" }} />
                    <Card.Body>
                      <Card.Title>{elem.carCategory.car_name}</Card.Title>
                      <Card.Text>{elem.description.substring(0, 50)}...</Card.Text>
                      <Card.Text>{elem.price}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
      <div className="text-center mt-5">
        {isvisibleItem ? <button className="btn btn-primary p-3" onClick={SeeLoadMore}>Load More</button> : null}
      </div>
      <div className="mt-16">
        <FooterPage />
      </div>
    </>
  );
};

export default Home;
