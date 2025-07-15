import api from './api';

export const getOrders = async () => {
    try {
        const response = await api.get('/orders');
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Failed to fetch orders';
    }
};

export const getOrdersByUserId = async (userId) => {
    try {
        const response = await api.get(`/orders/${userId}`);
        console.log('Get orders by userId response:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('Error fetching orders by userId:', error.response?.data, error.message);
        throw error.response?.data || 'Failed to fetch orders';
    }
};

export const getAllOrders = async () => {
    try {
        const response = await api.get('/admin/orders');
        console.log('Get all orders response:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('Error fetching all orders:', error.response?.data, error.message);
        throw error.response?.data || 'Failed to fetch orders';
    }
};

export const getUsersWithOrders = async () => {
    try {
        const response = await api.get('/admin/users-with-orders');
        console.log('Get users with orders response:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('Error fetching users with orders:', error.response?.data, error.message);
        throw error.response?.data || 'Failed to fetch users with orders';
    }
};