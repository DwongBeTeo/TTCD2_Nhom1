import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { getCart, updateCartQuantity, deleteCartItem, checkout } from '../services/cart';
import LogoutButton from './LogoutButton';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            if (!user.token || user.role !== 'buyer') {
                setError('Vui lòng đăng nhập với vai trò buyer để xem giỏ hàng');
                navigate('/login');
                return;
            }

            setLoading(true);
            setError('');
            setSuccess('');
            try {
                const data = await getCart();
                console.log('Cart API response:', JSON.stringify(data, null, 2));
                setCartItems(data.items || []);
                setTotal(data.total || 0);
            } catch (err) {
                setError(err.message || 'Không thể tải giỏ hàng');
                setCartItems([]);
                setTotal(0);
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, [user, navigate]);

    const handleUpdateQuantity = async (gameId, accountId, currentQuantity, delta) => {
        const newQuantity = currentQuantity + delta;
        if (newQuantity < 1) {
            setError('Số lượng không thể nhỏ hơn 1');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const cartItem = cartItems.find(item => item.gameId === gameId && item.accountId === accountId);
            if (newQuantity > cartItem.inventoryQuantity) {
                setError(`Số lượng không thể vượt quá tồn kho (${cartItem.inventoryQuantity})`);
                setLoading(false);
                return;
            }
            await updateCartQuantity(gameId, accountId, newQuantity);
            const data = await getCart();
            setCartItems(data.items || []);
            setTotal(data.total || 0);
            setSuccess('Cập nhật số lượng thành công');
        } catch (err) {
            setError(err.message || 'Không thể cập nhật số lượng');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteItem = async (gameId, accountId) => {
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            await deleteCartItem(gameId, accountId);
            const data = await getCart();
            setCartItems(data.items || []);
            setTotal(data.total || 0);
            setSuccess('Xóa sản phẩm thành công');
        } catch (err) {
            setError(err.message || 'Không thể xóa sản phẩm');
        } finally {
            setLoading(false);
        }
    };


    const handleCheckout = async () => {
        if (!window.confirm('Bạn có chắc muốn thanh toán?')) {
            return;
        }
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            if (!user.userId || isNaN(user.userId)) {
                throw new Error('Invalid userId: ' + user.userId);
            }
            if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
                throw new Error('Giỏ hàng trống hoặc dữ liệu không hợp lệ');
            }
            // KHÔNG có bất kỳ dòng nào sử dụng 'items' trước dòng này
            const items = cartItems.map(item => ({
                cartId: item.cartId,
                gameId: item.gameId,
                accountId: item.accountId,
                quantity: item.quantity,
                price: item.price,
                gameName: 'Valorant',
                description: item.description || 'Tài khoản Valorant'
            }));
            await checkout(user.userId, items);
            setCartItems([]);
            setTotal(0);
            alert('Thanh toán thành công');
            navigate('/orders');
        } catch (err) {
            console.error('Checkout error:', err);
            alert(err.message || 'Thanh toán thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Giỏ hàng</h2>
            <div className="space-x-2">
                <button
                    onClick={() => navigate('/valorant-accounts')}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                    Back
                </button>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            {loading && <p className="text-gray-500 mb-4">Đang tải...</p>}
            
            <h3 className="text-xl font-semibold mt-6 mb-2">Sản phẩm trong giỏ</h3>
            {cartItems.length === 0 ? (
                <p className="text-gray-500">Giỏ hàng trống.</p>
            ) : (
                <div className="space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.cartId} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                            <div>
                                <p className="font-medium">Tài khoản ID: {item.accountId}</p>
                                <p className="text-gray-600">Giá: ${item.price.toFixed(2)}</p>
                                <p className="text-gray-600">Số lượng: {item.quantity}</p>
                                <p className="text-gray-600">Thành tiền: ${(item.quantity * item.price).toFixed(2)}</p>
                                {/* <p className="text-gray-500 text-sm">
                                    Tồn kho: {item.inventoryQuantity || 'Không xác định'}
                                </p> */}
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleUpdateQuantity(item.gameId, item.accountId, item.quantity, -1)}
                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition disabled:bg-gray-400"
                                    disabled={item.quantity <= 1 || loading}
                                >
                                    -
                                </button>
                                <span className="px-4 py-1 bg-gray-200 rounded">{item.quantity}</span>
                                <button
                                    onClick={() => handleUpdateQuantity(item.gameId, item.accountId, item.quantity, 1)}
                                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition disabled:bg-gray-400"
                                    disabled={item.quantity >= (item.inventoryQuantity || 1) || loading}
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => handleDeleteItem(item.gameId, item.accountId)}
                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition disabled:bg-gray-400"
                                    disabled={loading}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                        <p className="text-xl font-bold">Tổng tiền: ${total.toFixed(2)}</p>
                    </div>
                </div>
            )}
            {cartItems.length > 0 && (
                <button
                    onClick={handleCheckout}
                    className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
                    disabled={loading}
                >
                    Thanh toán
                </button>
            )}
        </div>
    );
}

export default Cart;