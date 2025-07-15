import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAllAccounts, searchAccountsByCompetitive, getAccountById } from '../../services/valorant';
import { getCart, addToCart, checkout } from '../../services/cart';

function ValorantAccountUserList() {
    const [accounts, setAccounts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [cartMessage, setCartMessage] = useState('');
    const [cartQuantities, setCartQuantities] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    // Kiểm tra xác thực và vai trò buyer
    const isAuthenticated = () => !!localStorage.getItem('token');
    const isBuyer = () => {
        const role = (localStorage.getItem('role') || '').toLowerCase();
        console.log('Role from localStorage:', role);
        return role === 'buyer';
    };

    useEffect(() => {
        const fetchAccountsAndCart = async () => {
            setLoading(true);
            setError('');
            try {
                // Lấy tham số page
                const params = new URLSearchParams(location.search);
                const pageParam = parseInt(params.get('page') || '0', 10);
                if (isNaN(pageParam)) {
                    setError('Số trang không hợp lệ');
                    setLoading(false);
                    return;
                }
                setPage(pageParam);

                // Lấy danh sách tài khoản
                try {
                    const data = searchTerm
                        ? await searchAccountsByCompetitive(searchTerm, pageParam)
                        : await getAllAccounts(pageParam);
                    console.log('Fetched accounts data:', JSON.stringify(data, null, 2));
                    if (!data || !data.content) {
                        setError('Không tìm thấy tài khoản hoặc định dạng phản hồi không hợp lệ');
                        setAccounts([]);
                        setTotalPages(1);
                    } else {
                        // Lọc tài khoản có status = 'available' (phòng trường hợp backend trả về sai)
                        const validAccounts = data.content
                        .filter(account => account.status?.toLowerCase() === 'available')
                        .map(account => ({
                            ...account,
                            id: account.id || account.accountId,
                            inventoryQuantity: account.inventoryQuantity || 1,
                        }));
                        if (validAccounts.every(account => !account.id || isNaN(account.id))) {
                            console.warn('Tất cả tài khoản có ID không hợp lệ:', validAccounts);
                            setError('Tất cả tài khoản có ID không hợp lệ');
                        }
                        setAccounts(validAccounts);
                        setTotalPages(data.totalPages || 1);
                    }
                } catch (accountErr) {
                    console.error('Lỗi khi tải danh sách tài khoản:', {
                        message: accountErr.message,
                        response: accountErr.response?.data,
                        status: accountErr.response?.status,
                    });
                    setError(accountErr.response?.data?.message || accountErr.message || 'Không thể tải danh sách tài khoản');
                    setAccounts([]);
                    setTotalPages(1);
                    return; // Thoát sớm nếu không tải được danh sách tài khoản
                }

                // Lấy giỏ hàng (chỉ cho người dùng đã đăng nhập)
                if (isAuthenticated()) {
                    try {
                        const cartItems = await getCart();
                        console.log('Fetched cart data:', JSON.stringify(cartItems, null, 2));
                        const quantities = {};
                        cartItems.forEach(item => {
                            if (item.gameId === 1) { // Chỉ tính cho gameId = 1 (Valorant)
                                quantities[item.accountId] = item.quantity || 0;
                            }
                        });
                        setCartQuantities(quantities);
                    } catch (cartErr) {
                        console.warn('Không thể tải giỏ hàng:', {
                            message: cartErr.message,
                            response: cartErr.response?.data,
                            status: cartErr.response?.status,
                        });
                        setCartQuantities({}); // Đặt cartQuantities rỗng nếu lỗi
                    }
                } else {
                    setCartQuantities({}); // Không có giỏ hàng cho khách vãng lai
                }
            } catch (err) {
                // Lỗi chung không mong muốn
                console.error('Lỗi không xác định trong fetchAccountsAndCart:', {
                    message: err.message,
                    response: err.response?.data,
                    status: err.response?.status,
                });
                setError(err.response?.data?.message || err.message || 'Đã xảy ra lỗi không xác định');
            } finally {
                setLoading(false);
            }
        };
        fetchAccountsAndCart();
    }, [location.search, searchTerm]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            navigate(`/valorant-accounts?page=${newPage}`);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/valorant-accounts?page=0`);
        setPage(0);
    };

    const handleAddToCart = async (accountId) => {
        if (!isAuthenticated()) {
            setError('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
            navigate('/login');
            return;
        }
        if (!isBuyer()) {
            setError('Chỉ người mua (buyer) mới có thể thêm vào giỏ hàng');
            return;
        }

        setError('');
        setCartMessage('');
        try {
            // Lấy thông tin tài khoản để kiểm tra inventoryQuantity
            const account = await getAccountById(accountId);
            const inventoryQuantity = account.inventoryQuantity || 1;

            // Kiểm tra số lượng hiện tại trong giỏ hàng
            const currentQuantity = cartQuantities[accountId] || 0;

            // Kiểm tra nếu tổng số lượng sẽ vượt quá tồn kho
            if (currentQuantity + 1 > inventoryQuantity) {
                setError(`Không thể thêm vào giỏ hàng: Chỉ còn ${inventoryQuantity} sản phẩm trong kho`);
                return;
            }

            // Thêm vào giỏ hàng
            await addToCart(1, accountId, 1);
            setCartMessage(`Tài khoản ${accountId} đã được thêm vào giỏ hàng thành công`);
            setTimeout(() => setCartMessage(''), 3000);

            // Cập nhật cartQuantities
            setCartQuantities(prev => ({
                ...prev,
                [accountId]: (prev[accountId] || 0) + 1,
            }));
        } catch (err) {
            console.error('Lỗi khi thêm vào giỏ hàng:', {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status,
            });
            setError(err.response?.data?.message || err.message || 'Không thể thêm vào giỏ hàng');
        }
    };

    return (
    <div className="container py-4">
        <h2 className="mb-4 fw-bold">Tài khoản Valorant</h2>

        {cartMessage && <p className="text-success mb-3">{cartMessage}</p>}
        {error && <p className="text-danger mb-3">{error}</p>}

        <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
            <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm theo hạng cạnh tranh..."
            className="form-control"
            />
            <button type="submit" className="btn btn-primary">
            Tìm kiếm
            </button>
        </div>
        </form>

        {loading && <p className="text-muted">Đang tải...</p>}

        {accounts.length === 0 && !error && !loading ? (
        <p className="text-muted">Không tìm thấy tài khoản.</p>
        ) : (
        <div className="custom-5-cols py-4">
        {accounts.map(account => (
            <div className="custom-col card p-3" key={account.id}>
            <img src={account.image || './images/acc1.png'} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">ID: {account.id}</h5>
                <p className="card-text">Hạng: {account.competitive}</p>
                <p className="card-text">Số lượng Agents: {account.numberOfAgents}</p>
                <p className="card-text">Số lượng Skins: {account.numberOfWeaponSkins}</p>
                <p className="card-text">Giá: ${account.price}</p>
                <p className="card-text">Trạng thái: {account.status}</p>
                <p className="card-text">Tồn kho: {account.inventoryQuantity}</p>

                <div className="d-flex justify-content-between">
                <button className="btn btn-primary btn-sm" onClick={() => navigate(`/valorant-accounts/${account.id}`)}>
                    Xem chi tiết
                </button>
                <button className="btn btn-success btn-sm" onClick={() => handleAddToCart(account.id)}>
                    Thêm vào giỏ
                </button>
                </div>
            </div>
            </div>
        ))}
        </div>


        )}

        <div className="d-flex justify-content-between align-items-center mt-4">
        <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 0}
            className="btn btn-outline-secondary"
        >
            Trang trước
        </button>
        <span>Trang {page + 1} / {totalPages}</span>
        <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages - 1}
            className="btn btn-outline-secondary"
        >
            Trang sau
        </button>
        </div>
    </div>
    );
}

export default ValorantAccountUserList;