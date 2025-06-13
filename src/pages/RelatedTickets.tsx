
import { TicketCheck, ArrowRight, Calendar, User } from "lucide-react";

const RelatedTickets = () => {
  const relatedTickets = [
    {
      id: "TICKET-1248",
      title: "Create user registration form with validation",
      status: "In Progress",
      priority: "Medium",
      assignee: "David Kim",
      relationship: "Depends on",
      description: "User registration form that integrates with the OAuth system"
    },
    {
      id: "TICKET-1249",
      title: "Implement role-based access control",
      status: "Waiting",
      priority: "High",
      assignee: "Maria Garcia",
      relationship: "Blocks",
      description: "RBAC system that works with authenticated users"
    },
    {
      id: "TICKET-1250",
      title: "Add session management and persistence",
      status: "Open",
      priority: "Medium",
      assignee: "Alex Rodriguez",
      relationship: "Related to",
      description: "Session handling for authenticated users across the application"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Waiting":
        return "bg-yellow-100 text-yellow-800";
      case "Open":
        return "bg-gray-100 text-gray-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-orange-100 text-orange-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case "Blocks":
        return "bg-red-50 text-red-700 border-red-200";
      case "Depends on":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Related to":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Related Tickets</h1>
          <p className="text-slate-600">Connected issues and dependencies for TICKET-1247</p>
        </div>

        <div className="space-y-4">
          {relatedTickets.map((ticket) => (
            <div key={ticket.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {ticket.id}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRelationshipColor(ticket.relationship)}`}>
                      {ticket.relationship}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-slate-900 text-lg mb-2">{ticket.title}</h3>
                  <p className="text-slate-600 mb-4">{ticket.description}</p>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <User className="w-4 h-4" />
                      <span>{ticket.assignee}</span>
                    </div>
                  </div>
                </div>
                
                <div className="ml-4">
                  <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Dependency Graph</h3>
          <div className="flex items-center justify-center py-12 text-slate-500">
            <div className="text-center">
              <TicketCheck className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <p>Dependency visualization coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedTickets;
