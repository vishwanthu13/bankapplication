import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import '../css/EditCustomer.css';
const EditCustomer = () => {
  const { accno } = useParams(); // Retrieve account number from URL
  const [customer, setCustomer] = useState({
    accno: "",
    name: "",
    email: "",
    acctype: "",
    dob: "",
    address: "",
    mobileno: "",
    idproof: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch customer details based on accno
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(`/customer/${accno}`);
        setCustomer(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch customer data");
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [accno]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission to update customer details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/customer`, customer);
      alert("Customer updated successfully");
      navigate("/adminDashboard"); // Redirect back to the admin dashboard after successful update
    } catch (err) {
      alert("Failed to update customer details. Please try again.");
    }
  };

  // Display loading message while fetching data
  if (loading) {
    return <p>Loading customer details...</p>;
  }

  // Display error if data fetching fails
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="edit-customer-container">
      <h2>Edit Customer: {customer.name}</h2>
      <form onSubmit={handleSubmit} className="edit-customer-form">
      <div className="form-group">
          <label htmlFor="name">Acc no:</label>
          <input
            type="text"
            id="accno"
            name="accno"
            value={customer.accno}
            onChange={handleInputChange}
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={customer.name}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={customer.email}
            onChange={handleInputChange}
            required
          />
        </div> */}
        {/* <div className="form-group">
          <label htmlFor="acctype">Account Type:</label>
          <input
            type="text"
            id="acctype"
            name="acctype"
            value={customer.acctype}
            onChange={handleInputChange}
            required
          />
        </div> */}
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={customer.dob}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={customer.address}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="mbno">Mobile Number:</label>
          <input
            type="text"
            id="mbno"
            name="mbno"
            value={customer.mbno}
            onChange={handleInputChange}
            required
          />
        </div> */}
        <div className="form-group">
          <label htmlFor="idproof">ID Proof:</label>
          <input
            type="text"
            id="idproof"
            name="idproof"
            value={customer.idproof}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditCustomer;
