
import React from 'react';
import { Handle, Position, NodeProps, NodeResizer } from '@xyflow/react';
import { Card, CardContent } from '@/components/ui/card';
import { Mail } from 'lucide-react';

export const WorkflowEmailNode: React.FC<NodeProps> = ({ data, selected }) => {
  return (
    <>
      <NodeResizer minWidth={80} minHeight={60} isVisible={selected} />
      <Card className={`min-w-[80px] min-h-[60px] ${selected ? 'ring-2 ring-green-500' : ''} bg-green-50 group`}>
        <CardContent className="p-3 h-full flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            <Mail className="w-4 h-4 text-green-600 flex-shrink-0" />
            <span className="text-xs text-green-600">📧</span>
          </div>
          <div className="font-medium text-xs text-slate-900 truncate" title={data.label}>
            {data.label}
          </div>
        </CardContent>
      </Card>
      
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
    </>
  );
};
