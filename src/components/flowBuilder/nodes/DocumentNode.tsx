
import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Card, CardContent } from '@/components/ui/card';
import { DocumentNodeData } from '@/types/flowBuilder';
import { FileText } from 'lucide-react';

export const DocumentNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as DocumentNodeData;
  
  return (
    <Card className={`w-64 ${selected ? 'ring-2 ring-green-500' : ''} bg-green-50`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-4 h-4 text-green-600" />
          <span className="font-medium text-sm">Document Node</span>
        </div>
        <div className="space-y-2">
          <div className="font-medium text-slate-900">{nodeData.label}</div>
          <div className="text-xs text-slate-500">
            Variables: {nodeData.variables.length}
          </div>
          <div className="text-xs text-slate-600 truncate">
            {nodeData.template.replace(/<[^>]*>/g, '').substring(0, 50)}...
          </div>
        </div>
      </CardContent>
      
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
    </Card>
  );
};
