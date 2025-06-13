
import { useState } from "react";
import { Search, Filter, Download, Plus, Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface Case {
  id: string;
  title: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  priority: "Low" | "Medium" | "High" | "Critical";
  reporter: string;
  assignee: string;
  created: string;
  updated: string;
}

const Cases = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  // Mock cases data
  const cases: Case[] = [
    {
      id: "TICKET-1247",
      title: "Implement user authentication system with OAuth integration",
      status: "In Progress",
      priority: "High",
      reporter: "Sarah Chen",
      assignee: "Alex Rodriguez",
      created: "2024-06-10",
      updated: "2024-06-12"
    },
    {
      id: "TICKET-1248",
      title: "Fix payment gateway integration issues",
      status: "Open",
      priority: "Critical",
      reporter: "John Smith",
      assignee: "Maria Garcia",
      created: "2024-06-11",
      updated: "2024-06-11"
    },
    {
      id: "TICKET-1249",
      title: "Update user interface for mobile responsiveness",
      status: "Resolved",
      priority: "Medium",
      reporter: "Emily Davis",
      assignee: "David Kim",
      created: "2024-06-08",
      updated: "2024-06-13"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low': return 'bg-slate-100 text-slate-800';
      case 'Medium': return 'bg-blue-100 text-blue-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const filteredCases = cases.filter(case_ => {
    const matchesSearch = case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || case_.status === statusFilter;
    const matchesPriority = priorityFilter === "All" || case_.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const exportCases = () => {
    const csvContent = [
      ["ID", "Title", "Status", "Priority", "Reporter", "Assignee", "Created", "Updated"],
      ...filteredCases.map(case_ => [
        case_.id, case_.title, case_.status, case_.priority,
        case_.reporter, case_.assignee, case_.created, case_.updated
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cases.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Cases</h1>
              <p className="text-slate-600 mt-1">Manage and track all support cases</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportCases}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                New Case
              </button>
            </div>
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
                  placeholder="Search cases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
              
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="All">All Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cases Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Case ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Assignee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Updated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredCases.map((case_) => (
                <tr key={case_.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-blue-600">{case_.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-900 max-w-xs truncate">
                      {case_.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(case_.status)}`}>
                      {case_.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(case_.priority)}`}>
                      {case_.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">{case_.assignee}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-500">{case_.updated}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to="/"
                      className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCases.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No cases found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cases;
