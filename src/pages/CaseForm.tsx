
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DynamicForm } from '@/components/forms/DynamicForm';
import { DynamicFormConfig } from '@/types/dynamicForm';

const CaseForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ticketType = searchParams.get('type') || 'Bug';

  // This would typically come from an API or configuration
  const getFormConfig = (type: string): DynamicFormConfig => {
    const baseConfig = {
      id: 'case-form',
      title: `Create ${type} Case`,
      description: `Fill out the form below to create a new ${type.toLowerCase()} case.`,
      pages: [
        {
          id: 'basic-info',
          title: 'Basic Information',
          description: 'Provide basic details about the case',
          sections: [
            {
              id: 'general',
              title: 'General Information',
              fields: [
                {
                  id: 'title',
                  type: 'text' as const,
                  label: 'Case Title',
                  placeholder: 'Enter a descriptive title',
                  required: true,
                  validation: {
                    minLength: 10,
                    maxLength: 100
                  }
                },
                {
                  id: 'priority',
                  type: 'select' as const,
                  label: 'Priority',
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
                  label: 'Assignee Email',
                  placeholder: 'assignee@company.com',
                  required: true
                }
              ]
            }
          ]
        },
        {
          id: 'details',
          title: 'Case Details',
          description: 'Provide detailed information about the case',
          sections: [
            {
              id: 'description-section',
              title: 'Description',
              fields: [
                {
                  id: 'description',
                  type: 'richtext' as const,
                  label: 'Detailed Description',
                  placeholder: 'Provide a detailed description of the issue or request...',
                  required: true
                },
                {
                  id: 'steps_to_reproduce',
                  type: 'textarea' as const,
                  label: 'Steps to Reproduce',
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
                  label: 'Expected Behavior',
                  placeholder: 'What should happen?',
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
              title: 'Additional Information',
              fields: [
                {
                  id: 'affected_users',
                  type: 'text' as const,
                  label: 'Number of Affected Users',
                  placeholder: 'e.g., 100 users, All users, etc.'
                },
                {
                  id: 'business_impact',
                  type: 'radio' as const,
                  label: 'Business Impact',
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
          title: 'Review & Submit',
          description: 'Review your information and submit the case',
          sections: [
            {
              id: 'confirmation',
              title: 'Confirmation',
              fields: [
                {
                  id: 'urgent_attention',
                  type: 'checkbox' as const,
                  label: 'This case requires urgent attention',
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
                  label: 'Send notifications to the entire team'
                },
                {
                  id: 'additional_notes',
                  type: 'textarea' as const,
                  label: 'Additional Notes',
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
          message: `${type} case has been created successfully!`,
          redirectUrl: '/cases'
        },
        onError: {
          message: 'Failed to create case. Please try again.'
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
