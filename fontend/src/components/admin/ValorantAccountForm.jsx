import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createAccount, updateAccount, getAccountById } from '../../services/valorant';

function ValorantAccountForm() {
    const [form, setForm] = useState({
        usernameValorant: '',
        passwordValorant: '',
        emailValorant: '',
        competitive: '',
        numberOfAgents: '',
        numberOfWeaponSkins: '',
        price: '',
        description: '',
        status: '',
        inventoryQuantity: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchAccount = async () => {
                setLoading(true);
                try {
                    const data = await getAccountById(id);
                    setForm(data);
                } catch (err) {
                    setError(err.message || 'Failed to fetch account');
                } finally {
                    setLoading(false);
                }
            };
            fetchAccount();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (id) {
                await updateAccount(id, form);
            } else {
                await createAccount(form);
            }
            navigate('/admin/valorant-accounts');
        } catch (err) {
            setError(err.message || 'Failed to save account');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">{id ? 'Edit Account' : 'Add New Account'}</h2>
            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        value={form.usernameValorant}
                        onChange={(e) => setForm({ ...form, usernameValorant: e.target.value })}
                        className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="text"
                        value={form.passwordValorant}
                        onChange={(e) => setForm({ ...form, passwordValorant: e.target.value })}
                        className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={form.emailValorant}
                        onChange={(e) => setForm({ ...form, emailValorant: e.target.value })}
                        className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Competitive Rank</label>
                    <input
                        type="text"
                        value={form.competitive}
                        onChange={(e) => setForm({ ...form, competitive: e.target.value })}
                        className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Number of Agents</label>
                    <input
                        type="number"
                        value={form.numberOfAgents}
                        onChange={(e) => setForm({ ...form, numberOfAgents: e.target.value })}
                        className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Number of Weapon Skins</label>
                    <input
                        type="number"
                        value={form.numberOfWeaponSkins}
                        onChange={(e) => setForm({ ...form, numberOfWeaponSkins: e.target.value })}
                        className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        value={form.status} // 👈 mặc định là available
                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                        className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">-- Select status --</option>
                        <option value="available">Available</option>
                        <option value="sold">Sold</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Inventory Quantity</label>
                    <input
                        type="number"
                        value={form.inventoryQuantity}
                        onChange={(e) => setForm({ ...form, inventoryQuantity: e.target.value })}
                        className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="flex space-x-2">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        {id ? 'Update' : 'Create'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/admin/valorant-accounts')}
                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ValorantAccountForm;