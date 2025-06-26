
import React from 'react';
import { Handle, Position, NodeProps, NodeResizer } from '@xyflow/react';
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
    <>
      <NodeResizer minWidth={120} minHeight={60} isVisible={selected} />
      <Card className={`min-w-[120px] min-h-[60px] ${selected ? 'ring-2 ring-blue-500' : ''}`}>
        <CardContent className="p-3 h-full flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            <MessageCircle className="w-3 h-3 text-blue-600 flex-shrink-0" />
            <span className="text-xs text-blue-600 flex-shrink-0">{getFieldTypeIcon(nodeData.fieldType)}</span>
          </div>
          <div className="font-medium text-xs text-slate-900 truncate" title={nodeData.label}>
            {nodeData.label}
          </div>
        </CardContent>
      </Card>
      
      {/* Connector handles - visible on hover or selection */}
      <Handle 
        type="target" 
        position={Position.Top} 
        className={`w-2 h-2 transition-opacity ${selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className={`w-2 h-2 transition-opacity ${selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
      />
      <Handle 
        type="source" 
        position={Position.Left} 
        className={`w-2 h-2 transition-opacity ${selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        className={`w-2 h-2 transition-opacity ${selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
      />
    </>
  );
};
