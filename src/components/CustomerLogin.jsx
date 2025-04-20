import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/CustomerLogin.css';  // Ensure you have the CSS file imported

const CustomerLogin = ({ onLoggedinChange, onChangeUser, customer, setCustomer }) => {
  const navigate = useNavigate();
  const [accountNo, setAccountNo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);  // Clear any previous errors

    try {

      const encodedString = encodeURIComponent(password);
      // Make API call to fetch customer details by account number
      const response = await axios.post(`/validateCustomer/${accountNo}/${encodedString}`);
      
      // Assuming the response has the customer's data and password
      const customerData = response.data;
      console.log(customerData);
      console.log(response.status);

      if (response.status===200) {  // Ensure you check the password field
        console.log('Customer login successful');
        alert('Login successful');
        onChangeUser({ role: 'customer' });
        onLoggedinChange(true);
        setCustomer({
          ...customer,
          accno: accountNo,
        });
        
        navigate("/customerDashboard");
      } else {
        setError('Login failed, please check your credentials');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Login failed, please check your credentials');
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <p className="login-title">Customer Login</p>
      <div className="form-group">
        <label htmlFor="accountNo">Account No</label>
        <input 
          type="text" 
          id="accountNo"
          className="form-control"
          value={accountNo} 
          onChange={(e) => setAccountNo(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          id="password"
          className="form-control"
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>
      <button type="submit" className="submit-button">Login</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default CustomerLogin;
