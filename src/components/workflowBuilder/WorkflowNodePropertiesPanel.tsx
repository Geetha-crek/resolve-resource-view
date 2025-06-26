
import React, { useState, useEffect } from 'react';
import { Node } from '@xyflow/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

interface WorkflowNodePropertiesPanelProps {
  node: Node;
  onUpdateNode: (nodeId: string, data: any) => void;
  onClose: () => void;
}

export const WorkflowNodePropertiesPanel: React.FC<WorkflowNodePropertiesPanelProps> = ({
  node,
  onUpdateNode,
  onClose
}) => {
  const [localData, setLocalData] = useState(node.data);

  useEffect(() => {
    setLocalData(node.data);
  }, [node]);

  const handleFieldChange = (field: string, value: any) => {
    const newData = { ...localData, [field]: value };
    setLocalData(newData);
    onUpdateNode(node.id, { [field]: value });
  };

  const getNodeTitle = () => {
    switch (node.type) {
      case 'form': return 'Form Properties';
      case 'sendEmail': return 'Email Properties';
      case 'sendSMS': return 'SMS Properties';
      case 'createDialogue': return 'Create Dialogue Properties';
      case 'closeDialogue': return 'Close Dialogue Properties';
      case 'generateDocument': return 'Generate Document Properties';
      default: return 'Node Properties';
    }
  };

  const mockForms = ['Contact Form', 'Registration Form', 'Feedback Form'];
  const mockParticipants = ['John Doe', 'Jane Smith', 'Admin User'];

  return (
    <div className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">{getNodeTitle()}</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto space-y-4">
        <div className="space-y-2">
          <Label htmlFor="label">Label</Label>
          <Input
            id="label"
            value={localData.label || ''}
            onChange={(e) => handleFieldChange('label', e.target.value)}
            placeholder="Enter label"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="conditionalExpression">Conditional Expression</Label>
          <Textarea
            id="conditionalExpression"
            value={localData.conditionalExpression || ''}
            onChange={(e) => handleFieldChange('conditionalExpression', e.target.value)}
            placeholder="Enter conditional expression"
            rows={3}
          />
        </div>

        {node.type === 'form' && (
          <div className="space-y-2">
            <Label htmlFor="formId">Select Form</Label>
            <Select
              value={localData.formId || ''}
              onValueChange={(value) => handleFieldChange('formId', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a form" />
              </SelectTrigger>
              <SelectContent>
                {mockForms.map((form) => (
                  <SelectItem key={form} value={form}>
                    {form}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {node.type === 'sendEmail' && (
          <div className="space-y-2">
            <Label htmlFor="emailTemplate">Email Template</Label>
            <Textarea
              id="emailTemplate"
              value={localData.emailTemplate || ''}
              onChange={(e) => handleFieldChange('emailTemplate', e.target.value)}
              placeholder="Enter email template"
              rows={5}
            />
          </div>
        )}

        {node.type === 'sendSMS' && (
          <div className="space-y-2">
            <Label htmlFor="smsTemplate">SMS Template</Label>
            <Textarea
              id="smsTemplate"
              value={localData.smsTemplate || ''}
              onChange={(e) => handleFieldChange('smsTemplate', e.target.value)}
              placeholder="Enter SMS template"
              rows={3}
            />
          </div>
        )}

        {node.type === 'createDialogue' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="dialogueName">Dialogue Name</Label>
              <Input
                id="dialogueName"
                value={localData.dialogueName || ''}
                onChange={(e) => handleFieldChange('dialogueName', e.target.value)}
                placeholder="Enter dialogue name"
              />
            </div>
            <div className="space-y-2">
              <Label>Participants</Label>
              <div className="space-y-2">
                {mockParticipants.map((participant) => (
                  <div key={participant} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={participant}
                      checked={(localData.participants || []).includes(participant)}
                      onChange={(e) => {
                        const participants = localData.participants || [];
                        if (e.target.checked) {
                          handleFieldChange('participants', [...participants, participant]);
                        } else {
                          handleFieldChange('participants', participants.filter((p: string) => p !== participant));
                        }
                      }}
                    />
                    <Label htmlFor={participant}>{participant}</Label>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {node.type === 'closeDialogue' && (
          <div className="space-y-2">
            <Label htmlFor="dialogueName">Dialogue Name to Close</Label>
            <Input
              id="dialogueName"
              value={localData.dialogueName || ''}
              onChange={(e) => handleFieldChange('dialogueName', e.target.value)}
              placeholder="Enter dialogue name"
            />
          </div>
        )}

        {node.type === 'generateDocument' && (
          <div className="space-y-2">
            <Label htmlFor="documentTemplate">Document Template</Label>
            <Textarea
              id="documentTemplate"
              value={localData.documentTemplate || ''}
              onChange={(e) => handleFieldChange('documentTemplate', e.target.value)}
              placeholder="Enter document template"
              rows={5}
            />
          </div>
        )}
      </CardContent>
    </div>
  );
};
