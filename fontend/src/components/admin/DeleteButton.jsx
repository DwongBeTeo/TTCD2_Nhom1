import { useState } from 'react';
import { deleteAccount } from '../../services/valorant';

function DeleteButton({ accountId, setAccounts }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this account?')) {
            setLoading(true);
            try {
                await deleteAccount(accountId);
                setAccounts((prev) => prev.filter((account) => account.id !== accountId));
            } catch (error) {
                alert(error.message || 'Failed to delete account');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 disabled:opacity-50"
        >
            {loading ? 'Deleting...' : 'Delete'}
        </button>
    );
}

export default DeleteButton;