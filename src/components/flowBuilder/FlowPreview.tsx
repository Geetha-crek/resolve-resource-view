
import React, { useState, useCallback } from 'react';
import { Edge } from '@xyflow/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { FlowNode, FlowPreviewData, QuestionNodeData, DocumentNodeData } from '@/types/flowBuilder';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ReactQuill from 'react-quill';

interface FlowPreviewProps {
  nodes: FlowNode[];
  edges: Edge[];
  onBack: () => void;
}

export const FlowPreview: React.FC<FlowPreviewProps> = ({ nodes, edges, onBack }) => {
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [previewData, setPreviewData] = useState<FlowPreviewData>({});
  const [currentValue, setCurrentValue] = useState<any>('');

  const questionNodes = nodes.filter(node => node.type === 'question');
  const documentNodes = nodes.filter(node => node.type === 'document');
  const currentNode = questionNodes[currentNodeIndex];

  const handleNext = useCallback(() => {
    if (currentNode) {
      const questionData = currentNode.data as QuestionNodeData;
      setPreviewData(prev => ({
        ...prev,
        [questionData.variableName]: currentValue
      }));
      setCurrentValue('');
      
      if (currentNodeIndex < questionNodes.length - 1) {
        setCurrentNodeIndex(currentNodeIndex + 1);
      }
    }
  }, [currentNode, currentValue, currentNodeIndex, questionNodes.length]);

  const handlePrevious = useCallback(() => {
    if (currentNodeIndex > 0) {
      setCurrentNodeIndex(currentNodeIndex - 1);
      const prevNode = questionNodes[currentNodeIndex - 1];
      const prevData = prevNode.data as QuestionNodeData;
      setCurrentValue(previewData[prevData.variableName] || '');
    }
  }, [currentNodeIndex, questionNodes, previewData]);

  const renderField = (questionData: QuestionNodeData) => {
    const { fieldType, options, placeholder, validation } = questionData;

    switch (fieldType) {
      case 'text':
      case 'url':
      case 'currency':
        return (
          <Input
            type={fieldType === 'currency' ? 'number' : fieldType === 'url' ? 'url' : 'text'}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            placeholder={placeholder}
            required={validation?.required}
          />
        );

      case 'textarea':
        return (
          <Textarea
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            placeholder={placeholder}
            required={validation?.required}
            rows={4}
          />
        );

      case 'richtext':
        return (
          <ReactQuill
            value={currentValue}
            onChange={setCurrentValue}
            modules={{
              toolbar: [
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['clean']
              ],
            }}
          />
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id="checkbox"
              checked={currentValue}
              onCheckedChange={setCurrentValue}
            />
            <Label htmlFor="checkbox">{questionData.label}</Label>
          </div>
        );

      case 'radio':
        return (
          <RadioGroup value={currentValue} onValueChange={setCurrentValue}>
            {options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'dropdown':
        return (
          <Select value={currentValue} onValueChange={setCurrentValue}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'date':
        return (
          <Input
            type="date"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            required={validation?.required}
          />
        );

      case 'datetime':
        return (
          <Input
            type="datetime-local"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            required={validation?.required}
          />
        );

      case 'file':
        return (
          <Input
            type="file"
            onChange={(e) => setCurrentValue(e.target.files?.[0])}
            required={validation?.required}
          />
        );

      default:
        return null;
    }
  };

  const renderDocuments = () => {
    return documentNodes.map((docNode) => {
      const docData = docNode.data as DocumentNodeData;
      let processedTemplate = docData.template;
      
      // Replace variables in template
      Object.entries(previewData).forEach(([key, value]) => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        processedTemplate = processedTemplate.replace(regex, String(value));
      });

      return (
        <Card key={docNode.id} className="mt-6">
          <CardHeader>
            <CardTitle>{docData.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: processedTemplate }}
            />
          </CardContent>
        </Card>
      );
    });
  };

  const isComplete = currentNodeIndex >= questionNodes.length;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Builder
          </Button>
          <div className="text-sm text-slate-600">
            Step {Math.min(currentNodeIndex + 1, questionNodes.length)} of {questionNodes.length}
          </div>
        </div>

        {!isComplete && currentNode && (
          <Card>
            <CardHeader>
              <CardTitle>{(currentNode.data as QuestionNodeData).label}</CardTitle>
              {(currentNode.data as QuestionNodeData).helpText && (
                <p className="text-slate-600">
                  {(currentNode.data as QuestionNodeData).helpText}
                </p>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {renderField(currentNode.data as QuestionNodeData)}
              
              <div className="flex justify-between pt-4">
                <Button
                  onClick={handlePrevious}
                  disabled={currentNodeIndex === 0}
                  variant="outline"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!currentValue && (currentNode.data as QuestionNodeData).validation?.required}
                >
                  {currentNodeIndex === questionNodes.length - 1 ? 'Finish' : 'Next'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {isComplete && (
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Flow Complete!</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  You have completed all questions. Here's a summary of your responses:
                </p>
                <div className="space-y-2 text-sm">
                  {Object.entries(previewData).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="font-medium">{key}:</span>
                      <span>{String(value)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {renderDocuments()}
          </div>
        )}
      </div>
    </div>
  );
};
