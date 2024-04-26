import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function LoginForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      console.log(response.data);
      props.setUseremail(response.data.email);
      swal("Success!", "You're logged in!", "success")
        .then(() => navigate('/'));
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      swal("Failed!", "Login failed. Please check your credentials and try again.", "error");
    }
  };


  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 mt-4">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Welcome Back!</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">Enter Your Email Here..</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
                    <input type="email" id="email" className="form-control" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-key-fill"></i></span>
                    <input type="password" id="password" className="form-control" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                </div>
                {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                <div className="d-grid">
                  <button type="submit" className="btn btn-success btn-lg">Login</button>
                </div>
              </form>
              <div className="text-center mt-3">
                <p className="mb-0">New here? <Link to="/signup">Sign up here</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
