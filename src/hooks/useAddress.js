// frontend/hooks/useAddress.js
import { useState, useEffect, useCallback } from 'react';
import { addressAPI } from '../utils/api';
import toast from 'react-hot-toast';

export const useAddress = () => {
    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [hasAddress, setHasAddress] = useState(false);

    /**
     * Fetch user's address
     */
    const fetchAddress = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Check if token exists
            const token = localStorage.getItem('token');
            if (!token) {
                // Try to load from localStorage
                const localAddress = localStorage.getItem('userAddress');
                if (localAddress) {
                    try {
                        const parsed = JSON.parse(localAddress);
                        setAddress(parsed);
                        setHasAddress(true);
                    } catch (e) {
                        console.error('Error parsing local address:', e);
                    }
                }
                setLoading(false);
                return;
            }

            const result = await addressAPI.get();
            if (result.success) {
                setAddress(result.data);
                setHasAddress(result.data?.has_address || false);
                // Save to localStorage as backup
                if (result.data?.has_address) {
                    localStorage.setItem('userAddress', JSON.stringify(result.data));
                }
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError(err.message);
            // Try to load from localStorage as fallback
            const localAddress = localStorage.getItem('userAddress');
            if (localAddress) {
                try {
                    const parsed = JSON.parse(localAddress);
                    setAddress(parsed);
                    setHasAddress(true);
                } catch (e) {
                    console.error('Error parsing local address:', e);
                }
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAddress();
    }, [fetchAddress]);

    /**
     * Update user's address
     */
    const updateAddress = async (data) => {
        setSaving(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                // Save to localStorage only if no token
                localStorage.setItem('userAddress', JSON.stringify(data));
                setAddress(data);
                setHasAddress(true);
                toast.success('Address saved locally!');
                setSaving(false);
                return true;
            }

            const result = await addressAPI.update(data);
            if (result.success) {
                setAddress(result.data);
                setHasAddress(true);
                localStorage.setItem('userAddress', JSON.stringify(result.data));
                toast.success('Address saved successfully! 🎉');
                return true;
            } else {
                setError(result.message);
                toast.error(result.message || 'Failed to save address');
                return false;
            }
        } catch (err) {
            setError(err.message);
            toast.error(err.message || 'Failed to save address');
            return false;
        } finally {
            setSaving(false);
        }
    };

    /**
     * Delete user's address
     */
    const deleteAddress = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                localStorage.removeItem('userAddress');
                setAddress(null);
                setHasAddress(false);
                toast.success('Address deleted locally');
                setSaving(false);
                return true;
            }

            const result = await addressAPI.delete();
            if (result.success) {
                localStorage.removeItem('userAddress');
                setAddress(null);
                setHasAddress(false);
                toast.success('Address deleted successfully');
                return true;
            } else {
                toast.error(result.message || 'Failed to delete address');
                return false;
            }
        } catch (err) {
            toast.error(err.message || 'Failed to delete address');
            return false;
        } finally {
            setSaving(false);
        }
    };

    return {
        address,
        loading,
        saving,
        error,
        hasAddress,
        fetchAddress,
        updateAddress,
        deleteAddress
    };
};