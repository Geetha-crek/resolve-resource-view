
import { Calendar, Clock } from "lucide-react";

interface TicketStatusProps {
  status: string;
  priority: string;
  urgency: string;
  created: string;
  updated: string;
  dueDate: string;
}

const TicketStatus = ({ status, priority, urgency, created, updated, dueDate }: TicketStatusProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      case 'critical': return 'bg-red-200 text-red-900';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Status & Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status Section */}
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-slate-600">Status</label>
            <div className="mt-1">
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                {status}
              </span>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-slate-600">Priority</label>
            <div className="mt-1">
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(priority)}`}>
                {priority}
              </span>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-slate-600">Urgency</label>
            <div className="mt-1">
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(urgency)}`}>
                {urgency}
              </span>
            </div>
          </div>
        </div>

        {/* Dates Section */}
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-slate-600">Created</label>
            <div className="mt-1 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-900">{formatDate(created)}</span>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-slate-600">Last Updated</label>
            <div className="mt-1 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-900">{formatDate(updated)}</span>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-slate-600">Due Date</label>
            <div className="mt-1 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-600 font-medium">{formatDate(dueDate)}</span>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-slate-600">Progress</label>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: '65%' }}></div>
              </div>
              <span className="text-sm text-slate-600 mt-1 block">65% Complete</span>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-slate-600">Time Remaining</label>
            <div className="mt-1">
              <span className="text-sm text-slate-900">3 days, 2 hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketStatus;
