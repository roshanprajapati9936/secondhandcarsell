import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbarr from "./Navbar";
import Home from './home/Home';
import RegisterPage from './Auth/RegisterPage';
import LoginPage from './Auth/LoginPage';
import SellYourCar from './sell/SellYourCar';
import SinglePage from './home/SinglePage';
import UpdateProduct from './page/UpdateProduct';
import SearchProvider from './context/SearchProvider';
import EditProduct from './page/EditProduct';

function App() {
  return (
    <>
     
      <Router>
        <SearchProvider>
        <Navbarr />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/sell' element={<SellYourCar />} />
            <Route path='/addDetails' element={<SellYourCar />} />
            <Route path='/single-page/:singleId' element={<SinglePage />} />
            <Route path='/update' element={<UpdateProduct />} />
            <Route path='/editproduct/:edit_id' element={<EditProduct/>} />
          </Routes>
        </SearchProvider>

      </Router>
    </>
  );
}

export default App;
