import React from 'react';
import { RefreshCw } from 'lucide-react';

interface ConvertButtonProps {
  disabled: boolean;
  loading: boolean;
  onClick: () => void;
}

const ConvertButton: React.FC<ConvertButtonProps> = ({
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
          Converting...
        </>
      ) : (
        <>
          <RefreshCw className="w-5 h-5" />
          Convert File
        </>
      )}
    </button>
  );
};

export default ConvertButton;