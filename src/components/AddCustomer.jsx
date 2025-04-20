import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/AddCustomer.css"; // CSS file for styling

const AddCustomer = () => {
  const [customerData, setCustomerData] = useState({

    name: "",
    acctype: "",
    balance:"1000",
    dob: "",
    address: "",
    mobileno: "",
    email: "",
    idproof: "",
  });

  const navigate = useNavigate();

  // Function to generate a unique 10-digit account number
//   function generateAccountNumber() {
//     return Math.floor(1000000000 + Math.random() * 9000000000).toString();
//   }

  // Function to handle form input changes
  const handleChange = (e) => {
    setCustomerData({
      ...customerData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/savecustomer", customerData); // Adjust API endpoint if needed
      if (response.status === 200) {
        alert("Customer added successfully!");
        navigate("/adminDashboard"); // Redirect to admin dashboard or any page after successful submission
      }
    } catch (error) {
      console.error("Error adding customer:", error);
      alert("Failed to add customer. Please try again.");
    }
  };

  return (
    <div className="add-customer-container">
      <h2>Add New Customer</h2>
      <form onSubmit={handleSubmit} className="add-customer-form">
        {/* Two fields per row */}
        <div className="form-row">
     
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={customerData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="accno">Balance</label>
            <input
              type="number"
              id="balance"
              name="balance"
              value={customerData.balance}
              onChange={handleChange}
              min="2000"
            
            />
          </div>

        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={customerData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="acctype">Account Type</label>
            <input
              type="text"
              id="acctype"
              name="acctype"
              value={customerData.acctype}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={customerData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={customerData.address}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="mobileno">Mobile Number</label>
            <input
              type="text"
              id="mobileno"
              name="mobileno"
              value={customerData.mobileno}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="idproof">ID Proof</label>
            <input
              type="text"
              id="idproof"
              name="idproof"
              value={customerData.idproof}
              onChange={handleChange}
              required
            />
          </div>

   

        </div>

        <button type="submit" className="submit-button">
          Add Customer
        </button>
      </form>
    </div>
  );
};

export default AddCustomer;
