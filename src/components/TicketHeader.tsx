
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
          <h1 className="text-2xl font-bold text-slate-900">{ticket.title}</h1>
        </div>
      </div>
    </div>
  );
};

export default TicketHeader;
