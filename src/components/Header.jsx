import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

const Header = ({ user, isLoggedin }) => {
  return (
    <nav>
      <ul className='navbar'>
        {/* Common links for both customer and admin */}
        <li>
          <Link to="/" className='link'>Home</Link>
        </li>

        {!isLoggedin ? (
          <>
            {/* Show login links if not logged in */}
            <li>
              <Link to="/customerLogin" className='link'>Customer Login</Link>
            </li>
            <li>
              <Link to="/adminLogin" className='link'>Admin Login</Link>
            </li>
          </>
        ) : (
          <>
            {/* If logged in, show customer or admin specific links */}
            {user.role === 'customer' ? (
              <>
                <li>
                  <Link to="/customerDashboard" className='link'>Customer Dashboard</Link>
                </li>
                <li>
                  <Link to="/withdraw" className='link'>Withdraw</Link>
                </li>
                <li>
                  <Link to="/deposit" className='link'>Deposit</Link>
                </li>
                <li>
                  <Link to="/logout" className='link'>Logout</Link>
                </li>
              </>
            ) : user.role === 'admin' ? (
              <>
                <li>
                  <Link to="/adminDashboard" className='link'>Admin Dashboard</Link>
                </li>
                <li>
                  <Link to="/addCustomer" className='link'>Add Customer</Link>
                </li>
                <li>
                  <Link to="/logout" className='link'>Logout</Link>
                </li>
              </>
            ) : null}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
