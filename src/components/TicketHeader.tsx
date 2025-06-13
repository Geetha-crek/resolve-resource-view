
import { Calendar, Clock } from "lucide-react";

interface Ticket {
  id: string;
  title: string;
  status: string;
  created: string;
  updated: string;
  dueDate: string;
}

interface TicketHeaderProps {
  ticket: Ticket;
}

const TicketHeader = ({ ticket }: TicketHeaderProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
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
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            {ticket.id}
          </span>
          <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket.status)}`}>
            {ticket.status}
          </span>
        </div>
        
        <h1 className="text-2xl font-bold text-slate-900">{ticket.title}</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-600 block mb-1">Created</label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-900">{formatDate(ticket.created)}</span>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-slate-600 block mb-1">Last Updated</label>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-900">{formatDate(ticket.updated)}</span>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-slate-600 block mb-1">Due Date</label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-600 font-medium">{formatDate(ticket.dueDate)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketHeader;
