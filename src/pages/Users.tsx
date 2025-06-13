
import { useState } from "react";
import { Search, Plus, Edit, Trash2, Mail, Shield } from "lucide-react";
import { Link } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Agent" | "User";
  status: "Active" | "Inactive";
  lastLogin: string;
  created: string;
}

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  // Mock users data
  const users: User[] = [
    {
      id: "USR-001",
      name: "Sarah Chen",
      email: "sarah.chen@company.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2024-06-13",
      created: "2024-01-15"
    },
    {
      id: "USR-002",
      name: "Alex Rodriguez",
      email: "alex.rodriguez@company.com",
      role: "Agent",
      status: "Active",
      lastLogin: "2024-06-12",
      created: "2024-02-20"
    },
    {
      id: "USR-003",
      name: "Maria Garcia",
      email: "maria.garcia@company.com",
      role: "Agent",
      status: "Active",
      lastLogin: "2024-06-11",
      created: "2024-03-10"
    },
    {
      id: "USR-004",
      name: "David Kim",
      email: "david.kim@company.com",
      role: "User",
      status: "Inactive",
      lastLogin: "2024-06-05",
      created: "2024-04-01"
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-purple-100 text-purple-800';
      case 'Agent': return 'bg-blue-100 text-blue-800';
      case 'User': return 'bg-green-100 text-green-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
              <p className="text-slate-600 mt-1">Manage system users and their permissions</p>
            </div>
            <Link
              to="/users/new"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add User
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Agent">Agent</option>
                <option value="User">User</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center">
                          <span className="text-sm font-medium text-slate-600">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">{user.name}</div>
                        <div className="text-sm text-slate-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                      <Shield className="w-3 h-3" />
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">{user.lastLogin}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-500">{user.created}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/users/edit/${user.id}`}
                        className="text-blue-600 hover:text-blue-900 p-1"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button className="text-red-600 hover:text-red-900 p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No users found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
