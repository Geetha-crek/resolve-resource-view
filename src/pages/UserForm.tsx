
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Saving user:", formData);
    navigate("/users");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <Link
              to="/users"
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {isEditing ? "Edit User" : "Add New User"}
              </h1>
              <p className="text-slate-600 mt-1">
                {isEditing ? "Update user information and permissions" : "Create a new user account"}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-2">
                Role *
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="User">User</option>
                <option value="Agent">Agent</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-slate-700 mb-2">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Role Permissions Info */}
          <div className="mt-6 p-4 bg-slate-50 rounded-md">
            <h3 className="text-sm font-medium text-slate-900 mb-2">Role Permissions</h3>
            <div className="text-sm text-slate-600 space-y-1">
              <div><strong>Admin:</strong> Full system access, can manage users and settings</div>
              <div><strong>Agent:</strong> Can view and manage assigned cases</div>
              <div><strong>User:</strong> Can create and view own cases only</div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-200">
            <Link
              to="/users"
              className="px-4 py-2 text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              {isEditing ? "Update User" : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
