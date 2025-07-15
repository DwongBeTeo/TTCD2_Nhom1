import api from './api';

export const getCart = async () => {
    try {
        const response = await api.get('/cart');
        console.log('Get cart response:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('Error fetching cart:', error.response?.data, error.message);
        throw error.response?.data || 'Failed to fetch cart';
    }
};

export const addToCart = async (gameId, accountId, quantity) => {
    try {
        const response = await api.post('/cart', { gameId, accountId, quantity });
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Failed to add to cart';
    }
};

export const checkout = async (userId, items) => {
    try {
        console.log('Sending checkout request:', JSON.stringify({ userId, items }, null, 2));
        if (!items || !Array.isArray(items)) {
            throw new Error('Invalid items data');
        }
        const response = await api.post('/checkout', { userId, items });
        console.log('Checkout API response:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('Error during checkout:', error.response?.data, error.message);
        throw error.response?.data || 'Failed to checkout';
    }
};

export const updateCartQuantity = async (gameId, accountId, quantity) => {
    try {
        const response = await api.put(`/cart/${gameId}/${accountId}`, { quantity });
        return response.data;
    } catch (error) {
        throw error.response?.data || 'No more product in stock';
    }
};

export const deleteCartItem = async (gameId, accountId) => {
    try {
        const response = await api.delete(`/cart/${gameId}/${accountId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Failed to remove item from cart';
    }
};