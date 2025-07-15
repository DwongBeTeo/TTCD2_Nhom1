import api from './api';

export const getAccountById = async (id) => {
    try {
        if (!id || isNaN(id)) {
            throw new Error('Invalid account ID');
        }
        console.log(`Fetching account with ID: ${id}`);
        const response = await api.get(`/valorant-accounts/${id}`, {
            headers: { 'Cache-Control': 'no-cache' },
        });
        console.log('Response status:', response.status);
        console.log('Response data:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('Error fetching account:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
            config: error.config,
        });
        throw error.response?.data?.message || error.message || 'Failed to fetch account';
    }
};

export const getAllAccounts = async (page = 0) => {
    try {
        console.log(`Fetching accounts, page: ${page}`);
        const response = await api.get(`/valorant-accounts?page=${page}`, {
            headers: { 'Cache-Control': 'no-cache' },
        });
        console.log('Response status:', response.status);
        console.log('Response data:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('Error fetching accounts:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
            config: error.config,
        });
        throw error.response?.data?.message || error.message || 'Failed to fetch accounts';
    }
};

export const createAccount = async (account) => {
    try {
        const response = await api.post('/valorant-accounts', account);
        return response.data;
    } catch (error) {
        console.error('Error creating account:', error.response?.status, error.response?.data);
        throw error.response?.data?.message || 'Failed to create account';
    }
};

export const updateAccount = async (id, account) => {
    try {
        const response = await api.put(`/valorant-accounts/${id}`, account);
        return response.data;
    } catch (error) {
        console.error('Error updating account:', error.response?.status, error.response?.data);
        throw error.response?.data?.message || 'Failed to update account';
    }
};

export const deleteAccount = async (id) => {
    try {
        const response = await api.delete(`/valorant-accounts/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting account:', error.response?.status, error.response?.data);
        throw error.response?.data?.message || 'Failed to delete account';
    }
};

export const searchAccountsByCompetitive = async (competitive, page = 0) => {
    try {
        if (!competitive || competitive.trim() === '') {
            throw new Error('Vui lòng nhập hạng để tìm kiếm');
        }
        console.log(`Searching accounts, competitive: ${competitive}, page: ${page}`);
        const response = await api.get(`/valorant-accounts/search?competitive=${encodeURIComponent(competitive.toLowerCase())}&page=${page}`, {
            headers: { 'Cache-Control': 'no-cache' },
        });
        console.log('Search accounts response:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('Error searching accounts:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
            config: error.config,
        });
        throw error.response?.data?.message || error.message || 'Failed to search accounts';
    }
};

export const getAllAccountsForAdmin = async (page = 0, keyword='') => {
    try {
        const response = await api.get(`/valorant-accounts/admin?page=${page}`, {
            params: { page, keyword: keyword.trim() },
            headers: { 'Cache-Control': 'no-cache' },
        });
        console.log('Get all admin accounts response:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('Error fetching admin accounts:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
        });
        throw error.response?.data?.message || error.message || 'Failed to fetch admin accounts';
    }
};