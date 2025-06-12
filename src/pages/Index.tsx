import TicketHeader from "../components/TicketHeader";
import TicketStatus from "../components/TicketStatus";
import ActionItem from "../components/ActionItem";
import QuickLinks from "../components/QuickLinks";
import TicketTimeline from "../components/TicketTimeline";

const Index = () => {
  // Mock ticket data
  const ticketData = {
    id: "TICKET-1247",
    title: "Implement user authentication system with OAuth integration",
    description: "Create a comprehensive authentication system that supports multiple OAuth providers including Google, GitHub, and Microsoft. The system should include proper session management, role-based access control, and security best practices.",
    reporter: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150",
      role: "Product Manager"
    },
    assignee: {
      name: "Alex Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      role: "Senior Developer"
    },
    status: "In Progress",
    priority: "High",
    urgency: "Medium",
    created: "2024-06-10T09:00:00Z",
    updated: "2024-06-12T14:30:00Z",
    dueDate: "2024-06-15T17:00:00Z"
  };

  const currentActions = [
    {
      id: 1,
      title: "Complete OAuth provider integration",
      assignee: {
        name: "Alex Rodriguez",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
      },
      dueDate: "2024-06-13T17:00:00Z",
      status: "pending" as const
    },
    {
      id: 2,
      title: "Review security implementation",
      assignee: {
        name: "Maria Garcia",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
      },
      dueDate: "2024-06-14T12:00:00Z",
      status: "waiting" as const
    },
    {
      id: 3,
      title: "Update documentation",
      assignee: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
      },
      dueDate: "2024-06-15T15:00:00Z",
      status: "upcoming" as const
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header with Status and Priority */}
            <div className="space-y-6">
              <TicketHeader ticket={ticketData} />
              <TicketStatus 
                status={ticketData.status}
                priority={ticketData.priority}
                urgency={ticketData.urgency}
                created={ticketData.created}
                updated={ticketData.updated}
                dueDate={ticketData.dueDate}
              />
            </div>

            {/* Current Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Current Actions</h3>
              <div className="space-y-4">
                {currentActions.map((action) => (
                  <ActionItem key={action.id} action={action} />
                ))}
              </div>
            </div>

            {/* Timeline */}
            <TicketTimeline />
          </div>

          {/* Right Column - Quick Links */}
          <div className="space-y-6">
            <QuickLinks />
            
            {/* Team Members */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Team Members</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img 
                    src={ticketData.reporter.avatar} 
                    alt={ticketData.reporter.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-slate-900">{ticketData.reporter.name}</p>
                    <p className="text-sm text-slate-500">{ticketData.reporter.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <img 
                    src={ticketData.assignee.avatar} 
                    alt={ticketData.assignee.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-slate-900">{ticketData.assignee.name}</p>
                    <p className="text-sm text-slate-500">{ticketData.assignee.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
