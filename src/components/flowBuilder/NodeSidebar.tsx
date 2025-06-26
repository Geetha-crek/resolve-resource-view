
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, FileText, Type, Plus } from 'lucide-react';

interface NodeSidebarProps {
  onAddNode: (type: 'question' | 'document' | 'staticText') => void;
}

export const NodeSidebar: React.FC<NodeSidebarProps> = ({ onAddNode }) => {
  const nodeTypes = [
    {
      type: 'question' as const,
      label: 'Question',
      icon: MessageCircle,
      description: 'Interactive form field',
      color: 'text-blue-600'
    },
    {
      type: 'document' as const,
      label: 'Document',
      icon: FileText,
      description: 'Document template',
      color: 'text-green-600'
    },
    {
      type: 'staticText' as const,
      label: 'Static Text',
      icon: Type,
      description: 'Help text or guidance',
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-200 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Node Types</CardTitle>
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
