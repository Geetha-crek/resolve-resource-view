
import React from 'react';
import { FormPage, ConditionalRule } from '@/types/dynamicForm';
import { DynamicFormSection } from './DynamicFormSection';

interface DynamicFormPageProps {
  page: FormPage;
  isElementVisible: (conditionalRules?: ConditionalRule[]) => boolean;
}

export const DynamicFormPage: React.FC<DynamicFormPageProps> = ({ 
  page, 
  isElementVisible 
}) => {
  const visibleSections = page.sections.filter(section => 
    isElementVisible(section.conditionalRules)
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">{page.title}</h2>
        {page.description && (
          <p className="text-slate-600 mt-2">{page.description}</p>
        )}
      </div>
      
      {visibleSections.map((section) => (
        <DynamicFormSection
          key={section.id}
          section={section}
          isElementVisible={isElementVisible}
        />
      ))}
    </div>
  );
};
