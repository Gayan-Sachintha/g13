import React, { useState, useEffect } from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import jsPDF from 'jspdf';
import axios from 'axios';
import swal from 'sweetalert';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1e88e5',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#1e88e5',
  },
  profile: {
    borderWidth: 2,
    borderColor: '#1e88e5',
    borderRadius: 5,
    padding: 20,
  },
  detail: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  label: {
    fontWeight: 'bold',
    color: '#1e88e5',
  },
});

function Profile(props) {
  const [profile, setProfile] = useState({
    fullName: '',
    contactNo: '',
    address: '',
    email: '',
    password: ''
  });

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };
  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/profile/${encodeURIComponent(profile.email)}`, profile);
      console.log('Save response:', response.data);
      swal("Success!", "Profile updated successfully!", "success");
    } catch (error) {
      console.error('Error saving profile data:', error);
      swal("Failed!", "Failed to update profile.", "error");
    }
  };

  const handlePrintAccountDetails = () => {
    const pdf = new jsPDF();

    // Add profile details to PDF
    pdf.setFontSize(14);
    pdf.text(20, 20, 'Welcome To G13 Store', { fontSize: 18, fontWeight: 'bold' });
    pdf.text(20, 30, 'Here is your profile details', { fontSize: 16, fontWeight: 'bold' });
    pdf.setDrawColor(0, 128, 0);
    pdf.rect(10, 40, 190, 140);
    pdf.text(20, 50, `Full Name: ${profile.fullName}`);
    pdf.text(20, 70, `Contact No: ${profile.contactNo}`);
    pdf.text(20, 90, `Address: ${profile.address}`);
    pdf.text(20, 110, `Email: ${profile.email}`);
    pdf.text(20, 130, `Password: ${profile.password}`);

    pdf.save('account_details.pdf');

    swal("Done!", "Your account details PDF has been created.", "info");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/profile/${encodeURIComponent(props.useremail)}`);
        setProfile({
          fullName: response.data.fullname,
          contactNo: response.data.contact,
          address: response.data.address,
          email: response.data.email,
          password: response.data.password,
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
        swal("Error!", "Failed to fetch profile data.", "error");
      }
    };

    fetchProfile();
  }, [props.useremail]);  

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 mt-4">
          <div className="card shadow" style={{ border: '2px solid #28a745', borderRadius: '15px' }}>
            <div className="card-body">
              <h2 className="text-center mb-4" style={{ color: '#28a745' }}>Profile Details</h2>
              <div className="form-group mb-3">
                <label htmlFor="fullName" className="form-label" style={{ color: '#28a745' }}>Full Name</label>
                <input type="text" id="fullName" name="fullName" className="form-control" value={profile.fullName} onChange={handleInputChange} />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="contactNo" className="form-label" style={{ color: '#28a745' }}>Contact No</label>
                <input type="text" id="contactNo" name="contactNo" className="form-control" value={profile.contactNo} onChange={handleInputChange} />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="address" className="form-label" style={{ color: '#28a745' }}>Address</label>
                <input type="text" id="address" name="address" className="form-control" value={profile.address} onChange={handleInputChange} />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email" className="form-label" style={{ color: '#28a745' }}>Email</label>
                <input type="email" id="email" name="email" className="form-control" value={profile.email} onChange={handleInputChange} />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password" className="form-label" style={{ color: '#28a745' }}>Password</label>
                <input type="password" id="password" name="password" className="form-control" value={profile.password} onChange={handleInputChange} />
              </div>
              <div className="d-grid gap-2">
                <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save Changes</button>
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="button" className="btn btn-success" onClick={handlePrintAccountDetails}>Print Account Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
