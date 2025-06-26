
import React from 'react';
import { Handle, Position, NodeProps, NodeResizer } from '@xyflow/react';
import { Card, CardContent } from '@/components/ui/card';
import { DocumentNodeData } from '@/types/flowBuilder';
import { FileText } from 'lucide-react';

export const DocumentNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as DocumentNodeData;
  
  return (
    <>
      <NodeResizer minWidth={120} minHeight={60} isVisible={selected} />
      <Card className={`min-w-[120px] min-h-[60px] ${selected ? 'ring-2 ring-green-500' : ''} bg-green-50`}>
        <CardContent className="p-3 h-full flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-3 h-3 text-green-600 flex-shrink-0" />
            <span className="text-xs text-green-600">📄</span>
          </div>
          <div className="font-medium text-xs text-slate-900 truncate" title={nodeData.label}>
            {nodeData.label}
          </div>
          <div className="text-xs text-slate-500 truncate">
            {nodeData.variables.length} vars
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
