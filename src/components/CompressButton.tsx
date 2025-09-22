// src/components/CompressButton.tsx
import React from 'react';
import { RefreshCw } from 'lucide-react';

interface CompressButtonProps {
  disabled: boolean;
  loading: boolean;
  onClick: () => void;
}

const CompressButton: React.FC<CompressButtonProps> = ({
  disabled,
  loading,
  onClick,
}) => {
  return (
    <button
      className="btn-converter text-xl py-6 px-12 flex items-center justify-center gap-2 mx-auto"
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? (
        <>
          <div className="loading-spinner" />
          Compressing...
        </>
      ) : (
        <>
          <RefreshCw className="w-5 h-5" />
          Compress File
        </>
      )}
    </button>
  );
};

export default CompressButton;
