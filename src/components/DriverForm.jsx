// DriverForm.jsx
import { useState } from 'react';
import driverService from '@/services/api/driverService';
import toast from 'react-hot-toast';

export default function DriverForm({ existingDriver, onSuccess }) {
  const [formData, setFormData] = useState({
    name: existingDriver?.name || '',
    email: existingDriver?.email || '',
    phone: existingDriver?.phone || '',
    vehicle_number: existingDriver?.vehicle_number || '',
    is_available: existingDriver?.is_available || true
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let response;
      
      if (existingDriver) {
        // UPDATE existing driver
        response = await driverService.updateDriver(existingDriver.id, formData);
        toast.success('Driver updated successfully!');
      } else {
        // CREATE new driver
        response = await driverService.createDriver(formData);
        toast.success('Driver created successfully!');
      }
      
      if (response.success) {
        onSuccess?.();
        // Reset form if creating new
        if (!existingDriver) {
          setFormData({
            name: '',
            email: '',
            phone: '',
            vehicle_number: '',
            is_available: true
          });
        }
      }
    } catch (error) {
      if (error.response?.status === 409) {
        // Driver already exists
        toast.error(error.response?.data?.message);
        // Ask user if they want to update
        if (confirm('Driver already exists! Do you want to update it?')) {
          const existingId = error.response?.data?.existingDriverId;
          if (existingId) {
            const updateResponse = await driverService.updateDriver(existingId, formData);
            if (updateResponse.success) {
              toast.success('Driver updated successfully!');
              onSuccess?.();
            }
          }
        }
      } else {
        toast.error('Failed to save driver');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300">Name *</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
          disabled={!!existingDriver}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300">Phone *</label>
        <input
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300">Vehicle Number *</label>
        <input
          type="text"
          required
          value={formData.vehicle_number}
          onChange={(e) => setFormData({...formData, vehicle_number: e.target.value})}
          className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
        />
      </div>
      
      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.is_available}
            onChange={(e) => setFormData({...formData, is_available: e.target.checked})}
            className="w-4 h-4"
          />
          <span className="text-sm font-medium text-gray-300">Available for delivery</span>
        </label>
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? 'Saving...' : (existingDriver ? 'Update Driver' : 'Create Driver')}
      </button>
    </form>
  );
}