
import React, { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { TicketCheck } from 'lucide-react';

const Auth: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <TicketCheck className="w-10 h-10 text-blue-600" />
            <h1 className="text-3xl font-bold text-slate-900">TicketFlow</h1>
          </div>
          <p className="text-slate-600">
            Welcome to your ticket management system
          </p>
        </div>
        
        {isLoginMode ? (
          <LoginForm onToggleMode={toggleMode} />
        ) : (
          <RegisterForm onToggleMode={toggleMode} />
        )}
      </div>
    </div>
  );
};

export default Auth;
