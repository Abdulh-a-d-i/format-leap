// src/components/MergeButton.tsx
import React from 'react';
import { RefreshCw } from 'lucide-react';

interface MergeButtonProps {
  disabled: boolean;
  loading: boolean;
  onClick: () => void;
}

const MergeButton: React.FC<MergeButtonProps> = ({
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
          Merging...
        </>
      ) : (
        <>
          <RefreshCw className="w-5 h-5" />
          Merge Files
        </>
      )}
    </button>
  );
};

export default MergeButton;
