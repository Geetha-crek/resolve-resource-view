
import { FileText, Plus, User } from "lucide-react";

const Notes = () => {
  const notes = [
    {
      id: 1,
      title: "OAuth Provider Selection",
      content: "After evaluating multiple OAuth providers, we've decided to implement Google, GitHub, and Microsoft OAuth. This covers our main user base requirements.",
      author: "Sarah Chen",
      authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150",
      createdAt: "2024-06-12T10:30:00Z",
      updatedAt: "2024-06-12T14:15:00Z"
    },
    {
      id: 2,
      title: "Security Implementation Notes",
      content: "Key security considerations: JWT token expiration set to 1 hour, refresh tokens valid for 30 days, rate limiting implemented at 100 requests per minute per user.",
      author: "Alex Rodriguez",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      createdAt: "2024-06-11T16:45:00Z",
      updatedAt: "2024-06-12T09:20:00Z"
    },
    {
      id: 3,
      title: "Testing Strategy",
      content: "Unit tests for authentication flows, integration tests for OAuth callbacks, and end-to-end tests for complete user journeys. Target coverage: 90%+",
      author: "Maria Garcia",
      authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      createdAt: "2024-06-10T14:20:00Z",
      updatedAt: "2024-06-10T14:20:00Z"
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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Notes</h1>
          <p className="text-slate-600">Internal team notes and project insights</p>
        </div>

        <div className="mb-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Note
          </button>
        </div>

        <div className="space-y-6">
          {notes.map((note) => (
            <div key={note.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={note.authorAvatar}
                    alt={note.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-slate-900">{note.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <span>{note.author}</span>
                      <span>•</span>
                      <span>{formatDate(note.createdAt)}</span>
                      {note.updatedAt !== note.createdAt && (
                        <>
                          <span>•</span>
                          <span>Updated {formatDate(note.updatedAt)}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <FileText className="w-5 h-5 text-slate-400" />
              </div>
              <p className="text-slate-700 leading-relaxed">{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;
