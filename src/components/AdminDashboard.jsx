import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/AdminDashboard.css"; // Import the CSS file

const AdminDashboard = () => {
  const [admin,setAdmin]=useState([]);
  const [customers, setCustomers] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false); // Flag to prevent infinite calls
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllCustomers = async () => {
      try {
        if (isDataFetched) return; // Prevent multiple API calls

        // API call to fetch all customers
        const response = await axios.get("/customers"); // Adjust the API endpoint
        setCustomers(response.data);
        setIsDataFetched(true);
      } catch (err) {
        console.error("Error fetching customers:", err);
      }
    };

    if (!isDataFetched) {
      fetchAllCustomers();
    }
  }, [isDataFetched]);

  // Function to handle deleting a customer
  const handleDeleteCustomer = async (accno) => {
    try {
      const deleteUrl = `/customer/${accno}`;
      await axios.delete(deleteUrl);
      alert("Customer deleted successfully.");
      // Refetch the updated customer list
      setIsDataFetched(false);
    } catch (err) {
      console.error("Error deleting customer:", err);
    }
  };

  // Function to handle editing a customer (redirects to an edit page)
  const handleEditCustomer = (accno) => {
    navigate(`/edit-customer/${accno}`); // Redirect to the edit page
  };



  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>

      {/* Display customers in a table */}
      <div className="customers-table">
        <h3>All Customers</h3>
        {customers.length > 0 ? (
          <table className="customers-list-table">
            <thead>
              <tr>
                <th>Account No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>ID Proof</th>
                <th>Date of Birth</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.accno}>
                  <td>{customer.accno}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.mobileno}</td>
                  <td>{customer.idproof}</td>
                  <td>{customer.dob}</td>
                  <td>{customer.address}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEditCustomer(customer.accno)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteCustomer(customer.accno)}
                    >
                      Delete
                    </button>
                
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="empty-message">No customers available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
