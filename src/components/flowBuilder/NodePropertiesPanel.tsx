
import React, { useState, useEffect } from 'react';
import { Node } from '@xyflow/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { QuestionNodeData, DocumentNodeData, FieldType, FieldOption } from '@/types/flowBuilder';
import { X, Plus, Trash2 } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface NodePropertiesPanelProps {
  node: Node;
  onUpdateNode: (nodeId: string, data: any) => void;
  onClose: () => void;
}

export const NodePropertiesPanel: React.FC<NodePropertiesPanelProps> = ({
  node,
  onUpdateNode,
  onClose
}) => {
  const [localData, setLocalData] = useState<QuestionNodeData | DocumentNodeData>(
    node.data as QuestionNodeData | DocumentNodeData
  );

  useEffect(() => {
    setLocalData(node.data as QuestionNodeData | DocumentNodeData);
  }, [node]);

  const handleSave = () => {
    onUpdateNode(node.id, localData);
  };

  const handleFieldChange = (field: string, value: any) => {
    setLocalData({ ...localData, [field]: value });
  };

  const handleValidationChange = (field: string, value: any) => {
    if (node.type === 'question') {
      const questionData = localData as QuestionNodeData;
      setLocalData({
        ...localData,
        validation: { ...questionData.validation, [field]: value }
      });
    }
  };

  const addOption = () => {
    if (node.type === 'question') {
      const questionData = localData as QuestionNodeData;
      const options = questionData.options || [];
      const newOption: FieldOption = { label: 'New Option', value: `option_${Date.now()}` };
      handleFieldChange('options', [...options, newOption]);
    }
  };

  const updateOption = (index: number, field: string, value: string) => {
    if (node.type === 'question') {
      const questionData = localData as QuestionNodeData;
      const options = [...(questionData.options || [])];
      options[index] = { ...options[index], [field]: value };
      handleFieldChange('options', options);
    }
  };

  const removeOption = (index: number) => {
    if (node.type === 'question') {
      const questionData = localData as QuestionNodeData;
      const options = questionData.options || [];
      handleFieldChange('options', options.filter((_, i) => i !== index));
    }
  };

  const fieldTypes: FieldType[] = [
    'text', 'textarea', 'richtext', 'checkbox', 'radio', 'dropdown',
    'date', 'datetime', 'currency', 'url', 'file'
  ];

  return (
    <div className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">
          {node.type === 'question' ? 'Question Properties' : 'Document Properties'}
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto space-y-4">
        {/* Common Properties */}
        <div className="space-y-2">
          <Label htmlFor="label">Label</Label>
          <Input
            id="label"
            value={localData.label || ''}
            onChange={(e) => handleFieldChange('label', e.target.value)}
            placeholder="Enter label"
          />
        </div>

        {node.type === 'question' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="variableName">Variable Name</Label>
              <Input
                id="variableName"
                value={(localData as QuestionNodeData).variableName || ''}
                onChange={(e) => handleFieldChange('variableName', e.target.value)}
                placeholder="variable_name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fieldType">Field Type</Label>
              <Select
                value={(localData as QuestionNodeData).fieldType}
                onValueChange={(value) => handleFieldChange('fieldType', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fieldTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="helpText">Help Text</Label>
              <Textarea
                id="helpText"
                value={(localData as QuestionNodeData).helpText || ''}
                onChange={(e) => handleFieldChange('helpText', e.target.value)}
                placeholder="Help text for users"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="placeholder">Placeholder</Label>
              <Input
                id="placeholder"
                value={(localData as QuestionNodeData).placeholder || ''}
                onChange={(e) => handleFieldChange('placeholder', e.target.value)}
                placeholder="Input placeholder"
              />
            </div>

            {/* Options for radio/dropdown */}
            {(['radio', 'dropdown'].includes((localData as QuestionNodeData).fieldType)) && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Options</Label>
                  <Button size="sm" onClick={addOption}>
                    <Plus className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </div>
                {((localData as QuestionNodeData).options || []).map((option: FieldOption, index: number) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Label"
                      value={option.label}
                      onChange={(e) => updateOption(index, 'label', e.target.value)}
                    />
                    <Input
                      placeholder="Value"
                      value={option.value}
                      onChange={(e) => updateOption(index, 'value', e.target.value)}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeOption(index)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <Separator />

            {/* Validation Rules */}
            <div className="space-y-3">
              <Label className="font-medium">Validation Rules</Label>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="required"
                  checked={(localData as QuestionNodeData).validation?.required || false}
                  onCheckedChange={(checked) => handleValidationChange('required', checked)}
                />
                <Label htmlFor="required">Required field</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="regex">Regex Pattern</Label>
                <Input
                  id="regex"
                  value={(localData as QuestionNodeData).validation?.regex || ''}
                  onChange={(e) => handleValidationChange('regex', e.target.value)}
                  placeholder="^[a-zA-Z0-9]+$"
                />
              </div>

              {(['text', 'textarea', 'currency'].includes((localData as QuestionNodeData).fieldType)) && (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="min">Min Length</Label>
                      <Input
                        id="min"
                        type="number"
                        value={(localData as QuestionNodeData).validation?.min || ''}
                        onChange={(e) => handleValidationChange('min', parseInt(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="max">Max Length</Label>
                      <Input
                        id="max"
                        type="number"
                        value={(localData as QuestionNodeData).validation?.max || ''}
                        onChange={(e) => handleValidationChange('max', parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="validationMessage">Validation Message</Label>
                <Input
                  id="validationMessage"
                  value={(localData as QuestionNodeData).validation?.message || ''}
                  onChange={(e) => handleValidationChange('message', e.target.value)}
                  placeholder="Custom validation error message"
                />
              </div>
            </div>
          </>
        )}

        {node.type === 'document' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Document Template</Label>
              <ReactQuill
                value={(localData as DocumentNodeData).template || ''}
                onChange={(value) => handleFieldChange('template', value)}
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline'],
                    ['link'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['clean']
                  ],
                }}
                style={{ minHeight: '200px' }}
              />
            </div>
            <div className="text-sm text-slate-600">
              Use variables like {'{{variable_name}}'} to insert dynamic content from previous questions.
            </div>
          </div>
        )}
      </CardContent>

      <div className="p-4 border-t">
        <Button onClick={handleSave} className="w-full">
          Save Changes
        </Button>
      </div>
    </div>
  );
};
