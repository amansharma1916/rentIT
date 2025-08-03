import {Navigate} from 'react-router-dom';

const AdminProtect = ({ children }) => {
  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
  return isAdminLoggedIn ? children : <Navigate to="/login/admin" replace />;
};


export default AdminProtect;