import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import api from '../services/api';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      console.log('Sending login request:', { username, password });
      const response = await api.post('/auth/login', { username, password });
      console.log('Full Response:', response.data);
      const { token, role,userId, username: responseUsername  } = response.data;
      if (!token || !role || !responseUsername || !userId) {
        console.log('Full Response:', response.data);
        throw new Error('Invalid login response');
      }
      login(token, role, userId, responseUsername);
      navigate(role === 'admin' ? '/admin/valorant-accounts' : '/valorant-accounts');
      console.log(localStorage.getItem('username')); // Mong đợi: "buy2"
      console.log(localStorage.getItem('role')); // Mong đợi: "buyer" hoặc "admin"
      console.log(localStorage.getItem('token')); // Mong đợi: JWT token
      console.log(localStorage.getItem('userId')); // Mong đợi: userId
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.message || err.message || 'Đăng nhập thất bại');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', margin: '8px 0' }}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', margin: '8px 0' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;