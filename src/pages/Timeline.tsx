
import { Calendar, GitCommit, MessageCircle, FileText, Users } from "lucide-react";

const Timeline = () => {
  const timelineEvents = [
    {
      id: 1,
      type: "ticket_created",
      title: "Ticket Created",
      description: "Authentication system ticket was created by Sarah Chen",
      timestamp: "2024-06-10T09:00:00Z",
      actor: "Sarah Chen",
      icon: FileText,
      color: "bg-blue-500"
    },
    {
      id: 2,
      type: "assignment",
      title: "Ticket Assigned",
      description: "Ticket assigned to Alex Rodriguez",
      timestamp: "2024-06-10T10:15:00Z",
      actor: "Sarah Chen",
      icon: Users,
      color: "bg-green-500"
    },
    {
      id: 3,
      type: "status_change",
      title: "Status Updated",
      description: "Status changed from 'Open' to 'In Progress'",
      timestamp: "2024-06-11T08:30:00Z",
      actor: "Alex Rodriguez",
      icon: GitCommit,
      color: "bg-orange-500"
    },
    {
      id: 4,
      type: "comment",
      title: "Comment Added",
      description: "OAuth provider research completed - documenting findings",
      timestamp: "2024-06-11T14:20:00Z",
      actor: "Alex Rodriguez",
      icon: MessageCircle,
      color: "bg-purple-500"
    },
    {
      id: 5,
      type: "document_upload",
      title: "Document Uploaded",
      description: "OAuth Integration Guide.docx uploaded",
      timestamp: "2024-06-11T16:45:00Z",
      actor: "Alex Rodriguez",
      icon: FileText,
      color: "bg-blue-500"
    },
    {
      id: 6,
      type: "review_requested",
      title: "Review Requested",
      description: "Security review requested from Maria Garcia",
      timestamp: "2024-06-12T09:15:00Z",
      actor: "Alex Rodriguez",
      icon: Users,
      color: "bg-yellow-500"
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Timeline</h1>
          <p className="text-slate-600">Complete activity history for this ticket</p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200"></div>

          <div className="space-y-6">
            {timelineEvents.map((event, index) => {
              const IconComponent = event.icon;
              return (
                <div key={event.id} className="relative flex items-start gap-4">
                  {/* Timeline dot */}
                  <div className={`w-8 h-8 rounded-full ${event.color} flex items-center justify-center z-10`}>
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>

                  {/* Event content */}
                  <div className="flex-1 bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-slate-900">{event.title}</h3>
                      <span className="text-sm text-slate-500">{formatDate(event.timestamp)}</span>
                    </div>
                    <p className="text-slate-600 mb-2">{event.description}</p>
                    <p className="text-sm text-slate-500">by {event.actor}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
