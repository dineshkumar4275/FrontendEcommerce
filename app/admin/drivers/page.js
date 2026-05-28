'use client';

import { useState, useEffect } from 'react';
import { 
  PlusIcon, PencilIcon, TrashIcon, TruckIcon,
  PhoneIcon, EnvelopeIcon 
} from '@heroicons/react/24/outline';
import apiClient from '@/lib/apiClient';
import toast from 'react-hot-toast';

export default function AdminDriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle_number: '',
    vehicle_type: 'bike',
    is_available: true
  });

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      // Use /drivers/all endpoint
      const response = await apiClient.get('/drivers/all');
      console.log('Drivers response:', response.data);
      
      if (response.data.success) {
        setDrivers(response.data.data || []);
      } else {
        setDrivers([]);
      }
    } catch (error) {
      console.error('Error fetching drivers:', error);
      toast.error('Failed to load drivers');
      setDrivers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingDriver) {
        await apiClient.put(`/drivers/${editingDriver.id}`, formData);
        toast.success('Driver updated successfully');
      } else {
        await apiClient.post('/drivers', formData);
        toast.success('Driver added successfully');
      }
      setShowModal(false);
      setEditingDriver(null);
      resetForm();
      fetchDrivers();
    } catch (error) {
      console.error('Error saving driver:', error);
      toast.error(error.response?.data?.message || 'Failed to save driver');
    }
  };

  const handleDelete = async (id, name) => {
    if (confirm(`Delete "${name}"?`)) {
      try {
        await apiClient.delete(`/drivers/${id}`);
        toast.success('Driver deleted successfully');
        fetchDrivers();
      } catch (error) {
        toast.error('Failed to delete driver');
      }
    }
  };

  const handleEdit = (driver) => {
    setEditingDriver(driver);
    setFormData({
      name: driver.name || '',
      email: driver.email || '',
      phone: driver.phone || '',
      vehicle_number: driver.vehicle_number || '',
      vehicle_type: driver.vehicle_type || 'bike',
      is_available: driver.is_available === true
    });
    setShowModal(true);
  };

  const handleToggleStatus = async (driver) => {
    try {
      const newStatus = !driver.is_available;
      await apiClient.patch(`/drivers/status/${driver.id}`, { is_active: newStatus });
      toast.success(newStatus ? 'Driver is now online' : 'Driver is now offline');
      fetchDrivers();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      vehicle_number: '',
      vehicle_type: 'bike',
      is_available: true
    });
  };

  const activeCount = drivers.filter(d => d.is_available === true).length;
  const inactiveCount = drivers.filter(d => d.is_available === false).length;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Drivers Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage delivery drivers</p>
        </div>
        <button
          onClick={() => {
            setEditingDriver(null);
            resetForm();
            setShowModal(true);
          }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add Driver
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Drivers</p>
              <p className="text-2xl font-bold text-gray-800">{drivers.length}</p>
            </div>
            <TruckIcon className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active (Online)</p>
              <p className="text-2xl font-bold text-green-600">{activeCount}</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Inactive (Offline)</p>
              <p className="text-2xl font-bold text-red-600">{inactiveCount}</p>
            </div>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Drivers Table */}
      {drivers.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <div className="text-6xl mb-4">🚚</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No drivers yet</h3>
          <p className="text-gray-500 mb-6">Add your first driver</p>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition"
          >
            Add Driver
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Driver</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {drivers.map((driver) => (
                  <tr key={driver.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-500">#{driver.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {driver.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="font-medium text-gray-800">{driver.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <PhoneIcon className="h-3 w-3" />
                          {driver.phone || '—'}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <EnvelopeIcon className="h-3 w-3" />
                          {driver.email || '—'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{driver.vehicle_number || '—'}</p>
                        <p className="text-xs text-gray-500 capitalize">{driver.vehicle_type}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          driver.is_available 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {driver.is_available ? 'Online' : 'Offline'}
                        </span>
                        <button
                          onClick={() => handleToggleStatus(driver)}
                          className={`text-xs px-2 py-1 rounded ${
                            driver.is_available 
                              ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                              : 'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                        >
                          {driver.is_available ? 'Set Offline' : 'Set Online'}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(driver)}
                          className="text-blue-600 hover:text-blue-800 transition"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(driver.id, driver.name)}
                          className="text-red-600 hover:text-red-800 transition"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal remains the same */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">
              {editingDriver ? 'Edit Driver' : 'Add New Driver'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Vehicle Number</label>
                <input
                  type="text"
                  name="vehicle_number"
                  value={formData.vehicle_number}
                  onChange={(e) => setFormData({...formData, vehicle_number: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="MH 01 AB 1234"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Vehicle Type</label>
                <select
                  name="vehicle_type"
                  value={formData.vehicle_type}
                  onChange={(e) => setFormData({...formData, vehicle_type: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="bike">Bike</option>
                  <option value="scooter">Scooter</option>
                  <option value="car">Car</option>
                  <option value="truck">Truck</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="is_available"
                  checked={formData.is_available}
                  onChange={(e) => setFormData({...formData, is_available: e.target.checked})}
                  className="w-4 h-4 text-purple-600 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">Active / Available</label>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingDriver(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:shadow-lg"
                >
                  {editingDriver ? 'Update Driver' : 'Add Driver'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}