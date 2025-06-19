
import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DynamicFormConfig, ConditionalRule } from '@/types/dynamicForm';
import { DynamicFormPage } from './DynamicFormPage';
import { useToast } from '@/hooks/use-toast';

interface DynamicFormProps {
  config: DynamicFormConfig;
  onSuccess?: () => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ config, onSuccess }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {}
  });

  const { handleSubmit, watch } = methods;
  const formData = watch();

  const evaluateConditionalRule = (rule: ConditionalRule, data: any): boolean => {
    const fieldValue = data[rule.fieldId];
    
    switch (rule.operator) {
      case 'equals':
        return fieldValue === rule.value;
      case 'not_equals':
        return fieldValue !== rule.value;
      case 'contains':
        return String(fieldValue).includes(String(rule.value));
      case 'greater_than':
        return Number(fieldValue) > Number(rule.value);
      case 'less_than':
        return Number(fieldValue) < Number(rule.value);
      case 'is_empty':
        return !fieldValue;
      case 'is_not_empty':
        return !!fieldValue;
      default:
        return true;
    }
  };

  const isElementVisible = (conditionalRules?: ConditionalRule[]): boolean => {
    if (!conditionalRules || conditionalRules.length === 0) return true;
    
    return conditionalRules.every(rule => {
      const isConditionMet = evaluateConditionalRule(rule, formData);
      return rule.action === 'show' ? isConditionMet : !isConditionMet;
    });
  };

  const visiblePages = config.pages.filter(page => isElementVisible(page.conditionalRules));
  const currentPage = visiblePages[currentPageIndex];

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(config.submitConfig.apiUrl, {
        method: config.submitConfig.method,
        headers: {
          'Content-Type': 'application/json',
          ...config.submitConfig.headers,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: config.submitConfig.onSuccess.message,
        });
        
        if (config.submitConfig.onSuccess.redirectUrl) {
          window.location.href = config.submitConfig.onSuccess.redirectUrl;
        } else if (onSuccess) {
          onSuccess();
        }
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: config.submitConfig.onError.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextPage = () => {
    if (currentPageIndex < visiblePages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const prevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const isLastPage = currentPageIndex === visiblePages.length - 1;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>{config.title}</CardTitle>
              {config.description && (
                <CardDescription>{config.description}</CardDescription>
              )}
              <div className="flex justify-between items-center text-sm text-slate-600">
                <span>Page {currentPageIndex + 1} of {visiblePages.length}</span>
                <div className="w-full max-w-xs bg-slate-200 rounded-full h-2 ml-4">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentPageIndex + 1) / visiblePages.length) * 100}%` }}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {currentPage && (
                <DynamicFormPage 
                  page={currentPage} 
                  isElementVisible={isElementVisible}
                />
              )}
              
              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevPage}
                  disabled={currentPageIndex === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                
                {isLastPage ? (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>
                ) : (
                  <Button type="button" onClick={nextPage}>
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </form>
      </FormProvider>
    </div>
  );
};
