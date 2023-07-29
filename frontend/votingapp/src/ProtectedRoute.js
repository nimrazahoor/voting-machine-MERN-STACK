import React, { useState } from 'react';
import { useNavigate, Route } from 'react-router-dom';

const isUserAdmin = () => {
  const user = sessionStorage.getItem('userType');
  if (user === 'Admin') {
    return true;
  }
  return false;
};

const ProtectedRoute = ({ path, element }) => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(isUserAdmin());

  if (!authenticated) {
    navigate('/login');
    return null; 
  }

  return <Route path={path} element={element} />;
};

export default ProtectedRoute;
