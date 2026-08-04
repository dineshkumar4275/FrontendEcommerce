// frontend/app/my-address/page.js
'use client';

import { useState } from 'react';
import { useAddress } from '../../hooks/useAddress';
import { AddressForm } from '../../components/address/AddressForm';
import { AddressSkeleton } from '../../components/address/AddressSkeleton';

export default function MyAddressPage() {
    const {
        address,
        loading,
        saving,
        hasAddress,
        updateAddress,
        deleteAddress
    } = useAddress();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (data) => {
        setIsSubmitting(true);
        const success = await updateAddress(data);
        setIsSubmitting(false);
        return success;
    };

    const handleDelete = async () => {
        await deleteAddress();
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-3xl">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    My Delivery Address
                </h1>
                <AddressSkeleton />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {hasAddress ? 'My Delivery Address' : 'Add Delivery Address'}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
                {hasAddress 
                    ? 'Update your delivery address' 
                    : 'Add your delivery address for faster checkout'}
            </p>

            <AddressForm
                initialData={address || {}}
                onSubmit={handleSubmit}
                onDelete={hasAddress ? handleDelete : null}
                loading={saving || isSubmitting}
            />
        </div>
    );
}