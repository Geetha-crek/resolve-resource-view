
import { Link, useLocation } from "react-router-dom";
import { Menu, TicketCheck, Users, Home, BarChart3, Workflow, Zap, LogOut, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Analytics", href: "/dashboard", icon: BarChart3 },
    { name: "Cases", href: "/cases", icon: TicketCheck },
    { name: "Manage Users", href: "/users", icon: Users },
    { name: "Solution Paths", href: "/solution-paths", icon: Workflow },
    { name: "Workflow Builder", href: "/workflow-builder", icon: Zap },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <TicketCheck className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-slate-900">TicketFlow</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Info and Logout */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden md:flex items-center gap-2 text-sm text-slate-600">
                <User className="w-4 h-4" />
                <span>{user.firstName} {user.lastName}</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {user.role}
                </span>
              </div>
            )}
            
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="hidden md:flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* User info on mobile */}
              {user && (
                <div className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 border-b">
                  <User className="w-4 h-4" />
                  <span>{user.firstName} {user.lastName}</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {user.role}
                  </span>
                </div>
              )}
              
              {navigation.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? "text-blue-600 bg-blue-50"
                        : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 w-full text-left"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
