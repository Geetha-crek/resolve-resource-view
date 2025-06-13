
import { FileText, Link, Calendar, Users, TicketCheck } from "lucide-react";

interface QuickLinksProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const QuickLinks = ({ activeSection, onSectionChange }: QuickLinksProps) => {
  const links = [
    {
      id: "documents",
      title: "Documents",
      icon: FileText,
      count: 8,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: "notes",
      title: "Notes",
      icon: FileText,
      count: 12,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: "discussions",
      title: "Discussions",
      icon: Users,
      count: 5,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      id: "timeline",
      title: "Timeline",
      icon: Calendar,
      count: 24,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      id: "related-tickets",
      title: "Related Tickets",
      icon: TicketCheck,
      count: 3,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      id: "external-links",
      title: "External Links",
      icon: Link,
      count: 6,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-3">
      <div className="flex items-center justify-between gap-2 overflow-x-auto">
        {links.map((link) => {
          const IconComponent = link.icon;
          const isActive = activeSection === link.id;
          
          return (
            <button
              key={link.id}
              onClick={() => onSectionChange(link.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md border transition-all duration-200 group whitespace-nowrap min-w-fit ${
                isActive 
                  ? 'border-blue-200 bg-blue-50 shadow-sm' 
                  : 'border-slate-100 hover:border-slate-200 hover:shadow-sm'
              }`}
            >
              <div className={`w-8 h-8 rounded-md ${link.bgColor} flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}>
                <IconComponent className={`w-4 h-4 ${link.color}`} />
              </div>
              
              <div className="flex items-center gap-1">
                <span className={`font-medium text-sm transition-colors duration-200 ${
                  isActive ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'
                }`}>
                  {link.title}
                </span>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-full">
                  {link.count}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickLinks;
