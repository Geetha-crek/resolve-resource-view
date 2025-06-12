
import { Calendar, Clock, AlertCircle } from "lucide-react";

interface Action {
  id: number;
  title: string;
  assignee: {
    name: string;
    avatar: string;
  };
  dueDate: string;
  status: 'pending' | 'waiting' | 'upcoming';
}

interface ActionItemProps {
  action: Action;
}

const ActionItem = ({ action }: ActionItemProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'waiting': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'upcoming': return <Calendar className="w-4 h-4 text-green-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-50 border-orange-200';
      case 'waiting': return 'bg-blue-50 border-blue-200';
      case 'upcoming': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    return `In ${diffDays} days`;
  };

  return (
    <div className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${getStatusColor(action.status)}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {getStatusIcon(action.status)}
            <h4 className="font-medium text-slate-900">{action.title}</h4>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src={action.assignee.avatar} 
                alt={action.assignee.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-sm text-slate-600">{action.assignee.name}</span>
            </div>
            
            <div className="text-sm text-slate-600">
              {formatDate(action.dueDate)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionItem;
