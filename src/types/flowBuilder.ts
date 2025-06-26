
export type FieldType = 
  | 'text'
  | 'textarea'
  | 'richtext'
  | 'checkbox'
  | 'radio'
  | 'dropdown'
  | 'date'
  | 'datetime'
  | 'currency'
  | 'url'
  | 'file';

export interface ValidationRule {
  required?: boolean;
  regex?: string;
  min?: number;
  max?: number;
  message?: string;
}

export interface FieldOption {
  label: string;
  value: string;
}

export interface QuestionNodeData {
  id: string;
  label: string;
  fieldType: FieldType;
  variableName: string;
  helpText?: string;
  validation?: ValidationRule;
  options?: FieldOption[]; // For radio, dropdown
  placeholder?: string;
  [key: string]: any; // Index signature for React Flow compatibility
}

export interface DocumentNodeData {
  id: string;
  label: string;
  template: string;
  variables: string[]; // Variables used in template
  [key: string]: any; // Index signature for React Flow compatibility
}

export interface FlowNode {
  id: string;
  type: 'question' | 'document';
  position: { x: number; y: number };
  data: QuestionNodeData | DocumentNodeData;
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  condition?: {
    field: string;
    operator: 'equals' | 'contains' | 'greater' | 'less';
    value: string;
  };
}

export interface SolutionFlow {
  id: string;
  name: string;
  description?: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
  createdAt: string;
  updatedAt: string;
}

export interface FlowPreviewData {
  [variableName: string]: any;
}
