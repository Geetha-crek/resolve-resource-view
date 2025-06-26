
import React, { useState, useEffect } from 'react';
import { Edge } from '@xyflow/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { FlowEdge, EdgeCondition } from '@/types/flowBuilder';
import { X, Route } from 'lucide-react';

interface EdgePropertiesPanelProps {
  edge: Edge;
  availableVariables: string[];
  onUpdateEdge: (edgeId: string, data: Partial<FlowEdge>) => void;
  onClose: () => void;
}

export const EdgePropertiesPanel: React.FC<EdgePropertiesPanelProps> = ({
  edge,
  availableVariables,
  onUpdateEdge,
  onClose
}) => {
  const [localData, setLocalData] = useState<Partial<FlowEdge>>({
    label: (edge.label as string) || '',
    condition: edge.data?.condition || {
      enabled: false,
      field: '',
      operator: 'equals',
      value: '',
      label: ''
    }
  });

  useEffect(() => {
    setLocalData({
      label: (edge.label as string) || '',
      condition: edge.data?.condition || {
        enabled: false,
        field: '',
        operator: 'equals',
        value: '',
        label: ''
      }
    });
  }, [edge]);

  const handleFieldChange = (field: string, value: any) => {
    const newData = { ...localData, [field]: value };
    setLocalData(newData);
    onUpdateEdge(edge.id, newData);
  };

  const handleConditionChange = (field: string, value: any) => {
    const newCondition = { ...localData.condition, [field]: value } as EdgeCondition;
    const newData = { ...localData, condition: newCondition };
    setLocalData(newData);
    onUpdateEdge(edge.id, newData);
  };

  const operators = [
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Not Equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'not_contains', label: 'Not Contains' },
    { value: 'greater_than', label: 'Greater Than' },
    { value: 'less_than', label: 'Less Than' },
    { value: 'is_empty', label: 'Is Empty' },
    { value: 'is_not_empty', label: 'Is Not Empty' }
  ];

  return (
    <div className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <Route className="w-5 h-5" />
          Connector Properties
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto space-y-4">
        <div className="space-y-2">
          <Label htmlFor="edgeLabel">Connector Label</Label>
          <Input
            id="edgeLabel"
            value={localData.label || ''}
            onChange={(e) => handleFieldChange('label', e.target.value)}
            placeholder="Optional label for this connector"
          />
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="enableCondition"
              checked={localData.condition?.enabled || false}
              onCheckedChange={(checked) => handleConditionChange('enabled', checked)}
            />
            <Label htmlFor="enableCondition" className="font-medium">
              Enable Conditional Logic
            </Label>
          </div>

          {localData.condition?.enabled && (
            <div className="space-y-4 pl-6 border-l-2 border-blue-200">
              <div className="space-y-2">
                <Label htmlFor="conditionLabel">Condition Label</Label>
                <Input
                  id="conditionLabel"
                  value={localData.condition?.label || ''}
                  onChange={(e) => handleConditionChange('label', e.target.value)}
                  placeholder="e.g., 'If Yes' or 'If Age > 18'"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="conditionField">Question Variable</Label>
                <Select
                  value={localData.condition?.field || ''}
                  onValueChange={(value) => handleConditionChange('field', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a question variable" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableVariables.map((variable) => (
                      <SelectItem key={variable} value={variable}>
                        {variable}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="conditionOperator">Operator</Label>
                <Select
                  value={localData.condition?.operator || 'equals'}
                  onValueChange={(value) => handleConditionChange('operator', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {operators.map((op) => (
                      <SelectItem key={op.value} value={op.value}>
                        {op.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {!['is_empty', 'is_not_empty'].includes(localData.condition?.operator || '') && (
                <div className="space-y-2">
                  <Label htmlFor="conditionValue">Value</Label>
                  <Input
                    id="conditionValue"
                    value={localData.condition?.value || ''}
                    onChange={(e) => handleConditionChange('value', e.target.value)}
                    placeholder="Enter comparison value"
                  />
                </div>
              )}

              <div className="text-sm text-slate-600 bg-blue-50 p-3 rounded">
                <strong>Example:</strong> If you want this connector to be used when the user selects "Yes" 
                for a question, set the operator to "Equals" and value to "Yes".
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </div>
  );
};
