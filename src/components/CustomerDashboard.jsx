import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/CustomerDashboard.css"; // Import the CSS file

const CustomerDashboard = ({ customer, setCustomer }) => {
  const [records, setRecords] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false); // Flag to prevent infinite calls
  const [showPasswordField, setShowPasswordField] = useState(false); // Toggle password input field
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        console.log("Fetching customer details for:", customer.accno);
        if (!customer.accno || isDataFetched) {
          return; // If there's no account number or data has already been fetched, stop the effect
        }

        const customerUrl = `/customer/${customer.accno}`;
        console.log("Fetching from URL:", customerUrl);

        const customerResponse = await axios.get(customerUrl);
        console.log("Customer Response:", customerResponse.data);

        // Only update customer data if necessary
        if (customer.accno !== customerResponse.data.accno) {
          setCustomer({
            accno: customerResponse.data.accno,
            name: customerResponse.data.name,
            email: customerResponse.data.email,
            balance: customerResponse.data.balance,

            acctype: customerResponse.data.acctype, // Account Type (e.g., Current, Savings)
            dob: customerResponse.data.dob, // Date of Birth
            address: customerResponse.data.address, // Address
            mbno: customerResponse.data.mobileno, // Mobile Number
            // Email Address
            idproof: customerResponse.data.idproof, // ID Proof
            // Balance
          });
        }

        const recordsUrl = `/allrecords/${customer.accno}`;
        console.log("Fetching records from URL:", recordsUrl);
        const recordsResponse = await axios.get(recordsUrl);

        console.log("Records Response:", recordsResponse.data);
        setRecords(recordsResponse.data);

        // Set the flag to true to indicate that data has been fetched
        setIsDataFetched(true);
      } catch (err) {
        console.error("Error fetching customer data or records:", err);
      }
    };

    if (customer.accno && !isDataFetched) {
      fetchCustomerData();
    }
  }, [customer.accno, isDataFetched, setCustomer]);

  // Function to handle account deletion
  const handleDeleteAccount = async () => {
    if (customer.balance > 0) {
      alert("Please withdraw the amount before deleting the account.");
      return;
    }

    try {
      const deleteUrl = `/customer/${customer.accno}`;
      await axios.delete(deleteUrl);
      alert("Account deleted successfully.");

      // Clear customer state and redirect to the start page
      setCustomer({});
      navigate("/logout");
      // Adjust the route as needed
    } catch (err) {
      console.error("Error deleting account:", err);
    }
  };


  // Function to handle password change API call
  const handlePasswordChange = async () => {
    try {
      const changePasswordUrl = `/customer/${customer.accno}/${newPassword}`; // Adjust the API endpoint
      const response = await axios.put(changePasswordUrl);
      
      if (response.status === 200) {
        alert("Password changed successfully!");
        setShowPasswordField(false); // Hide the password field after success
      }
    } catch (err) {
      console.error("Error changing password:", err);
      alert("Failed to change password. Please try again.");
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Customer Dashboard</h2>
        <div className="flexContainer">


      
      {/* Display customer details */}
      <div className="customer-details">
        <h3>Customer Details</h3>
        <div className="display-customer">
          <div>
            <p>
              <strong>Account No:</strong> {customer.accno || "N/A"}
            </p>
            <p>
              <strong>Name:</strong> {customer.name || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {customer.email || "N/A"}
            </p>
            <p>
              <strong>Balance:</strong> ${customer.balance || "0"}
            </p>
            <p>
              <strong>Mobile:</strong> {customer.mbno || "N/A"}
            </p>
          </div>
          <div>
            <p>
              <strong>Account No:</strong> {customer.acctype || "N/A"}
            </p>
            <p>
              <strong>Name:</strong> {customer.idproof || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {customer.dob || "N/A"}
            </p>
            <p>
              <strong>Address:</strong> {customer.address || "N/A"}
            </p>
            <button
              className="delete-account-button"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </button>
            
 
          </div>
        </div>
      </div>

          {/* Button to trigger change password */}
          <div className="change-password-section">
        <button onClick={() => setShowPasswordField(!showPasswordField)}>
          {showPasswordField ? "Cancel" : "Change Password"}
        </button>

        {showPasswordField && (
          <div className="password-change-form">
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handlePasswordChange}>Submit</button>
          </div>
        )}
      </div>

      </div>
      {/* Display customer records */}
      <div className="records-list">
        <h3>Customer Records</h3>
        {records.length > 0 ? (
  <table className="records-table">
    <thead>
      <tr>
        <th>Transaction ID</th>
        <th>Transaction Type</th>
        <th>Amount</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {records.map((record) => (
        <tr key={record.tid}>
          <td>{record.tid}</td>
          <td>{record.recordType === 1 ? "Withdraw" : "Deposit"}</td>
          <td>{record.amount}</td>
          <td>{record.time}</td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <p className="empty-message">No records available.</p>
)}

      </div>
    </div>
  );
};

export default CustomerDashboard;
