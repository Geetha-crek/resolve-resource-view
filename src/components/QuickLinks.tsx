
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
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {links.map((link) => {
          const IconComponent = link.icon;
          return (
            <a
              key={link.title}
              href={link.href}
              className="flex flex-col items-center p-3 rounded-lg border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all duration-200 group text-center"
            >
              <div className={`w-10 h-10 rounded-lg ${link.bgColor} flex items-center justify-center group-hover:scale-105 transition-transform duration-200 mb-2`}>
                <IconComponent className={`w-5 h-5 ${link.color}`} />
              </div>
              
              <div className="min-w-0 w-full">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <h4 className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors duration-200 text-sm">
                    {link.title}
                  </h4>
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-full">
                    {link.count}
                  </span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2 hidden sm:block">{link.description}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default QuickLinks;
