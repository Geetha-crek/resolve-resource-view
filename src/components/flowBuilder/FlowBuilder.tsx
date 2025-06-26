
import React, { useState, useCallback, useMemo } from 'react';
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
import { QuestionNode } from './nodes/QuestionNode';
import { DocumentNode } from './nodes/DocumentNode';
import { StaticTextNode } from './nodes/StaticTextNode';
import { ConditionalNode } from './nodes/ConditionalNode';
import { NodeSidebar } from './NodeSidebar';
import { NodePropertiesPanel } from './NodePropertiesPanel';
import { EdgePropertiesPanel } from './EdgePropertiesPanel';
import { FlowPreview } from './FlowPreview';
import { SolutionFlow, QuestionNodeData, DocumentNodeData, StaticTextNodeData, ConditionalNodeData } from '@/types/flowBuilder';
import { Play, Save, Upload } from 'lucide-react';

const nodeTypes: NodeTypes = {
  question: QuestionNode,
  document: DocumentNode,
  staticText: StaticTextNode,
  conditional: ConditionalNode,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export const FlowBuilder: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [flowName, setFlowName] = useState('Untitled Solution Path');

  const onConnect = useCallback((params: Connection) => {
    // Check if source node allows multiple connections
    const sourceNode = nodes.find(node => node.id === params.source);
    const sourceNodeType = sourceNode?.type;
    
    // Only conditional nodes can have multiple outgoing connections
    if (sourceNodeType !== 'conditional') {
      // Check if source already has an outgoing connection
      const existingConnection = edges.find(edge => edge.source === params.source);
      if (existingConnection) {
        // Remove existing connection if it's not from a conditional node
        setEdges((eds) => eds.filter(edge => edge.id !== existingConnection.id));
      }
    }
    
    setEdges((eds) => addEdge(params, eds));
  }, [setEdges, nodes, edges]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  }, []);

  const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setSelectedEdge(null);
  }, []);

  const addNode = useCallback((type: 'question' | 'document' | 'staticText' | 'conditional') => {
    const id = `${type}-${Date.now()}`;
    let nodeData: QuestionNodeData | DocumentNodeData | StaticTextNodeData | ConditionalNodeData;
    
    if (type === 'question') {
      nodeData = {
        id,
        label: 'New Question',
        fieldType: 'text',
        variableName: `var_${Date.now()}`,
        helpText: '',
        validation: { required: false }
      } as QuestionNodeData;
    } else if (type === 'document') {
      nodeData = {
        id,
        label: 'Document Draft',
        template: '<p>Draft document template...</p>',
        variables: []
      } as DocumentNodeData;
    } else if (type === 'conditional') {
      nodeData = {
        id,
        label: 'Conditional Branch',
        description: 'Branching logic based on conditions'
      } as ConditionalNodeData;
    } else {
      nodeData = {
        id,
        label: 'Static Text',
        content: 'Enter your static text here...',
        textAlign: 'left',
        fontSize: 'medium'
      } as StaticTextNodeData;
    }
    
    const newNode: Node = {
      id,
      type,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: nodeData as Record<string, unknown>,
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
    
    // Update selected node if it's the one being updated
    if (selectedNode && selectedNode.id === nodeId) {
      setSelectedNode(prev => prev ? { ...prev, data: { ...prev.data, ...newData } } : null);
    }
  }, [setNodes, selectedNode]);

  const updateEdgeData = useCallback((edgeId: string, newData: any) => {
    setEdges((eds) =>
      eds.map((edge) =>
        edge.id === edgeId ? { 
          ...edge, 
          data: { ...edge.data, ...newData },
          label: newData.condition?.enabled && newData.condition?.label ? newData.condition.label : (newData.label || edge.label)
        } : edge
      )
    );
    
    // Update selected edge if it's the one being updated
    if (selectedEdge && selectedEdge.id === edgeId) {
      setSelectedEdge(prev => prev ? { 
        ...prev, 
        data: { ...prev.data, ...newData },
        label: newData.condition?.enabled && newData.condition?.label ? newData.condition.label : (newData.label || prev.label)
      } : null);
    }
  }, [setEdges, selectedEdge]);

  const getAvailableVariables = useCallback(() => {
    return nodes
      .filter(node => node.type === 'question')
      .map(node => (node.data as any).variableName)
      .filter(Boolean);
  }, [nodes]);

  const saveFlow = useCallback(() => {
    const flow: SolutionFlow = {
      id: `flow-${Date.now()}`,
      name: flowName,
      nodes: nodes.map(node => ({
        id: node.id,
        type: node.type as 'question' | 'document' | 'staticText' | 'conditional',
        position: node.position,
        data: node.data as QuestionNodeData | DocumentNodeData | StaticTextNodeData | ConditionalNodeData
      })),
      edges: edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        condition: edge.data?.condition || {
          enabled: false,
          field: '',
          operator: 'equals',
          value: '',
          label: ''
        },
        label: edge.label as string
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(flow, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${flowName.replace(/\s+/g, '_')}.json`;
    link.click();
  }, [nodes, edges, flowName]);

  const loadFlow = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const flow: SolutionFlow = JSON.parse(e.target?.result as string);
          setFlowName(flow.name);
          setNodes(flow.nodes.map(node => ({
            id: node.id,
            type: node.type,
            position: node.position,
            data: node.data as Record<string, unknown>,
            className: 'group'
          })));
          setEdges(flow.edges as Edge[]);
        } catch (error) {
          console.error('Error loading flow:', error);
          alert('Error loading flow file');
        }
      };
      reader.readAsText(file);
    }
  }, [setNodes, setEdges]);

  if (isPreviewMode) {
    return (
      <FlowPreview
        nodes={nodes.map(node => ({
          id: node.id,
          type: node.type as 'question' | 'document' | 'staticText' | 'conditional',
          position: node.position,
          data: node.data as QuestionNodeData | DocumentNodeData | StaticTextNodeData | ConditionalNodeData
        }))}
        edges={edges}
        onBack={() => setIsPreviewMode(false)}
      />
    );
  }

  return (
    <div className="h-screen flex bg-slate-50">
      {/* Left Sidebar */}
      <NodeSidebar onAddNode={addNode} />

      {/* Main Canvas */}
      <div className="flex-1 relative">
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <input
            type="text"
            value={flowName}
            onChange={(e) => setFlowName(e.target.value)}
            className="px-3 py-2 border rounded-md bg-white"
            placeholder="Solution path name"
          />
          <Button onClick={() => setIsPreviewMode(true)} size="sm" variant="outline">
            <Play className="w-4 h-4 mr-1" />
            Preview
          </Button>
          <Button onClick={saveFlow} size="sm" variant="outline">
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
          <label className="cursor-pointer">
            <Button size="sm" variant="outline" asChild>
              <span>
                <Upload className="w-4 h-4 mr-1" />
                Load
              </span>
            </Button>
            <input
              type="file"
              accept=".json"
              onChange={loadFlow}
              className="hidden"
            />
          </label>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          fitView
          className="bg-slate-100"
        >
          <Background variant={BackgroundVariant.Dots} />
          <Controls />
        </ReactFlow>
      </div>

      {/* Properties Panel */}
      {(selectedNode || selectedEdge) && (
        <div className="w-80 bg-white border-l border-slate-200 overflow-y-auto">
          {selectedNode && (
            <NodePropertiesPanel
              node={selectedNode}
              onUpdateNode={updateNodeData}
              onClose={() => setSelectedNode(null)}
            />
          )}
          {selectedEdge && (
            <EdgePropertiesPanel
              edge={selectedEdge}
              availableVariables={getAvailableVariables()}
              onUpdateEdge={updateEdgeData}
              onClose={() => setSelectedEdge(null)}
            />
          )}
        </div>
      )}
    </div>
  );
};
