
import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Card, CardContent } from '@/components/ui/card';
import { QuestionNodeData } from '@/types/flowBuilder';
import { MessageCircle } from 'lucide-react';

export const QuestionNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as QuestionNodeData;
  
  const getFieldTypeIcon = (type: string) => {
    switch (type) {
      case 'text': return '📝';
      case 'textarea': return '📄';
      case 'richtext': return '✍️';
      case 'checkbox': return '☑️';
      case 'radio': return '🔘';
      case 'dropdown': return '📋';
      case 'date': return '📅';
      case 'datetime': return '🕐';
      case 'currency': return '💰';
      case 'url': return '🔗';
      case 'file': return '📎';
      default: return '❓';
    }
  };

  return (
    <Card className={`w-64 ${selected ? 'ring-2 ring-blue-500' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <MessageCircle className="w-4 h-4 text-blue-600" />
          <span className="font-medium text-sm">Question Node</span>
        </div>
        <div className="space-y-2">
          <div className="font-medium text-slate-900">{nodeData.label}</div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>{getFieldTypeIcon(nodeData.fieldType)}</span>
            <span className="capitalize">{nodeData.fieldType}</span>
          </div>
          <div className="text-xs text-slate-500">
            Variable: {nodeData.variableName}
          </div>
          {nodeData.validation?.required && (
            <div className="text-xs text-red-600">Required</div>
          )}
        </div>
      </CardContent>
      
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </Card>
  );
};
