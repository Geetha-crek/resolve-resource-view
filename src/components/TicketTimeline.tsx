
import { Calendar, FileText, Users, TicketCheck, AlertCircle } from "lucide-react";

const TicketTimeline = () => {
  const timelineEvents = [
    {
      id: 1,
      type: "created",
      title: "Ticket created",
      description: "Sarah Chen created this ticket and assigned it to Alex Rodriguez",
      timestamp: "2024-06-10T09:00:00Z",
      user: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150"
      },
      icon: TicketCheck,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      id: 2,
      type: "comment",
      title: "Added comment",
      description: "Alex started working on the OAuth integration. ETA for first draft is June 13th.",
      timestamp: "2024-06-10T14:30:00Z",
      user: {
        name: "Alex Rodriguez",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
      },
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      id: 3,
      type: "status_change",
      title: "Status changed",
      description: "Changed status from 'Open' to 'In Progress'",
      timestamp: "2024-06-11T10:15:00Z",
      user: {
        name: "Alex Rodriguez",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
      },
      icon: AlertCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      id: 4,
      type: "discussion",
      title: "Team discussion",
      description: "Maria Garcia added security review requirements to the checklist",
      timestamp: "2024-06-12T09:45:00Z",
      user: {
        name: "Maria Garcia",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
      },
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      id: 5,
      type: "update",
      title: "Progress update",
      description: "Updated progress to 65% - OAuth providers integration completed",
      timestamp: "2024-06-12T14:30:00Z",
      user: {
        name: "Alex Rodriguez",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
      },
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    }
  ];

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
      
      <div className="space-y-4">
        {timelineEvents.map((event, index) => {
          const IconComponent = event.icon;
          return (
            <div key={event.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full ${event.bgColor} flex items-center justify-center`}>
                  <IconComponent className={`w-4 h-4 ${event.color}`} />
                </div>
                {index < timelineEvents.length - 1 && (
                  <div className="w-px h-6 bg-slate-200 mt-2"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0 pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 mb-1">
                    <img 
                      src={event.user.avatar} 
                      alt={event.user.name}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-slate-900">{event.user.name}</span>
                    <span className="text-sm text-slate-600">{event.title}</span>
                  </div>
                  <span className="text-xs text-slate-500">{formatTimeAgo(event.timestamp)}</span>
                </div>
                <p className="text-sm text-slate-600">{event.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-200">
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View full timeline →
        </button>
      </div>
    </div>
  );
};

export default TicketTimeline;
