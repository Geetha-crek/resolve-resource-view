
export interface WorkflowNodeData {
  id: string;
  label: string;
  conditionalExpression?: string;
  [key: string]: any;
}

export interface WorkflowFormNodeData extends WorkflowNodeData {
  formId: string;
}

export interface WorkflowEmailNodeData extends WorkflowNodeData {
  emailTemplate: string;
}

export interface WorkflowSMSNodeData extends WorkflowNodeData {
  smsTemplate: string;
}

export interface WorkflowCreateDialogueNodeData extends WorkflowNodeData {
  dialogueName: string;
  participants: string[];
}

export interface WorkflowCloseDialogueNodeData extends WorkflowNodeData {
  dialogueName: string;
}

export interface WorkflowGenerateDocumentNodeData extends WorkflowNodeData {
  documentTemplate: string;
}

export interface WorkflowNode {
  id: string;
  type: 'form' | 'sendEmail' | 'sendSMS' | 'createDialogue' | 'closeDialogue' | 'generateDocument';
  position: { x: number; y: number };
  data: WorkflowNodeData;
}

export interface WorkflowFlow {
  id: string;
  name: string;
  description?: string;
  nodes: WorkflowNode[];
  edges: any[]; // Using any for now to match existing edge structure
  createdAt: string;
  updatedAt: string;
}
