import React, { useState } from 'react';
import { FileText, Plus, User, MessageSquare, Clock, CheckSquare } from "lucide-react";
import { FileUploadDialog } from './FileUploadDialog';
import { ChatInterface } from './ChatInterface';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

interface DynamicContentProps {
  activeSection: string;
  actions?: any[];
  teamMembers?: any[];
}

const DynamicContent = ({ activeSection, actions = [], teamMembers = [] }: DynamicContentProps) => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [chatDialogOpen, setChatDialogOpen] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState<any>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const openChat = (discussion: any) => {
    setSelectedDiscussion(discussion);
    setChatDialogOpen(true);
  };

  const openNoteForm = () => {
    navigate('/case-form?type=Note');
  };

  const renderDocuments = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-900">{t('documents.title')}</h3>
        <button 
          onClick={() => setUploadDialogOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {t('documents.uploadDocument')}
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
        <h3 className="text-lg font-semibold text-slate-900">{t('notes.title')}</h3>
        <button 
          onClick={openNoteForm}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {t('notes.addNote')}
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

  const renderDiscussions = () => {
    const discussions = [
      {
        id: 1,
        title: "OAuth Implementation Approach",
        content: "Discussion about the best approach for implementing OAuth...",
        replies: 3,
        author: "Alex Rodriguez",
        messages: [
          {
            id: 1,
            author: "Alex Rodriguez",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
            content: "I think we should start with Google OAuth first since it has the best documentation.",
            timestamp: "2024-06-12T10:00:00Z"
          },
          {
            id: 2,
            author: "Sarah Chen",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150",
            content: "Agreed, but we should also consider GitHub OAuth for developer-focused features.",
            timestamp: "2024-06-12T10:15:00Z"
          }
        ]
      },
      {
        id: 2,
        title: "Security Review Requirements",
        content: "Planning the security review process...",
        replies: 5,
        author: "Maria Garcia", 
        messages: [
          {
            id: 1,
            author: "Maria Garcia",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
            content: "We need to ensure all OAuth flows are properly secured and follow best practices.",
            timestamp: "2024-06-12T11:00:00Z"
          }
        ]
      }
    ];

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-900">{t('discussions.title')}</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            {t('discussions.startDiscussion')}
          </button>
        </div>
        {discussions.map((discussion) => (
          <div 
            key={discussion.id} 
            className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 cursor-pointer transition-colors"
            onClick={() => openChat(discussion)}
          >
            <div className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-purple-600 mt-1" />
              <div className="flex-1">
                <h4 className="font-medium text-slate-900">{discussion.title}</h4>
                <p className="text-sm text-slate-500 mb-2">{t('discussions.startedBy')} {discussion.author} • {discussion.replies} {t('discussions.replies')}</p>
                <p className="text-slate-700">{discussion.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderTimeline = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">{t('timeline.title')}</h3>
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

  const renderActions = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">{t('actions.title')}</h3>
      {actions.map((action) => (
        <div key={action.id} className="border border-slate-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckSquare className="w-5 h-5 text-red-600 mt-1" />
            <div className="flex-1">
              <h4 className="font-medium text-slate-900">{action.title}</h4>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <img 
                    src={action.assignee.avatar} 
                    alt={action.assignee.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm text-slate-600">{action.assignee.name}</span>
                </div>
                <span className="text-sm text-slate-500">{t('actions.due')}: {formatDate(action.dueDate)}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  action.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  action.status === 'waiting' ? 'bg-orange-100 text-orange-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {action.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">{t('team.title')}</h3>
      {teamMembers.map((member, index) => (
        <div key={index} className="border border-slate-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <img 
              src={member.avatar} 
              alt={member.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-slate-900">{member.name}</p>
              <p className="text-sm text-slate-500">{member.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'documents':
        return renderDocuments();
      case 'notes':
        return renderNotes();
      case 'discussions':
        return renderDiscussions();
      case 'timeline':
        return renderTimeline();
      case 'actions':
        return renderActions();
      case 'team':
        return renderTeam();
      default:
        return renderDocuments();
    }
  };

  return (
    <>
      {renderContent()}
      
      <FileUploadDialog 
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
      />
      
      {selectedDiscussion && (
        <ChatInterface
          open={chatDialogOpen}
          onOpenChange={setChatDialogOpen}
          discussionTitle={selectedDiscussion.title}
          messages={selectedDiscussion.messages}
        />
      )}
    </>
  );
};

export default DynamicContent;
