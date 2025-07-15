import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import { getUsersWithOrders } from '../../services/orders';
// import LogoutButton from './LogoutButton';

function AdminOrders() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            if (!user.token || user.role !== 'admin') {
                setError('Vui lòng đăng nhập với vai trò admin để xem danh sách khách hàng');
                navigate('/login');
                return;
            }

            setLoading(true);
            setError('');
            try {
                const data = await getUsersWithOrders();
                setUsers(data);
                setFilteredUsers(data);
            } catch (err) {
                setError(err.message || 'Không thể tải danh sách khách hàng');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [user, navigate]);

    useEffect(() => {
        setFilteredUsers(
            users.filter((user) =>
                user.username.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, users]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Danh sách khách hàng đã đặt hàng</h2>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Tìm kiếm theo username..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {loading && <p className="text-gray-500 mb-4">Đang tải...</p>}
            {filteredUsers.length === 0 ? (
                <p className="text-gray-500">Không có khách hàng nào phù hợp.</p>
            ) : (
                <div className="flex flex-wrap gap-4">
                    {filteredUsers.map((user) => (
                        <div
                            key={user.userId}
                            className="p-4 border rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100"
                            onClick={() => navigate(`/admin/orders/${user.userId}`)}
                        >
                            <button className="text-lg font-semibold" style={{marginTop: '8px'}}>{user.username}</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminOrders;