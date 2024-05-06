import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Select, Input, notification } from 'antd'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import UserManu from '../page/UserManu'


const EditProduct = () => {
  const { edit_id } = useParams()
  const navigate = useNavigate()
  const [carCategory, setCarCategory] = useState([])
  const [brand, setBrand] = useState('')
  const [fuelCategory, setFuelCategory] = useState([])
  const [fuel, setFuel] = useState('')
  const [transCategory, setTransCategory] = useState([])
  const [trans ,setTrans] = useState('')
  const [year, setYear] = useState("")
  const [driven, setDriven] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [photo, setPhoto] = useState("")
  const [email, setEmail] = useState("")
  const [number, setNumber] = useState("")
  const [name, setName] = useState("")
  const [avatar, setAvatar] = useState("")
  const [path, setPath] = useState('')


  // GET SINGLE DATA
  const getSingleData = async () => {
    try {
      await axios.get(`http://localhost:8001/single-products/${edit_id}`

      ).then((data) => {
        // console.log("wertyu", data)
        const res = data.data.data
        setYear(data.data.data.year)
        setDriven(data.data.data.driven)
        setTitle(data.data.data.title)
        setDescription(data.data.data.description)
        setPrice(data.data.data.price)
        setEmail(data.data.data.email)
        setNumber(data.data.data.number)
        setName(data.data.data.name)
        setAvatar(data.data.data.thumbnail)
        setPath(data.data.filepath)
        setBrand(res.carCategory._id);
        setFuel(res.fuelCategory._id)
        setTrans(res.transCategory._id)
        
      })

    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getSingleData();
  }, [])

  const handleCreate = async () => {
      
    try {
      const productData = new FormData();
      productData.append("carCategory", brand)
      productData.append("fuelCategory", fuel)
      productData.append("transCategory", trans)
      productData.append("year", year)
      productData.append("driven", driven)
      productData.append("title", title)
      productData.append("description", description)
      productData.append("price", price)
      productData.append("thumbnail", photo)
      productData.append("email", email)
      productData.append("number", number)
      productData.append("name", name)
      

      axios.put(`http://localhost:8001/update-product/${edit_id}`, productData)
        .then((res) => {
          console.log(res)
          notification.success({ message: "Updated successfully" })
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
      <h1 className='text-center mt-10 font-bold text-2xl'> UPDATE</h1>
      <Container>
        <Row>
          <Col md={4}>
            <UserManu />
          </Col>
          <Col md={8} >

            <div className='upload_product'>
              <div>
                <p className='ml-10 mt-3 font-bold text-xl'> UPDATE YOUR PRODUCT</p>
                <p className='ml-10'> Brand * </p>
                <select className='w-3/5 h-12 ml-10'
                  showSearch
                  onChange={(e) => setBrand(e.target.value)}
                >
                  {
                    carCategory &&
                    carCategory.map((c, ind) => {

                      return (
                        <option key={c._id} value={c._id} selected={brand === c._id ? true : false}>
                          {c.car_name}
                        </option>
                      )
                    })
                  }
                </select>
              </div>

              <div>
                <p className='ml-10 mt-4'> Year* </p>
                <Input type='number' className='w-3/5 h-12 ml-10'
                  showSearch
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>

              <div>
                <p className='ml-10 mt-4'> Fuel * </p>
                <select className='w-3/5 h-12 ml-10'
                  showSearch
                  onChange={(e) => setFuel(e.target.value)}
                >
                  {
                    fuelCategory &&
                    fuelCategory.map((f, ind) => {
                      return (
                        <option key={f._id} value={f._id} selected={fuel === f.fuel_name ? true : false}>
                          {f.fuel_name}
                        </option>
                      )
                    })
                  }
                </select>

              </div>

              <div>
                <p className='ml-10 mt-4'> Transmission * </p>
                <select className='w-3/5 h-12 ml-10'
                  showSearch    
                  onChange={(e) => setTrans(e.target.value)}
                >
                  {
                    transCategory &&
                    transCategory.map((t, ind) => {
                      return (
                        <option key={t._id} value={t._id}  selected={trans === t.transmission_name_name ? true : false}>
                          {t.transmission_name}
                        </option>
                      )
                    })
                  }

                </select>
              </div>

              <div>
                <p className='ml-10 mt-4'> KM driven * </p>
                <Input type='number' className='w-3/5 h-12 ml-10'
                  value={driven}
                  onChange={(e) => setDriven(e.target.value)}
                />
              </div>

              <div>
                <p className='ml-10 mt-4'> Ad title *  </p>
                <Input type='text' className='w-3/5 h-12 ml-10'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <p className='ml-10 mt-10'> Description * </p>
                <Input type='text' className='w-3/5 h-12 ml-10'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                />
              </div>
              <br />
              <br />
              <hr />
              {/* photo */}

              <div className="mb-3">
                <p className='ml-10 mt-3 font-bold text-xl'> UPLOAD UP TO 20 PHOTOS</p>
                {photo ? (
                  <div className='text-center ml-7'>
                    <img src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      width={"100px"}
                      height={"100px"}
                      className='img img-responsive' />
                  </div>
                ) : (
                  <div className='text-center ml-7'>
                    <img src={path + '/' + avatar}
                      alt="product_photo"
                      width={"100px"}
                      height={"100px"}
                      className='img img-responsive' />
                  </div>
                )}
              </div>

              <div>
                <label className='btn btn btn-secondary col-md-10 ml-7'>
                  {photo ? photo.name : "upload photo"}
                  <input type='file'
                    name='photo'
                    accept='image/*'
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <br />
              <br />
              <hr />
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
              <br />
              <hr />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default EditProduct