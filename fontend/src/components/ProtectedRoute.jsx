//Bảo vệ route dựa trên role.
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);
  if (!user.token || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;