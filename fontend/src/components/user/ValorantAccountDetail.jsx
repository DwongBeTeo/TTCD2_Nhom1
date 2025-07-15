import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAccountById } from '../../services/valorant';
import LogoutButton from '../LogoutButton';

function ValorantAccountDetail() {
    const [account, setAccount] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');

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
                    {isAuthenticated && <LogoutButton />}
                </div>
            </div>
            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {account ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <img src={account.image || '../../../images/acc1.png'} className="card-img" alt="..." />
                    <h3 className="text-black font-semibold mb-4" style={{"fontWeight": "bolder"}}>Account #{account.id}</h3>
                    <p className="text-black"><strong>Competitive Rank:</strong> {account.competitive}</p>
                    <p className="text-black"><strong>Number of Agents:</strong> {account.numberOfAgents}</p>
                    <p className="text-black"><strong>Number of Weapon Skins:</strong> {account.numberOfWeaponSkins}</p>
                    <p className="text-black"><strong>Price:</strong> ${account.price}</p>
                    {/* <p className="text-black"><strong>Status:</strong> {account.status}</p> */}
                    {/* <p className="text-black"><strong>Inventory Quantity:</strong> {account.inventoryQuantity}</p> */}
                    <p className="text-black"><strong>Description:</strong> {account.description || 'N/A'}</p>
                </div>
            ) : (
                <p className="text-black">No account found.</p>
            )}
        </div>
    );
}

export default ValorantAccountDetail;