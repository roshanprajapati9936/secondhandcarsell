import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Select, Input, notification } from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import UserManu from '../page/UserManu'
const { Option } = Select


const SellYourCar = () => {
  const userData = JSON.parse(localStorage.getItem("auth"));
  //  console.log("pppprrreeeeee", userData.user);
  const navigate = useNavigate()
  const [carCategory, setCarCategory] = useState([])
  const [selectedCarCategory, setSelectedCarCategory] = useState("");
  const [fuelCategory, setFuelCategory] = useState([])
  const [selectedFuelCategory, setSelectedFuelCategory] = useState("");
  const [transCategory, setTransCategory] = useState([])
  const [selectedTransCategory, setSelectedTransCategory] = useState("");

  const [year, setYear] = useState("")
  const [driven, setDriven] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [name, setName] = useState(userData ? userData.user.name : "");
  const [email, setEmail] = useState(userData ? userData.user.email : "");
  const [number, setNumber] = useState(userData ? userData.user.phone : "")
  const [photo, setPhoto] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setPhoto(files);
  };

  const handleCreate = async (e) => {
    try {
      const productData = new FormData();
      productData.append("carCategory", selectedCarCategory)
      productData.append("fuelCategory",selectedFuelCategory )
      productData.append("transCategory", selectedTransCategory)
      productData.append("year", year)
      productData.append("driven", driven)
      productData.append("title", title)
      productData.append("description", description)
      productData.append("price", price)
      productData.append("thumbnail", thumbnail)
      productData.append("email", email)
      productData.append("number", number)
      productData.append("name", name)
     // Append each photo to FormData
     photo.forEach((pho, index) => {
      productData.append(`photo`, pho);
    });
    console.log(productData);
    //console.log('aaaaaaaaaaaa', photo); 
      axios.post('http://localhost:8001/create-product', productData)   
        .then((res) => {
          console.log(res)
          notification.success({ message: "craeted successfully" })
          navigate("/")
        })
    } catch (err) {
      console.log(err)
      notification.error({ message: "error while creating product" })
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carRes = await axios.get("http://localhost:8001/get-categories");
        setCarCategory(carRes.data.categories);


        const fuelRes = await axios.get("http://localhost:8001/getAll-fuelcategory");
        setFuelCategory(fuelRes.data.data);

        const transRes = await axios.get("http://localhost:8001/getAll-transmission");
        setTransCategory(transRes.data.data);
      } catch (err) {
        console.error(err);
        notification.error({ message: "Error fetching data" });
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <h1 className='text-center mt-10 font-bold text-2xl'> POST YOUR AD</h1>
      <Container>
        <Row>
          <Col md={4}>
            <UserManu />
          </Col>
          <Col md={8} >

            <div className='upload_product'>

              <div>
                <p className='ml-10 mt-3 font-bold text-xl'> INCLUDE SOME DETAILS</p>
                <p className='ml-10'> Brand * </p>
                <Select className='w-3/5 h-12 ml-10'
                  showSearch
                  onChange={(value) => setSelectedCarCategory(value)}
                >
                  {
                    carCategory &&
                    carCategory.map((c, ind) => {

                      return (
                        <Option key={c._id} value={c._id}>
                          {c.car_name}
                        </Option>
                      )
                    })
                  }
                </Select>
              </div>

              <div>
                <p className='ml-10 mt-4'> Year* </p>
                <Input type='number' className='w-3/5 h-12 ml-10'
                  showSearch
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                />
              </div>

              <div>
                <p className='ml-10 mt-4'> Fuel * </p>
                <Select className='w-3/5 h-12 ml-10'
                  showSearch
                  onChange={(value) => setSelectedFuelCategory(value)}
                >
                  {
                    fuelCategory &&
                    fuelCategory.map((f, ind) => {
                      return (
                        <Option key={f._id} value={f._id}>
                          {f.fuel_name}
                        </Option>
                      )
                    })
                  }
                </Select>

              </div>

              <div>
                <p className='ml-10 mt-4'> Transmission * </p>
                <Select className='w-3/5 h-12 ml-10'
                  showSearch
                  onChange={(value) => setSelectedTransCategory(value)}
                >
                  {
                    transCategory &&
                    transCategory.map((t, ind) => {
                      return (
                        <Option key={t._id} value={t._id}>
                          {t.transmission_name}
                        </Option>
                      )
                    })
                  }

                </Select>
              </div>

              <div>
                <p className='ml-10 mt-4'> KM driven * </p>
                <Input type='number' className='w-3/5 h-12 ml-10'
                  value={driven}
                  onChange={(e) => setDriven(e.target.value)}
                  required
                />
              </div>

              <div>
                <p className='ml-10 mt-4'> Ad title *  </p>
                <Input type='text' className='w-3/5 h-12 ml-10'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <p className='ml-10 mt-10'> Description * </p>
                <Input type='text' className='w-3/5 h-12 ml-10'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <br />
              <br />
              <hr />
              <div>
                <p className='ml-10 mt-3 font-bold text-xl'> SET A PRICE</p>
                <p className='ml-10 mt-10'> Price * </p>
                <Input type='number' className='w-3/5 h-12 ml-10'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder='₹ |'
                  required
                />
              </div>
              <br />
              <br />
              <hr />
              {/* thumbnail */}

              <div className="mb-3">
                <p className='ml-10 mt-3 font-bold text-xl'> UPLOAD YOUR PHOTO</p>
                {thumbnail && (
                  <div className='text-center ml-7'>
                    <img src={URL.createObjectURL(thumbnail)}
                      alt="product_thumbnail"
                      width={"100px"}
                      height={"100px"}
                      className='img img-responsive' />
                  </div>
                )}
              </div>

              <div>
                <label className='btn btn btn-secondary col-md-10 ml-7'>
                  {thumbnail ? thumbnail.name : "upload thumbnail"}
                  <input type='file'
                    name='thumbnail'
                    accept='image/*'
                    onChange={(e) => setThumbnail(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <br />
              <br />
              <hr />
              <div>
                {/* Display selected images */}
                <Row>
                <p className='ml-10 mt-3 font-bold text-xl'> UPLOAD PHOTOS UP 20 </p>
                  {photo.map((image, index) => (
                    <Col key={index} md={3} className="mb-3">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Uploaded Image ${index}`}
                        width={"100%"}
                        height={"auto"}
                        className='img img-responsive'
                      />
                    </Col>
                  ))}
                </Row>
              </div>
              <div>
                <input type="file" multiple onChange={handleImageChange} className='ml-10' />
              </div>
              <br />
              <hr />
              <div></div>
              {/*  About yourSelf */}
              <h1 className='text-center font-bold text-2xl mt-10'>REVIEW YOUR DETAILS</h1>
              <p className='ml-10 mt-4'> Name * </p>
              <Input type='text' className='w-3/5 h-12 ml-10'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <p className='ml-10 mt-4'> Email * </p>
              <Input type='email' className='w-3/5 h-12 ml-10'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <p className='ml-10 mt-4'> Mobile No :- * </p>
              <Input type='number' className='w-3/5 h-12 ml-10'
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />

              <br />
              <br />
              <hr />
              <button className='btn btn-primary ml-10 p-3' onClick={handleCreate}  >POST NOW</button>
              <hr />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default SellYourCar
