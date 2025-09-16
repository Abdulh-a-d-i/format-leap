import { getConversionOptions } from '@/components/ConversionSelector';

// Get backend URL from environment or use default
const getBackendUrl = (): string => {
  // In a real Vite environment, we'd use import.meta.env.VITE_BACKEND_URL
  // For now, we'll use a default since .env isn't set up
  const defaultUrl = 'http://localhost:8000/convert';
  
  // Log warning if using default URL
  if (!import.meta.env.VITE_BACKEND_URL) {
    console.warn('BACKEND_URL not found in environment variables, using default:', defaultUrl);
  }
  
  return import.meta.env.VITE_BACKEND_URL || defaultUrl;
};

export interface ConversionResponse {
  success: boolean;
  downloadUrl?: string;
  fileName?: string;
  error?: string;
}

export const convertFile = async (
  file: File,
  conversionType: string
): Promise<ConversionResponse> => {
  try {
    // Get the target format from conversion type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    const options = getConversionOptions(fileExtension);
    const selectedOption = options.find(opt => opt.value === conversionType);
    
    if (!selectedOption) {
      throw new Error('Invalid conversion type selected');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('target', selectedOption.target);

    const backendUrl = getBackendUrl();
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      let errorMessage = 'Conversion failed. Please try again.';
      
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
    
    // Generate file name
    const originalName = file.name.split('.')[0];
    const targetExt = selectedOption.target === 'pdfa' ? 'pdf' : selectedOption.target;
    const fileName = selectedOption.target === 'jpg' && file.name.toLowerCase().includes('.pdf') 
      ? `${originalName}.zip` // PDF to JPG typically returns a ZIP
      : `${originalName}.${targetExt}`;

    return {
      success: true,
      downloadUrl,
      fileName,
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