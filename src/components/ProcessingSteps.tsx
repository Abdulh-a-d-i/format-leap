import React from 'react';
import { Check, Loader2 } from 'lucide-react';

interface ProcessingStep {
  label: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
}

interface ProcessingStepsProps {
  steps: ProcessingStep[];
}

const ProcessingSteps: React.FC<ProcessingStepsProps> = ({ steps }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground neon-text">
        Processing Status
      </h3>
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={`
              flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300
              ${step.status === 'completed' 
                ? 'bg-success text-success-foreground' 
                : step.status === 'processing'
                ? 'bg-primary text-primary-foreground animate-cyber-pulse'
                : step.status === 'error'
                ? 'bg-error text-error-foreground'
                : 'bg-muted text-muted-foreground'
              }
            `}>
              {step.status === 'completed' ? (
                <Check className="w-4 h-4" />
              ) : step.status === 'processing' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <span className="text-xs font-bold">{index + 1}</span>
              )}
            </div>
            <span className={`
              text-sm font-medium transition-colors duration-300
              ${step.status === 'completed' 
                ? 'text-success' 
                : step.status === 'processing'
                ? 'text-primary'
                : step.status === 'error'
                ? 'text-error'
                : 'text-muted-foreground'
              }
            `}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessingSteps;