// frontend/utils/api.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

export const addressAPI = {
    /**
     * GET /api/address - Get user's address
     */
    get: async () => {
        const response = await fetch(`${API_URL}/address`, {
            headers: getHeaders()
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch address');
        }
        return response.json();
    },

    /**
     * PUT /api/address - Update user's address
     */
    update: async (data) => {
        const response = await fetch(`${API_URL}/address`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update address');
        }
        return response.json();
    },

    /**
     * DELETE /api/address - Delete user's address
     */
    delete: async () => {
        const response = await fetch(`${API_URL}/address`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to delete address');
        }
        return response.json();
    }
};