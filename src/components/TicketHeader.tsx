
import { Calendar, User } from "lucide-react";

interface Ticket {
  id: string;
  title: string;
  reporter: {
    name: string;
    avatar: string;
    role: string;
  };
  assignee: {
    name: string;
    avatar: string;
    role: string;
  };
}

interface TicketHeaderProps {
  ticket: Ticket;
}

const TicketHeader = ({ ticket }: TicketHeaderProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {ticket.id}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">{ticket.title}</h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-600">Reporter:</span>
              <img 
                src={ticket.reporter.avatar} 
                alt={ticket.reporter.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-slate-900">{ticket.reporter.name}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-600">Assignee:</span>
              <img 
                src={ticket.assignee.avatar} 
                alt={ticket.assignee.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-slate-900">{ticket.assignee.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketHeader;
