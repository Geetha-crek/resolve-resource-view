
import { useState } from "react";
import TicketHeader from "../components/TicketHeader";
import ActionItem from "../components/ActionItem";
import QuickLinks from "../components/QuickLinks";
import DynamicContent from "../components/DynamicContent";

const Index = () => {
  const [activeSection, setActiveSection] = useState("documents");

  // Mock ticket data
  const ticketData = {
    id: "TICKET-1247",
    title: "Implement user authentication system with OAuth integration",
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
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header with Status and Priority */}
      <div className="mb-6">
        <TicketHeader ticket={ticketData} />
      </div>

      {/* Navigation Links */}
      <div className="mb-6">
        <QuickLinks 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
          actions={currentActions}
          teamMembers={[ticketData.reporter, ticketData.assignee]}
        />
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <DynamicContent activeSection={activeSection} actions={currentActions} teamMembers={[ticketData.reporter, ticketData.assignee]} />
      </div>
    </div>
  );
};

export default Index;
