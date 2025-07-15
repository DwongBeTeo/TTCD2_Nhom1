//Điều hướng với phân quyền.
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import LogoutButton from './LogoutButton';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  // return (
  //   <nav style={{ padding: '10px', background: '#f8f9fa' }}>
  //     <Link to="/valorant-accounts" style={{ margin: '0 10px' }}>Accounts</Link>
  //     {user.token && user.role === 'buyer' && (
  //       <>
  //         <Link to="/cart" style={{ margin: '0 10px' }}>Cart</Link>
  //         <Link to="/orders" style={{ margin: '0 10px' }}>Orders</Link>
  //       </>
  //     )}
  //     {user.token && user.role === 'admin' && (
  //       <Link to="/admin/valorant-accounts" style={{ margin: '0 10px' }}>Admin Dashboard</Link>
  //     )}
  //     {user.token ? (
  //       <button onClick={logout} style={{ margin: '0 10px', padding: '5px 10px' }}>
  //         Logout
  //       </button>
  //     ) : (
  //       <>
  //         <Link to="/login" style={{ margin: '0 10px' }}>Login</Link>
  //         <Link to="/register" style={{ margin: '0 10px' }}>Register</Link>
  //       </>
  //     )}
  //   </nav>
  // );

  return (
    <nav className="p-4 bg-gray-100">
      <Link to="/valorant-accounts" className="mx-2 text-blue-600 hover:underline">Accounts</Link>
      {user.token ? (
        <>
          <span className="mx-2 font-bold text-gray-800">
            Xin Chào: {user.username || 'Người dùng'}
          </span>
          {user.role === 'buyer' && (
            <>
              <Link to="/cart" className="mx-2 text-blue-600 hover:underline">Cart</Link>
              <Link to="/orders" className="mx-2 text-blue-600 hover:underline">Orders</Link>
            </>
          )}
          {user.role === 'admin' && (
            <Link to="/admin/valorant-accounts" className="mx-2 text-blue-600 hover:underline" style={{ marginLeft: '8px' }}>Admin Dashboard</Link>
          )}
          {user.role === 'admin' && (
            <Link to="/admin/users-with-orders" className="mx-2 text-blue-600 hover:underline" style={{ marginLeft: '8px' }}>All Orders</Link>
          )}
          {/* <button
            onClick={logout}
            className="mx-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button> */}<LogoutButton />
        </>
      ) : (
        <>
          <Link to="/login" className="mx-2 text-blue-600 hover:underline">Login</Link>
          <Link to="/register" className="mx-2 text-blue-600 hover:underline">Register</Link>
        </>
      )}
    </nav>
  );

};

export default Navbar;