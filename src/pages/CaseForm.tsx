
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DynamicForm } from '@/components/forms/DynamicForm';
import { DynamicFormConfig } from '@/types/dynamicForm';
import { useTranslation } from '../hooks/useTranslation';

const CaseForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ticketType = searchParams.get('type') || 'Bug';
  const { t } = useTranslation();

  // This would typically come from an API or configuration
  const getFormConfig = (type: string): DynamicFormConfig => {
    const baseConfig = {
      id: 'case-form',
      title: t('form.createCase', { type }),
      description: t('form.fillForm', { type: type.toLowerCase() }),
      pages: [
        {
          id: 'basic-info',
          title: t('form.basicInformation'),
          description: t('form.generalInformation'),
          sections: [
            {
              id: 'general',
              title: t('form.generalInformation'),
              fields: [
                {
                  id: 'title',
                  type: 'text' as const,
                  label: t('form.caseTitle'),
                  placeholder: t('form.enterTitle'),
                  required: true,
                  validation: {
                    minLength: 10,
                    maxLength: 100
                  }
                },
                {
                  id: 'priority',
                  type: 'select' as const,
                  label: t('form.priority'),
                  required: true,
                  options: [
                    { label: 'Low', value: 'Low' },
                    { label: 'Medium', value: 'Medium' },
                    { label: 'High', value: 'High' },
                    { label: 'Critical', value: 'Critical' }
                  ]
                },
                {
                  id: 'assignee_email',
                  type: 'email' as const,
                  label: t('form.assigneeEmail'),
                  placeholder: 'assignee@company.com',
                  required: true
                }
              ]
            }
          ]
        },
        {
          id: 'details',
          title: t('form.caseDetails'),
          description: 'Provide detailed information about the case',
          sections: [
            {
              id: 'description-section',
              title: t('form.description'),
              fields: [
                {
                  id: 'description',
                  type: 'richtext' as const,
                  label: t('form.detailedDescription'),
                  placeholder: t('form.provideDescription'),
                  required: true
                },
                {
                  id: 'steps_to_reproduce',
                  type: 'textarea' as const,
                  label: t('form.stepsToReproduce'),
                  placeholder: '1. Step one\n2. Step two\n3. Step three',
                  conditionalRules: [
                    {
                      fieldId: 'priority',
                      operator: 'equals' as const,
                      value: 'Critical',
                      action: 'show' as const
                    }
                  ]
                },
                {
                  id: 'expected_behavior',
                  type: 'textarea' as const,
                  label: t('form.expectedBehavior'),
                  placeholder: t('form.whatShouldHappen'),
                  conditionalRules: [
                    {
                      fieldId: 'priority',
                      operator: 'equals' as const,
                      value: 'Critical',
                      action: 'show' as const
                    }
                  ]
                }
              ]
            },
            {
              id: 'additional-info',
              title: t('form.additionalInformation'),
              fields: [
                {
                  id: 'affected_users',
                  type: 'text' as const,
                  label: t('form.affectedUsers'),
                  placeholder: 'e.g., 100 users, All users, etc.'
                },
                {
                  id: 'business_impact',
                  type: 'radio' as const,
                  label: t('form.businessImpact'),
                  options: [
                    { label: 'No Impact', value: 'none' },
                    { label: 'Low Impact', value: 'low' },
                    { label: 'Medium Impact', value: 'medium' },
                    { label: 'High Impact', value: 'high' }
                  ]
                },
                {
                  id: 'due_date',
                  type: 'date' as const,
                  label: 'Due Date',
                  conditionalRules: [
                    {
                      fieldId: 'priority',
                      operator: 'equals' as const,
                      value: 'High',
                      action: 'show' as const
                    },
                    {
                      fieldId: 'priority',
                      operator: 'equals' as const,
                      value: 'Critical',
                      action: 'show' as const
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'review',
          title: t('form.reviewAndSubmit'),
          description: t('form.reviewInformation'),
          sections: [
            {
              id: 'confirmation',
              title: t('form.confirmation'),
              fields: [
                {
                  id: 'urgent_attention',
                  type: 'checkbox' as const,
                  label: t('form.urgentAttention'),
                  conditionalRules: [
                    {
                      fieldId: 'priority',
                      operator: 'equals' as const,
                      value: 'Critical',
                      action: 'show' as const
                    }
                  ]
                },
                {
                  id: 'notify_team',
                  type: 'checkbox' as const,
                  label: t('form.notifyTeam')
                },
                {
                  id: 'additional_notes',
                  type: 'textarea' as const,
                  label: t('form.additionalNotes'),
                  placeholder: 'Any additional information or special instructions...'
                }
              ]
            }
          ]
        }
      ],
      submitConfig: {
        apiUrl: '/api/cases',
        method: 'POST' as const,
        headers: {
          'Authorization': 'Bearer token-here' // This would be dynamic
        },
        onSuccess: {
          message: t('messages.caseCreated', { type }),
          redirectUrl: '/cases'
        },
        onError: {
          message: t('messages.caseCreationFailed')
        }
      }
    };

    return baseConfig;
  };

  const handleSuccess = () => {
    navigate('/cases');
  };

  return (
    <DynamicForm 
      config={getFormConfig(ticketType)} 
      onSuccess={handleSuccess}
    />
  );
};

export default CaseForm;
