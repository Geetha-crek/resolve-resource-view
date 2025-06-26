
import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Connection,
  NodeTypes,
  BackgroundVariant
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import { WorkflowFormNode } from './nodes/WorkflowFormNode';
import { WorkflowEmailNode } from './nodes/WorkflowEmailNode';
import { WorkflowSMSNode } from './nodes/WorkflowSMSNode';
import { WorkflowCreateDialogueNode } from './nodes/WorkflowCreateDialogueNode';
import { WorkflowCloseDialogueNode } from './nodes/WorkflowCloseDialogueNode';
import { WorkflowGenerateDocumentNode } from './nodes/WorkflowGenerateDocumentNode';
import { WorkflowNodeSidebar } from './WorkflowNodeSidebar';
import { WorkflowNodePropertiesPanel } from './WorkflowNodePropertiesPanel';
import { Play, Save, Upload } from 'lucide-react';

const nodeTypes: NodeTypes = {
  form: WorkflowFormNode,
  sendEmail: WorkflowEmailNode,
  sendSMS: WorkflowSMSNode,
  createDialogue: WorkflowCreateDialogueNode,
  closeDialogue: WorkflowCloseDialogueNode,
  generateDocument: WorkflowGenerateDocumentNode,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export const WorkflowBuilder: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [workflowName, setWorkflowName] = useState('Untitled Workflow');

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const addNode = useCallback((type: 'form' | 'sendEmail' | 'sendSMS' | 'createDialogue' | 'closeDialogue' | 'generateDocument') => {
    const id = `${type}-${Date.now()}`;
    let nodeData: any;
    
    switch (type) {
      case 'form':
        nodeData = {
          id,
          label: 'Form Node',
          formId: '',
          conditionalExpression: ''
        };
        break;
      case 'sendEmail':
        nodeData = {
          id,
          label: 'Send Email',
          emailTemplate: '',
          conditionalExpression: ''
        };
        break;
      case 'sendSMS':
        nodeData = {
          id,
          label: 'Send SMS',
          smsTemplate: '',
          conditionalExpression: ''
        };
        break;
      case 'createDialogue':
        nodeData = {
          id,
          label: 'Create Dialogue',
          dialogueName: '',
          participants: [],
          conditionalExpression: ''
        };
        break;
      case 'closeDialogue':
        nodeData = {
          id,
          label: 'Close Dialogue',
          dialogueName: '',
          conditionalExpression: ''
        };
        break;
      case 'generateDocument':
        nodeData = {
          id,
          label: 'Generate Document',
          documentTemplate: '',
          conditionalExpression: ''
        };
        break;
    }
    
    const newNode: Node = {
      id,
      type,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: nodeData,
      className: 'group'
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  const updateNodeData = useCallback((nodeId: string, newData: any) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node
      )
    );
    
    if (selectedNode && selectedNode.id === nodeId) {
      setSelectedNode(prev => prev ? { ...prev, data: { ...prev.data, ...newData } } : null);
    }
  }, [setNodes, selectedNode]);

  return (
    <div className="h-screen flex bg-slate-50">
      <WorkflowNodeSidebar onAddNode={addNode} />

      <div className="flex-1 relative">
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <input
            type="text"
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            className="px-3 py-2 border rounded-md bg-white"
            placeholder="Workflow name"
          />
          <Button size="sm" variant="outline">
            <Play className="w-4 h-4 mr-1" />
            Preview
          </Button>
          <Button size="sm" variant="outline">
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
          <Button size="sm" variant="outline">
            <Upload className="w-4 h-4 mr-1" />
            Load
          </Button>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          fitView
          className="bg-slate-100"
        >
          <Background variant={BackgroundVariant.Dots} />
          <Controls />
        </ReactFlow>
      </div>

      {selectedNode && (
        <div className="w-80 bg-white border-l border-slate-200 overflow-y-auto">
          <WorkflowNodePropertiesPanel
            node={selectedNode}
            onUpdateNode={updateNodeData}
            onClose={() => setSelectedNode(null)}
          />
        </div>
      )}
    </div>
  );
};
