
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
      href: "/documents"
    },
    {
      title: "Notes",
      description: "Internal team notes and comments",
      icon: FileText,
      count: 12,
      color: "text-green-600",
      bgColor: "bg-green-50",
      href: "/notes"
    },
    {
      title: "Discussions",
      description: "Team conversations and decisions",
      icon: Users,
      count: 5,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      href: "/discussions"
    },
    {
      title: "Timeline",
      description: "Complete activity history",
      icon: Calendar,
      count: 24,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      href: "/timeline"
    },
    {
      title: "Related Tickets",
      description: "Connected issues and dependencies",
      icon: TicketCheck,
      count: 3,
      color: "text-red-600",
      bgColor: "bg-red-50",
      href: "/related-tickets"
    },
    {
      title: "External Links",
      description: "References and resources",
      icon: Link,
      count: 6,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      href: "/external-links"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-3 mb-6">
      <div className="flex items-center justify-between gap-2 overflow-x-auto">
        {links.map((link) => {
          const IconComponent = link.icon;
          return (
            <a
              key={link.title}
              href={link.href}
              className="flex items-center gap-2 px-3 py-2 rounded-md border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all duration-200 group whitespace-nowrap min-w-fit"
            >
              <div className={`w-8 h-8 rounded-md ${link.bgColor} flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}>
                <IconComponent className={`w-4 h-4 ${link.color}`} />
              </div>
              
              <div className="flex items-center gap-1">
                <span className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors duration-200 text-sm">
                  {link.title}
                </span>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-full">
                  {link.count}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default QuickLinks;
