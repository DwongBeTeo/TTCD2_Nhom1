import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'; // 👈 dòng này đang thiếu!
import { AuthContext } from '../AuthContext'; // Adjust the import path as necessary

function LogoutButton() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;