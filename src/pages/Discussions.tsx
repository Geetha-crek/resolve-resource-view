
import { MessageCircle, Users, Calendar } from "lucide-react";

const Discussions = () => {
  const discussions = [
    {
      id: 1,
      title: "OAuth Implementation Approach",
      description: "Discussion about the best way to implement OAuth with multiple providers",
      participants: 4,
      messages: 12,
      lastActivity: "2024-06-12T15:30:00Z",
      status: "Active",
      participants_avatars: [
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
      ]
    },
    {
      id: 2,
      title: "Security Review Requirements",
      description: "Planning the security review process for the authentication system",
      participants: 3,
      messages: 8,
      lastActivity: "2024-06-12T11:45:00Z",
      status: "Active",
      participants_avatars: [
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
      ]
    },
    {
      id: 3,
      title: "Documentation Standards",
      description: "Establishing documentation standards for the authentication system",
      participants: 2,
      messages: 5,
      lastActivity: "2024-06-11T14:20:00Z",
      status: "Resolved",
      participants_avatars: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
      ]
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Resolved":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Discussions</h1>
          <p className="text-slate-600">Team conversations and project decisions</p>
        </div>

        <div className="mb-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Start New Discussion
          </button>
        </div>

        <div className="space-y-4">
          {discussions.map((discussion) => (
            <div key={discussion.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-slate-900 text-lg">{discussion.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(discussion.status)}`}>
                      {discussion.status}
                    </span>
                  </div>
                  <p className="text-slate-600 mb-4">{discussion.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-600">{discussion.participants} participants</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-600">{discussion.messages} messages</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-600">Last activity {formatDate(discussion.lastActivity)}</span>
                      </div>
                    </div>
                    
                    <div className="flex -space-x-2">
                      {discussion.participants_avatars.map((avatar, index) => (
                        <img
                          key={index}
                          src={avatar}
                          alt={`Participant ${index + 1}`}
                          className="w-8 h-8 rounded-full border-2 border-white object-cover"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discussions;
