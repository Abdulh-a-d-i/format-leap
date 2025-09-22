const getBackendUrl = (): string => {
  const defaultUrl = 'https://full-shrimp-deeply.ngrok-free.app';

  if (!import.meta.env.VITE_BACKEND_URL) {
    console.warn(
      'BACKEND_URL not found in environment variables, using default:',
      defaultUrl
    );
  }

  // Force endpoint to `/compress`
  const baseUrl = import.meta.env.VITE_BACKEND_URL || defaultUrl;
  //return baseUrl.replace(/\/(convert|convert-url)$/, '/compress');
  return defaultUrl;
};

export interface CompressResponse {
  success: boolean;
  downloadUrl?: string;
  fileName?: string;
  originalSize?: number;
  compressedSize?: number;
  compressionRatio?: number;
  error?: string;
}

export const compressFile = async (file: File, level: string, compressType: string): Promise<CompressResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('compress_type', compressType);
    formData.append('level', level);

    const backendUrl = getBackendUrl();
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      let errorMessage = 'File compression failed. Please try again.';
      
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
    
    // Generate compressed file name
    const originalName = file.name;
    const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.'));
    const extension = originalName.substring(originalName.lastIndexOf('.'));
    const fileName = `${nameWithoutExt}_compressed${extension}`;

    // Calculate compression info if available
    const originalSize = file.size;
    const compressedSize = blob.size;
    const compressionRatio = Math.round(((originalSize - compressedSize) / originalSize) * 100);

    return {
      success: true,
      downloadUrl,
      fileName,
      originalSize,
      compressedSize,
      compressionRatio,
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
