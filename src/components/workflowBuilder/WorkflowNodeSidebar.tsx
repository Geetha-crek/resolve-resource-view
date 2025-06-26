
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Mail, MessageSquare, Users, UserX, FileCheck, Plus } from 'lucide-react';

interface WorkflowNodeSidebarProps {
  onAddNode: (type: 'form' | 'sendEmail' | 'sendSMS' | 'createDialogue' | 'closeDialogue' | 'generateDocument') => void;
}

export const WorkflowNodeSidebar: React.FC<WorkflowNodeSidebarProps> = ({ onAddNode }) => {
  const nodeTypes = [
    {
      type: 'form' as const,
      label: 'Form',
      icon: FileText,
      description: 'Load a form',
      color: 'text-blue-600'
    },
    {
      type: 'sendEmail' as const,
      label: 'Send Email',
      icon: Mail,
      description: 'Send email notification',
      color: 'text-green-600'
    },
    {
      type: 'sendSMS' as const,
      label: 'Send SMS',
      icon: MessageSquare,
      description: 'Send SMS notification',
      color: 'text-purple-600'
    },
    {
      type: 'createDialogue' as const,
      label: 'Create Dialogue',
      icon: Users,
      description: 'Start a dialogue',
      color: 'text-orange-600'
    },
    {
      type: 'closeDialogue' as const,
      label: 'Close Dialogue',
      icon: UserX,
      description: 'Close a dialogue',
      color: 'text-red-600'
    },
    {
      type: 'generateDocument' as const,
      label: 'Generate Document',
      icon: FileCheck,
      description: 'Generate document',
      color: 'text-indigo-600'
    }
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-200 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Workflow Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {nodeTypes.map((nodeType) => {
            const IconComponent = nodeType.icon;
            return (
              <Button
                key={nodeType.type}
                variant="outline"
                className="w-full justify-start h-auto p-3 flex-col items-start space-y-1"
                onClick={() => onAddNode(nodeType.type)}
              >
                <div className="flex items-center gap-2 w-full">
                  <IconComponent className={`w-4 h-4 ${nodeType.color} flex-shrink-0`} />
                  <span className="font-medium text-sm">{nodeType.label}</span>
                  <Plus className="w-3 h-3 ml-auto text-slate-400" />
                </div>
                <span className="text-xs text-slate-500 text-left">
                  {nodeType.description}
                </span>
              </Button>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};
