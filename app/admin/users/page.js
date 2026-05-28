'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import adminService from '@/services/adminService'
import toast from 'react-hot-toast'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const data = await adminService.getAllUsers()
      setUsers(data)
    } catch (error) {
      toast.error('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  const updateRole = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin'
    try {
      await adminService.updateUserRole(userId, newRole)
      toast.success(`User role updated to ${newRole}`)
      fetchUsers()
    } catch (error) {
      toast.error('Failed to update role')
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Users ({users.length})</h1>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <td className="px-6 py-4">{user.id}</td>
                <td className="px-6 py-4 font-medium">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>{user.role}</span></td>
                <td className="px-6 py-4">{new Date(user.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4"><button onClick={() => updateRole(user.id, user.role)} className="text-indigo-600 hover:text-indigo-800 text-sm">{user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}</button></td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}