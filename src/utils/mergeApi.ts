// mergeApi.ts (new)
const getBackendUrl = (): string => {
  const defaultUrl = 'https://full-shrimp-deeply.ngrok-free.app/merge';

  if (!import.meta.env.VITE_BACKEND_URL) {
    console.warn(
      'BACKEND_URL not found in environment variables, using default:',
      defaultUrl
    );
  }

  // Force endpoint to `/merge`
  const baseUrl = import.meta.env.VITE_BACKEND_URL || defaultUrl;
  return baseUrl.replace(/\/(convert|convert-url)$/, '/merge');
};

export interface MergeResponse {
  success: boolean;
  downloadUrl?: string;
  fileName?: string;
  originalSizes?: number[];
  mergedSize?: number;
  error?: string;
}

export const mergeFiles = async (files: File[], mergeType: string): Promise<MergeResponse> => {
  try {
    if (files.length < 2) {
      throw new Error('At least two files are required for merging');
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('merge_type', mergeType);

    const backendUrl = getBackendUrl();
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      let errorMessage = 'File merge failed. Please try again.';
      
      try {
        if (response.headers.get('content-type')?.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorData.message || errorMessage;
        } else {
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
        }
      } catch (parseError) {
        console.error('Error parsing error response:', parseError);
      }
      
      return {
        success: false,
        error: errorMessage,
      };
    }

    // Create blob from response
    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);
    
    // Generate merged file name
    const extension = getExtension(mergeType);
    const fileName = `merged.${extension}`;

    // Calculate size info if needed
    const originalSizes = files.map(f => f.size);
    const mergedSize = blob.size;

    return {
      success: true,
      downloadUrl,
      fileName,
      originalSizes,
      mergedSize,
    };
  } catch (error) {
    console.error('Network error:', error);
    return {
      success: false,
      error: error instanceof Error 
        ? `Network error: ${error.message}` 
        : 'Network error occurred. Please check your connection and try again.',
    };
  }
};

const getExtension = (mergeType: string): string => {
  const extensions: Record<string, string> = {
    pdf: 'pdf',
    word: 'docx',
    powerpoint: 'pptx',
    excel: 'xlsx',
    images: 'pdf'
  };
  return extensions[mergeType] || 'pdf';
};
