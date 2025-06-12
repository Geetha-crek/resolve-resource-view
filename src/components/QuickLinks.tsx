
import { FileText, Link, Calendar, Users, TicketCheck } from "lucide-react";

const QuickLinks = () => {
  const links = [
    {
      title: "Documents",
      description: "View related files and attachments",
      icon: FileText,
      count: 8,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      href: "#"
    },
    {
      title: "Notes",
      description: "Internal team notes and comments",
      icon: FileText,
      count: 12,
      color: "text-green-600",
      bgColor: "bg-green-50",
      href: "#"
    },
    {
      title: "Discussions",
      description: "Team conversations and decisions",
      icon: Users,
      count: 5,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      href: "#"
    },
    {
      title: "Timeline",
      description: "Complete activity history",
      icon: Calendar,
      count: 24,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      href: "#"
    },
    {
      title: "Related Tickets",
      description: "Connected issues and dependencies",
      icon: TicketCheck,
      count: 3,
      color: "text-red-600",
      bgColor: "bg-red-50",
      href: "#"
    },
    {
      title: "External Links",
      description: "References and resources",
      icon: Link,
      count: 6,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      href: "#"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Links</h3>
      
      <div className="space-y-3">
        {links.map((link) => {
          const IconComponent = link.icon;
          return (
            <a
              key={link.title}
              href={link.href}
              className="block p-3 rounded-lg border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all duration-200 group"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${link.bgColor} flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}>
                  <IconComponent className={`w-5 h-5 ${link.color}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                      {link.title}
                    </h4>
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                      {link.count}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 truncate">{link.description}</p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default QuickLinks;
