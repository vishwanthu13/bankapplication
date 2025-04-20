import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Landing from "./components/Landing";
import CustomerLogin from "./components/CustomerLogin";
import AdminLogin from "./components/AdminLogin";
import CustomerDashboard from "./components/CustomerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Logout from "./components/Logout";
import Withdraw from "./components/Withdraw";
import ProtectedRoute from "./components/ProtectedRoute";
import Deposit from "./components/Deposit";
import EditCustomer from "./components/EditCustomer";
import AddCustomer from "./components/AddCustomer";

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState({ role: "" });
  // State to store customer details and records
  const [customer, setCustomer] = useState({
    accno: "", // Account Number
    name: "", // Customer Name
    acctype: "", // Account Type (e.g., Current, Savings)
    dob: "", // Date of Birth
    address: "", // Address
    mobileno: "", // Mobile Number
    email: "", // Email Address
    idproof: "", // ID Proof
    balance: 0, // Balance
  });

  return (
    <Router>
      <Header user={user} isLoggedin={isLoggedin} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/customerLogin"
          element={
            <CustomerLogin
              onLoggedinChange={setIsLoggedin}
              onChangeUser={setUser}
              customer={customer}
              setCustomer={setCustomer} // Correct prop name
            />
          }
        />
        s
        <Route
          path="/adminLogin"
          element={
            <AdminLogin
              onLoggedinChange={setIsLoggedin}
              onChangeUser={setUser}
            />
          }
        />
        <Route
          path="/customerDashboard"
          element={
            <ProtectedRoute
              element={() => (
                <CustomerDashboard
                  customer={customer}
                  setCustomer={setCustomer}
                />
              )}
              isLoggedin={isLoggedin && user.role === "customer"}
            />
          }
        />
        <Route
          path="/adminDashboard"
          element={
            <ProtectedRoute
              element={AdminDashboard}
              isLoggedin={isLoggedin && user.role === "admin"}
            />
          }
        />
            <Route
          path="/addCustomer"
          element={
            <ProtectedRoute
              element={AddCustomer}
              isLoggedin={isLoggedin && user.role === "admin"}
            />
          }
        />
        <Route
          path="/edit-customer/:accno"
          element={
            <ProtectedRoute
              element={EditCustomer}
              isLoggedin={isLoggedin && user.role === "admin"}
            />
          }
        />
        <Route
          path="/withdraw"
          element={
            <ProtectedRoute
              element={() => (
                <Withdraw customer={customer} setCustomer={setCustomer} />
              )}
              isLoggedin={isLoggedin && user.role === "customer"}
            />
          }
        />
        <Route
          path="/deposit"
          element={
            <ProtectedRoute
              element={() => (
                <Deposit customer={customer} setCustomer={setCustomer} />
              )}
              isLoggedin={isLoggedin && user.role === "customer"}
            />
          }
        />
        <Route
          path="/logout"
          element={
            <Logout onLoggedinChange={setIsLoggedin} onChangeUser={setUser} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
