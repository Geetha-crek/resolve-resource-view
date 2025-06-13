
import { TicketCheck } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <TicketCheck className="w-6 h-6 text-blue-600" />
            <span className="text-lg font-semibold text-slate-900">TicketFlow</span>
          </div>
          
          <div className="text-sm text-slate-600">
            © 2024 TicketFlow. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
