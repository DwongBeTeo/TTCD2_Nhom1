import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllAccountsForAdmin, searchAccountsByCompetitive } from '../../services/valorant';
import LogoutButton from '../LogoutButton';
import DeleteButton from './DeleteButton';

function ValorantAccountAdminList() {
    const [accounts, setAccounts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccounts = async () => {
            setLoading(true);
            try {
                const data = await getAllAccountsForAdmin(page, searchTerm);
                setAccounts(data.content || []);
                setTotalPages(data.totalPages || 1);
            } catch (err) {
                setError(err.message || 'Failed to fetch accounts admin list');
            } finally {
                setLoading(false);
            }
        };
        fetchAccounts();
    }, [page, searchTerm]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(0);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Valorant Accounts</h2>
                <div className="space-x-2">
                    <button
                        onClick={() => navigate('/admin/valorant-accounts/new')}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                        Add New Account
                    </button>
                </div>
            </div>
            <form onSubmit={handleSearch} className="mb-6">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by competitive rank..."
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Search
                    </button>
                </div>
            </form>
            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {accounts.length === 0 ? (
                <p className="text-gray-500">No accounts found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-black rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">ID</th>
                                <th className="px-4 py-2 text-left">Username</th>
                                <th className="px-4 py-2 text-left">Rank</th>
                                <th className="px-4 py-2 text-left">Agents</th>
                                <th className="px-4 py-2 text-left">Skins</th>
                                <th className="px-4 py-2 text-left">Price</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map((account) => (
                                <tr key={account.id} className="border-t">
                                    <td className="px-4 py-2">{account.id}</td>
                                    <td className="px-4 py-2">{account.usernameValorant}</td>
                                    <td className="px-4 py-2">{account.competitive}</td>
                                    <td className="px-4 py-2">{account.numberOfAgents}</td>
                                    <td className="px-4 py-2">{account.numberOfWeaponSkins}</td>
                                    <td className="px-4 py-2">${account.price}</td>
                                    <td className="px-4 py-2">{account.status}</td>
                                    <td className="px-4 py-2">  {account.inventoryQuantity}</td>
                                    <td className="px-4 py-2 space-x-2">
                                        {/* <button
                                            onClick={() => navigate(`/valorant-accounts/${account.id}`)}
                                            className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                                        >
                                            View
                                        </button> */}
                                        <button
                                            onClick={() => navigate(`/admin/valorant-accounts/edit/${account.id}`)}
                                            className="bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700"
                                        >
                                            Edit
                                        </button>
                                        <DeleteButton accountId={account.id} setAccounts={setAccounts} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 0}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span>Page {page + 1} of {totalPages}</span>
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages - 1}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ValorantAccountAdminList;