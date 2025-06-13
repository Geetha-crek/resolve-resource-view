
import { FileText, Plus, User, MessageSquare, Clock, TicketCheck, ExternalLink } from "lucide-react";

interface DynamicContentProps {
  activeSection: string;
}

const DynamicContent = ({ activeSection }: DynamicContentProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderDocuments = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-900">Documents</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Upload Document
        </button>
      </div>
      {[1, 2, 3].map((doc) => (
        <div key={doc} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-blue-600" />
            <div className="flex-1">
              <h4 className="font-medium text-slate-900">Authentication Flow Diagram {doc}</h4>
              <p className="text-sm text-slate-500">Updated 2 hours ago • 2.4 MB</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderNotes = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-900">Notes</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Note
        </button>
      </div>
      {[
        { title: "OAuth Provider Selection", author: "Sarah Chen", content: "After evaluating multiple OAuth providers..." },
        { title: "Security Implementation", author: "Alex Rodriguez", content: "Key security considerations for the auth system..." },
        { title: "Testing Strategy", author: "Maria Garcia", content: "Comprehensive testing approach for authentication..." }
      ].map((note, index) => (
        <div key={index} className="border border-slate-200 rounded-lg p-4">
          <div className="flex items-start gap-3 mb-3">
            <User className="w-5 h-5 text-slate-400 mt-1" />
            <div className="flex-1">
              <h4 className="font-medium text-slate-900">{note.title}</h4>
              <p className="text-sm text-slate-500">{note.author} • 2 hours ago</p>
            </div>
          </div>
          <p className="text-slate-700">{note.content}</p>
        </div>
      ))}
    </div>
  );

  const renderDiscussions = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-900">Discussions</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Start Discussion
        </button>
      </div>
      {[1, 2, 3].map((discussion) => (
        <div key={discussion} className="border border-slate-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-purple-600 mt-1" />
            <div className="flex-1">
              <h4 className="font-medium text-slate-900">OAuth Implementation Approach {discussion}</h4>
              <p className="text-sm text-slate-500 mb-2">Started by Alex Rodriguez • 3 replies</p>
              <p className="text-slate-700">Discussion about the best approach for implementing OAuth...</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTimeline = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">Timeline</h3>
      {[
        { event: "Ticket created", time: "2024-06-10T09:00:00Z", user: "Sarah Chen" },
        { event: "Assigned to Alex Rodriguez", time: "2024-06-10T10:30:00Z", user: "Sarah Chen" },
        { event: "Status changed to In Progress", time: "2024-06-11T14:00:00Z", user: "Alex Rodriguez" },
        { event: "Added OAuth documentation", time: "2024-06-12T16:30:00Z", user: "Alex Rodriguez" }
      ].map((item, index) => (
        <div key={index} className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-b-0">
          <Clock className="w-5 h-5 text-orange-600 mt-1" />
          <div className="flex-1">
            <p className="font-medium text-slate-900">{item.event}</p>
            <p className="text-sm text-slate-500">{item.user} • {formatDate(item.time)}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderRelatedTickets = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">Related Tickets</h3>
      {[1, 2, 3].map((ticket) => (
        <div key={ticket} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50">
          <div className="flex items-start gap-3">
            <TicketCheck className="w-5 h-5 text-red-600 mt-1" />
            <div className="flex-1">
              <h4 className="font-medium text-slate-900">TICKET-124{ticket}</h4>
              <p className="text-sm text-slate-500 mb-1">Setup OAuth redirect URLs</p>
              <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Completed
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderExternalLinks = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-900">External Links</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Link
        </button>
      </div>
      {[
        { title: "OAuth 2.0 Documentation", url: "https://oauth.net/2/" },
        { title: "Google OAuth Guide", url: "https://developers.google.com/identity/protocols/oauth2" },
        { title: "GitHub OAuth Apps", url: "https://docs.github.com/en/developers/apps/building-oauth-apps" }
      ].map((link, index) => (
        <div key={index} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50">
          <div className="flex items-center gap-3">
            <ExternalLink className="w-5 h-5 text-indigo-600" />
            <div className="flex-1">
              <h4 className="font-medium text-slate-900">{link.title}</h4>
              <p className="text-sm text-slate-500">{link.url}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  switch (activeSection) {
    case 'documents':
      return renderDocuments();
    case 'notes':
      return renderNotes();
    case 'discussions':
      return renderDiscussions();
    case 'timeline':
      return renderTimeline();
    case 'related-tickets':
      return renderRelatedTickets();
    case 'external-links':
      return renderExternalLinks();
    default:
      return renderDocuments();
  }
};

export default DynamicContent;
