
export interface WorkflowFormNodeData {
  id: string;
  label: string;
  formId: string; // Selected form ID
  conditionalExpression: string;
  [key: string]: any;
}

export interface WorkflowEmailNodeData {
  id: string;
  label: string;
  emailTemplate: string;
  conditionalExpression: string;
  [key: string]: any;
}

export interface WorkflowSMSNodeData {
  id: string;
  label: string;
  smsTemplate: string;
  conditionalExpression: string;
  [key: string]: any;
}

export interface WorkflowCreateDialogueNodeData {
  id: string;
  label: string;
  dialogueName: string;
  participants: string[];
  conditionalExpression: string;
  [key: string]: any;
}

export interface WorkflowCloseDialogueNodeData {
  id: string;
  label: string;
  dialogueName: string;
  conditionalExpression: string;
  [key: string]: any;
}

export interface WorkflowGenerateDocumentNodeData {
  id: string;
  label: string;
  documentTemplate: string;
  conditionalExpression: string;
  [key: string]: any;
}

export interface WorkflowNode {
  id: string;
  type: 'form' | 'sendEmail' | 'sendSMS' | 'createDialogue' | 'closeDialogue' | 'generateDocument';
  position: { x: number; y: number };
  data: WorkflowFormNodeData | WorkflowEmailNodeData | WorkflowSMSNodeData | WorkflowCreateDialogueNodeData | WorkflowCloseDialogueNodeData | WorkflowGenerateDocumentNodeData;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  createdAt: string;
  updatedAt: string;
}
