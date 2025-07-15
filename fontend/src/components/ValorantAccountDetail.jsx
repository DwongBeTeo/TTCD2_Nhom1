import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAccountById } from '../services/valorant';
import LogoutButton from './LogoutButton';

function ValorantAccountDetail() {
    const [account, setAccount] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccount = async () => {
            setLoading(true);
            try {
                const data = await getAccountById(id);
                setAccount(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch account');
            } finally {
                setLoading(false);
            }
        };
        fetchAccount();
    }, [id]);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Account Details</h2>
                <div className="space-x-2">
                    <button
                        onClick={() => navigate('/valorant-accounts')}
                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                    >
                        Back
                    </button>
                    <LogoutButton />
                </div>
            </div>
            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {account ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Account #{account.accountId}</h3>
                    <p className="text-gray-600"><strong>Username:</strong> {account.usernameValorant}</p>
                    <p className="text-gray-600"><strong>Email:</strong> {account.emailValorant}</p>
                    <p className="text-gray-600"><strong>Competitive Rank:</strong> {account.competitive}</p>
                    <p className="text-gray-600"><strong>Number of Agents:</strong> {account.numberOfAgents}</p>
                    <p className="text-gray-600"><strong>Number of Weapon Skins:</strong> {account.numberOfWeaponSkins}</p>
                    <p className="text-gray-600"><strong>Price:</strong> ${account.price}</p>
                    <p className="text-gray-600"><strong>Status:</strong> {account.status}</p>
                    <p className="text-gray-600"><strong>Inventory Quantity:</strong> {account.inventoryQuantity}</p>
                    <p className="text-gray-600"><strong>Description:</strong> {account.description || 'N/A'}</p>
                </div>
            ) : (
                <p className="text-gray-500">No account found.</p>
            )}
        </div>
    );
}

export default ValorantAccountDetail;