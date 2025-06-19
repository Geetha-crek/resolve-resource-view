
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField } from '@/types/dynamicForm';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RichTextEditor } from './RichTextEditor';

interface DynamicFormFieldProps {
  field: FormField;
}

export const DynamicFormField: React.FC<DynamicFormFieldProps> = ({ field }) => {
  const { register, formState: { errors }, setValue, watch } = useFormContext();
  
  const fieldValue = watch(field.id);
  
  const getValidationRules = () => {
    const rules: any = {};
    
    if (field.required) {
      rules.required = `${field.label} is required`;
    }
    
    if (field.validation) {
      if (field.validation.pattern) {
        rules.pattern = {
          value: new RegExp(field.validation.pattern),
          message: `${field.label} format is invalid`
        };
      }
      
      if (field.validation.minLength) {
        rules.minLength = {
          value: field.validation.minLength,
          message: `${field.label} must be at least ${field.validation.minLength} characters`
        };
      }
      
      if (field.validation.maxLength) {
        rules.maxLength = {
          value: field.validation.maxLength,
          message: `${field.label} must not exceed ${field.validation.maxLength} characters`
        };
      }
      
      if (field.validation.min !== undefined) {
        rules.min = {
          value: field.validation.min,
          message: `${field.label} must be at least ${field.validation.min}`
        };
      }
      
      if (field.validation.max !== undefined) {
        rules.max = {
          value: field.validation.max,
          message: `${field.label} must not exceed ${field.validation.max}`
        };
      }
    }
    
    return rules;
  };

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            {...register(field.id, getValidationRules())}
          />
        );
        
      case 'textarea':
        return (
          <Textarea
            placeholder={field.placeholder}
            {...register(field.id, getValidationRules())}
          />
        );
        
      case 'currency':
        return (
          <Input
            type="number"
            step="0.01"
            placeholder={field.placeholder}
            {...register(field.id, getValidationRules())}
          />
        );
        
      case 'date':
        return (
          <Input
            type="date"
            {...register(field.id, getValidationRules())}
          />
        );
        
      case 'datetime':
        return (
          <Input
            type="datetime-local"
            {...register(field.id, getValidationRules())}
          />
        );
        
      case 'select':
        return (
          <Select onValueChange={(value) => setValue(field.id, value)} value={fieldValue}>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
        
      case 'radio':
        return (
          <RadioGroup onValueChange={(value) => setValue(field.id, value)} value={fieldValue}>
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`${field.id}-${option.value}`} />
                <label htmlFor={`${field.id}-${option.value}`}>{option.label}</label>
              </div>
            ))}
          </RadioGroup>
        );
        
      case 'checkbox':
        if (field.options && field.options.length > 1) {
          return (
            <div className="space-y-2">
              {field.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${field.id}-${option.value}`}
                    checked={fieldValue?.includes(option.value)}
                    onCheckedChange={(checked) => {
                      const currentValues = fieldValue || [];
                      if (checked) {
                        setValue(field.id, [...currentValues, option.value]);
                      } else {
                        setValue(field.id, currentValues.filter((v: string) => v !== option.value));
                      }
                    }}
                  />
                  <label htmlFor={`${field.id}-${option.value}`}>{option.label}</label>
                </div>
              ))}
            </div>
          );
        } else {
          return (
            <div className="flex items-center space-x-2">
              <Checkbox
                id={field.id}
                checked={fieldValue}
                onCheckedChange={(checked) => setValue(field.id, checked)}
              />
              <label htmlFor={field.id}>{field.label}</label>
            </div>
          );
        }
        
      case 'richtext':
        return (
          <RichTextEditor
            value={fieldValue || ''}
            onChange={(value) => setValue(field.id, value)}
            placeholder={field.placeholder}
          />
        );
        
      default:
        return (
          <Input
            placeholder={field.placeholder}
            {...register(field.id, getValidationRules())}
          />
        );
    }
  };

  return (
    <FormItem>
      {field.type !== 'checkbox' && (
        <FormLabel>{field.label} {field.required && <span className="text-red-500">*</span>}</FormLabel>
      )}
      <FormControl>
        {renderField()}
      </FormControl>
      {errors[field.id] && (
        <FormMessage>{errors[field.id]?.message as string}</FormMessage>
      )}
    </FormItem>
  );
};
