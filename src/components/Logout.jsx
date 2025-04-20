import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLoggedinChange, onChangeUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Reset user state and login status
    onChangeUser({ role: '' });
    onLoggedinChange(false);

    // Redirect to the landing page after logout
    navigate('/');
  }, [navigate, onLoggedinChange, onChangeUser]);

  return <div>Logging out...</div>;
};

export default Logout;
