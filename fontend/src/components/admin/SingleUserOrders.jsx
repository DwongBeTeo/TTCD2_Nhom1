import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import { getOrdersByUserId } from '../../services/orders';
// import LogoutButton from '../LogoutButton'; // Adjust the import path as necessary

function SingleUserOrders() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const { userId } = useParams();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState({});

    const togglePassword = (orderDetailId) => {
        setShowPassword((prev) => ({ ...prev, [orderDetailId]: !prev[orderDetailId] }));
    };

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user.token || user.role !== 'admin') {
                setError('Vui lòng đăng nhập với vai trò admin để xem đơn hàng');
                navigate('/login');
                return;
            }

            setLoading(true);
            setError('');
            try {
                const data = await getOrdersByUserId(userId);
                setOrders(data);
            } catch (err) {
                setError(err.message || 'Không thể tải danh sách đơn hàng');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [user, userId, navigate]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Đơn hàng của khách hàng (ID: {userId})</h2>
            <div className="space-x-2">
                <button
                    onClick={() => navigate('/admin/users-with-orders')}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                    Back
                </button>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {loading && <p className="text-gray-500 mb-4">Đang tải...</p>}
            {orders.length === 0 ? (
                <p className="text-gray-500">Không có đơn hàng nào.</p>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.orderId} className="p-4 border rounded-lg bg-gray-50">
                            <h3 className="text-lg font-semibold">Đơn hàng #{order.orderId}</h3>
                            <p className="text-gray-600">Người mua: {order.username} (ID: {order.userId})</p>
                            <p className="text-gray-600">Tổng tiền: ${order.totalPrice.toFixed(2)}</p>
                            <p className="text-gray-600">Trạng thái: {order.orderStatus}</p>
                            <p className="text-gray-600">Ngày tạo: {new Date(order.createdAt).toLocaleString()}</p>
                            <h4 className="text-md font-semibold mt-2">Chi tiết đơn hàng:</h4>
                            <ul className="list-disc pl-5">
                                {order.orderDetails.map((detail) => (
                                    <li key={detail.orderDetailId} className="text-gray-600">
                                        <p>{detail.gameName} - Tài khoản ID: {detail.accountId}</p>
                                        <p>Số lượng: {detail.quantity} - Giá: ${detail.price.toFixed(2)}</p>
                                        <p>Tài khoản Valorant: {detail.usernameValorant}</p>
                                        <p>
                                            Mật khẩu: {showPassword[detail.orderDetailId] ? detail.passwordValorant : '********'}
                                            <button
                                                onClick={() => togglePassword(detail.orderDetailId)}
                                                className="ml-2 text-blue-600 hover:underline"
                                            >
                                                {showPassword[detail.orderDetailId] ? 'Ẩn' : 'Hiện'}
                                            </button>
                                        </p>
                                        {detail.description && <p>Mô tả: {detail.description}</p>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SingleUserOrders;