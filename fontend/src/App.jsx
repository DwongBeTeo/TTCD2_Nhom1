import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import OrderHistory from './components/OrderHistory';
import Cart from './components/Cart';
import ValorantAccountAdminList from './components/admin/ValorantAccountAdminList';
import AdminOrders from './components/admin/AdminOrders';
import SingleUserOrders from './components/admin/SingleUserOrders';
import ValorantAccountForm from './components/admin/ValorantAccountForm';
import ValorantAccountUserList from './components/user/ValorantAccountUserList';
import ValorantAccountDetail from './components/user/ValorantAccountDetail';
import { AuthProvider } from './AuthContext';
import Navbar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterForm from './components/RegisterForm';
// Importing CSS for styling
import './index.css';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/orders" element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <OrderHistory />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/checkout" element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/admin/valorant-accounts" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ValorantAccountAdminList />
            </ProtectedRoute>
          } />
          <Route path="/admin/valorant-accounts/new" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ValorantAccountForm />
            </ProtectedRoute>
          } />
          <Route path="/admin/valorant-accounts/edit/:id" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ValorantAccountForm />
            </ProtectedRoute>
          } />
          <Route path="/admin/users-with-orders" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminOrders />
            </ProtectedRoute>
          } />
          <Route path="/admin/orders/:userId" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <SingleUserOrders />
            </ProtectedRoute>
          } />
          <Route path="/valorant-accounts" element={<ValorantAccountUserList />} />
          <Route path="/valorant-accounts/:id" element={<ValorantAccountDetail />} />
          <Route path="/" element={<Navigate to="/valorant-accounts" />} />
        </Routes>
        {/* footer */}
      </Router>
    </AuthProvider>
  );
}

export default App;