
import React from 'react';
import { FormSection, ConditionalRule } from '@/types/dynamicForm';
import { DynamicFormField } from './DynamicFormField';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DynamicFormSectionProps {
  section: FormSection;
  isElementVisible: (conditionalRules?: ConditionalRule[]) => boolean;
}

export const DynamicFormSection: React.FC<DynamicFormSectionProps> = ({ 
  section, 
  isElementVisible 
}) => {
  const visibleFields = section.fields.filter(field => 
    isElementVisible(field.conditionalRules)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{section.title}</CardTitle>
        {section.description && (
          <p className="text-slate-600 text-sm">{section.description}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {visibleFields.map((field) => (
          <DynamicFormField key={field.id} field={field} />
        ))}
      </CardContent>
    </Card>
  );
};
