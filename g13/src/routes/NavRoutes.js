import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from '../pages/home/Home';
import Products from '../pages/products/Products';
import Projects from '../pages/projects/Projects';
import Login from '../pages/login/Login';
import Signup from '../pages/signup/Signup';
import Nav from '../components/navBar/Nav';
import Profile from '../pages/profile/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavRoutes() {
  const [useremail, setUseremail] = useState(localStorage.getItem('useremail') || '');

  useEffect(() => {
    const checkSession = async () => {
      // Instead of fetching session state from the server, use local storage
      const email = localStorage.getItem('useremail');
      if (email) {
        setUseremail(email);
      }
    };

    checkSession();
  }, []);

  // Modify setUseremail to update local storage as well
  const handleSetUseremail = (email) => {
    setUseremail(email);
    if (email) {
      localStorage.setItem('useremail', email);
    } else {
      localStorage.removeItem('useremail');
    }
  };

  return (
    <Router>
      <Nav useremail={useremail} setUseremail={handleSetUseremail}/>
      <Routes> 
        <Route exact path="/" element={<Home />} />  
        <Route path="/products" element={<Products />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/login" element={<Login setUseremail={handleSetUseremail}/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile useremail={useremail}/>} />
      </Routes>  
    </Router>
  );
}

export default NavRoutes;
