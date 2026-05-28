// // src/components/admin/DriversManagement.jsx
// 'use client';

// import { useState, useEffect } from 'react';
// import apiClient from '@/lib/apiClient';
// import toast from 'react-hot-toast';

// export default function DriversManagement() {
//   const [drivers, setDrivers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDrivers();
//   }, []);

//   const fetchDrivers = async () => {
//     try {
//       const response = await apiClient.get('/drivers');
//       setDrivers(response.data.data || []);
//     } catch (error) {
//       toast.error('Failed to load drivers');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div className="text-center py-10">Loading drivers...</div>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Drivers Management</h1>
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left">Name</th>
//               <th className="px-6 py-3 text-left">Phone</th>
//               <th className="px-6 py-3 text-left">Vehicle</th>
//               <th className="px-6 py-3 text-left">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {drivers.map((driver) => (
//               <tr key={driver.id} className="border-t">
//                 <td className="px-6 py-4">{driver.name}</td>
//                 <td className="px-6 py-4">{driver.phone}</td>
//                 <td className="px-6 py-4">{driver.vehicle_number}</td>
//                 <td className="px-6 py-4">
//                   <span className={`px-2 py-1 rounded-full text-xs ${driver.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                     {driver.is_available ? 'Available' : 'Busy'}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
// src/components/admin/DriversManagement.jsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlusIcon, 
  PencilIcon, 
  TrashIcon,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import driverService from '@/services/driverService';
import toast from 'react-hot-toast';

export default function DriversManagement() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
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

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const response = await driverService.getAllDrivers();
      if (response.success) {
        setDrivers(response.data);
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Drivers Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage delivery drivers</p>
        </div>
        <button
          onClick={() => {
            setEditingDriver(null);
            setFormData({ name: '', email: '', phone: '', vehicle_number: '', vehicle_type: 'bike' });
            setShowModal(true);
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
        >
          <UserPlusIcon className="w-5 h-5" />
          Add Driver
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
              {drivers.map((driver) => (
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
                    <p className="text-sm font-medium">{driver.vehicle_number}</p>
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">
              {editingDriver ? 'Edit Driver' : 'Add New Driver'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <input
                type="text"
                placeholder="Vehicle Number"
                value={formData.vehicle_number}
                onChange={(e) => setFormData({ ...formData, vehicle_number: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <select
                value={formData.vehicle_type}
                onChange={(e) => setFormData({ ...formData, vehicle_type: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="bike">Bike</option>
                <option value="car">Car</option>
                <option value="truck">Truck</option>
              </select>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
                >
                  {editingDriver ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}