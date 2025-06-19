
export interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'radio' | 'checkbox' | 'richtext' | 'email' | 'currency' | 'date' | 'datetime' | 'select';
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    custom?: string;
  };
  options?: Array<{ label: string; value: string }>;
  conditionalRules?: ConditionalRule[];
  defaultValue?: any;
}

export interface FormSection {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  conditionalRules?: ConditionalRule[];
}

export interface FormPage {
  id: string;
  title: string;
  description?: string;
  sections: FormSection[];
  conditionalRules?: ConditionalRule[];
}

export interface ConditionalRule {
  fieldId: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than' | 'is_empty' | 'is_not_empty';
  value: any;
  action: 'show' | 'hide';
}

export interface FormSubmitConfig {
  apiUrl: string;
  method: 'POST' | 'PUT' | 'PATCH';
  headers?: Record<string, string>;
  onSuccess: {
    message: string;
    redirectUrl?: string;
  };
  onError: {
    message: string;
  };
}

export interface DynamicFormConfig {
  id: string;
  title: string;
  description?: string;
  pages: FormPage[];
  submitConfig: FormSubmitConfig;
}
