const getBackendUrl = (): string => {
  const defaultUrl = 'https://full-shrimp-deeply.ngrok-free.app/convert';

  if (!import.meta.env.VITE_BACKEND_URL) {
    console.warn('BACKEND_URL not found in environment variables, using default:', defaultUrl);
  }

  // Don’t append `/convert` here, because env already has it
  return import.meta.env.VITE_BACKEND_URL || defaultUrl;
};



export interface HtmlConversionResponse {
  success: boolean;
  downloadUrl?: string;
  fileName?: string;
  error?: string;
}

export const convertUrlToPdf = async (url: string): Promise<HtmlConversionResponse> => {
  try {
    const formData = new FormData();
    formData.append('url', url);
    formData.append('target', 'pdf');

    const backendUrl = getBackendUrl();
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      let errorMessage = 'URL conversion failed. Please try again.';
      
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
    
    // Generate file name from URL
    const urlObj = new URL(url);
    const domain = urlObj.hostname.replace('www.', '');
    const fileName = `${domain}.pdf`;

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
