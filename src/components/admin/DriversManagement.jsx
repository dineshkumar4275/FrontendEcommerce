'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlusIcon, 
  PencilIcon, 
  TrashIcon,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  MagnifyingGlassIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import driverService from '@/services/driverService';
import toast from 'react-hot-toast';

export default function DriversManagement() {
  const [drivers, setDrivers] = useState([]);
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingDriver, setEditingDriver] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle_number: '',
    vehicle_type: 'bike'
  });

  useEffect(() => {
    fetchDrivers();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = drivers.filter(driver => 
        driver.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        driver.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        driver.phone?.includes(searchQuery) ||
        driver.vehicle_number?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDrivers(filtered);
    } else {
      setFilteredDrivers(drivers);
    }
  }, [searchQuery, drivers]);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const response = await driverService.getAllDrivers();
      if (response.success) {
        setDrivers(response.data);
        setFilteredDrivers(response.data);
      }
    } catch (error) {
      console.error('Error fetching drivers:', error);
      toast.error('Failed to load drivers');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingDriver) {
        await driverService.updateDriver(editingDriver.id, formData);
        toast.success('Driver updated successfully');
      } else {
        await driverService.createDriver(formData);
        toast.success('Driver added successfully');
      }
      setShowModal(false);
      setEditingDriver(null);
      setFormData({ name: '', email: '', phone: '', vehicle_number: '', vehicle_type: 'bike' });
      fetchDrivers();
    } catch (error) {
      toast.error('Failed to save driver');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this driver?')) {
      try {
        await driverService.deleteDriver(id);
        toast.success('Driver deleted successfully');
        fetchDrivers();
      } catch (error) {
        toast.error('Failed to delete driver');
      }
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      await driverService.updateDriverStatus(id, !currentStatus);
      toast.success(`Driver ${!currentStatus ? 'activated' : 'deactivated'}`);
      fetchDrivers();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Drivers Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage delivery drivers</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search drivers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border rounded-lg w-full sm:w-64 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <XMarkIcon className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
          <button
            onClick={() => {
              setEditingDriver(null);
              setFormData({ name: '', email: '', phone: '', vehicle_number: '', vehicle_type: 'bike' });
              setShowModal(true);
            }}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2 text-sm sm:text-base"
          >
            <UserPlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Add Driver</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-3 sm:p-4 text-white">
          <p className="text-xs opacity-90">Total Drivers</p>
          <p className="text-xl sm:text-2xl font-bold">{drivers.length}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-3 sm:p-4 text-white">
          <p className="text-xs opacity-90">Active</p>
          <p className="text-xl sm:text-2xl font-bold">{drivers.filter(d => d.is_active).length}</p>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-3 sm:p-4 text-white">
          <p className="text-xs opacity-90">Online</p>
          <p className="text-xl sm:text-2xl font-bold">{drivers.filter(d => d.is_available).length}</p>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg p-3 sm:p-4 text-white">
          <p className="text-xs opacity-90">On Delivery</p>
          <p className="text-xl sm:text-2xl font-bold">0</p>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden space-y-3">
        {filteredDrivers.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <TruckIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No drivers found</p>
          </div>
        ) : (
          filteredDrivers.map((driver) => (
            <div key={driver.id} className="bg-white rounded-lg shadow p-4 border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <TruckIcon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{driver.name}</p>
                    <p className="text-xs text-gray-400">ID: {driver.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleStatus(driver.id, driver.is_active)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                    driver.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {driver.is_active ? (
                    <CheckCircleIcon className="w-3 h-3" />
                  ) : (
                    <XCircleIcon className="w-3 h-3" />
                  )}
                  {driver.is_active ? 'Active' : 'Inactive'}
                </button>
              </div>

              <div className="space-y-2 text-sm mb-3">
                <div className="flex items-center gap-2">
                  <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 text-sm truncate">{driver.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{driver.phone || 'Not provided'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TruckIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{driver.vehicle_number || 'No vehicle'}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t">
                <button
                  onClick={() => {
                    setEditingDriver(driver);
                    setFormData({
                      name: driver.name,
                      email: driver.email,
                      phone: driver.phone,
                      vehicle_number: driver.vehicle_number,
                      vehicle_type: driver.vehicle_type
                    });
                    setShowModal(true);
                  }}
                  className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1"
                >
                  <PencilIcon className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(driver.id)}
                  className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1"
                >
                  <TrashIcon className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Driver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredDrivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <TruckIcon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{driver.name}</p>
                        <p className="text-sm text-gray-400">ID: {driver.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm">{driver.email}</p>
                    <p className="text-sm text-gray-500">{driver.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium">{driver.vehicle_number || '-'}</p>
                    <p className="text-xs text-gray-400 capitalize">{driver.vehicle_type}</p>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleStatus(driver.id, driver.is_active)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                        driver.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {driver.is_active ? (
                        <CheckCircleIcon className="w-3 h-3" />
                      ) : (
                        <XCircleIcon className="w-3 h-3" />
                      )}
                      {driver.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingDriver(driver);
                          setFormData({
                            name: driver.name,
                            email: driver.email,
                            phone: driver.phone,
                            vehicle_number: driver.vehicle_number,
                            vehicle_type: driver.vehicle_type
                          });
                          setShowModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(driver.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal - Mobile Responsive */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-bold">
                  {editingDriver ? 'Edit Driver' : 'Add New Driver'}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  required
                />
                <input
                  type="text"
                  placeholder="Vehicle Number"
                  value={formData.vehicle_number}
                  onChange={(e) => setFormData({ ...formData, vehicle_number: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  required
                />
                <select
                  value={formData.vehicle_type}
                  onChange={(e) => setFormData({ ...formData, vehicle_type: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                >
                  <option value="bike">Bike</option>
                  <option value="car">Car</option>
                  <option value="truck">Truck</option>
                </select>
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition text-sm font-medium"
                  >
                    {editingDriver ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}