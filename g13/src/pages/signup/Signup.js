import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function Signup() {
  const [formData, setFormData] = useState({
    fullname: '',
    contact: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  // Handle changes in form fields
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const { confirmPassword, ...dataToSend } = formData;
    if (formData.password !== formData.confirmPassword) {
      swal("Error!", "Passwords do not match!", "error");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/signup', dataToSend);
      console.log(response.data);
      swal("Success!", "Signup successful!", "success")
        .then(() => navigate('/login'));
    } catch (error) {
      console.error('Signup error:', error.response ? error.response.data : error.message);
      swal("Failed!", "Signup failed. Please try again.", "error");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-4">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4 text-success">Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="fullname" className="form-label">Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
                    <input
                      type="text"
                      id="fullname"
                      className="form-control"
                      placeholder="Enter your full name"
                      value={formData.fullname}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="contact" className="form-label">Contact No</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-telephone-fill"></i></span>
                    <input
                      type="text"
                      id="contact"
                      className="form-control"
                      placeholder="Enter your contact number"
                      value={formData.contact}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-house-fill"></i></span>
                    <input
                      type="text"
                      id="address"
                      className="form-control"
                      placeholder="Enter your address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="form-control"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-success btn-lg">Sign Up</button>
                </div>
              </form>
              <div className="text-center mt-3">
                <p className="mb-0">Already have an account? <Link to="/login">Login here</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
