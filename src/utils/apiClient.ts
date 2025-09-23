// Unified API client for all backend operations
const getBackendUrl = (): string => {
  const envUrl = import.meta.env.VITE_BACKEND_URL;
  const defaultUrl = 'https://full-shrimp-deeply.ngrok-free.app';
  
  if (!envUrl) {
    console.warn('⚠️ VITE_BACKEND_URL not set, using default:', defaultUrl);
  }
  
  return envUrl || defaultUrl;
};

export interface ApiResponse {
  success: boolean;
  downloadUrl?: string;
  fileName?: string;
  originalSize?: number;
  compressedSize?: number;
  compressionRatio?: number;
  originalSizes?: number[];
  mergedSize?: number;
  error?: string;
}

// Generic file conversion
export const convertFile = async (file: File, target: string): Promise<ApiResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('target', target);

    const response = await fetch(`${getBackendUrl()}/convert`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, error: errorText || 'Conversion failed' };
    }

    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);
    const originalName = file.name.split('.')[0];
    const fileName = `${originalName}.${target}`;

    return { success: true, downloadUrl, fileName };
  } catch (error) {
    return { success: false, error: 'Network error occurred' };
  }
};

// URL to PDF conversion
export const convertUrlToPdf = async (url: string): Promise<ApiResponse> => {
  try {
    const formData = new FormData();
    formData.append('url', url);
    formData.append('target', 'pdf');

    const response = await fetch(`${getBackendUrl()}/convert-url`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, error: errorText || 'URL conversion failed' };
    }

    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);
    const fileName = 'webpage.pdf';

    return { success: true, downloadUrl, fileName };
  } catch (error) {
    return { success: false, error: 'Network error occurred' };
  }
};

// File compression
export const compressFile = async (file: File, level: string = 'medium', compressType?: string): Promise<ApiResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('level', level);
    
    // Determine compress type from file extension if not provided
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const type = compressType || getCompressType(fileExt || '');
    formData.append('compress_type', type);

    const response = await fetch(`${getBackendUrl()}/compress`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, error: errorText || 'Compression failed' };
    }

    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);
    const originalName = file.name.split('.')[0];
    const fileName = `${originalName}_compressed.${fileExt}`;
    
    const originalSize = file.size;
    const compressedSize = blob.size;
    const compressionRatio = Math.round(((originalSize - compressedSize) / originalSize) * 100);

    return { 
      success: true, 
      downloadUrl, 
      fileName, 
      originalSize, 
      compressedSize, 
      compressionRatio 
    };
  } catch (error) {
    return { success: false, error: 'Network error occurred' };
  }
};

// File merging
export const mergeFiles = async (files: File[], mergeType: string): Promise<ApiResponse> => {
  try {
    if (files.length < 2) {
      return { success: false, error: 'At least 2 files required for merging' };
    }

    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    formData.append('merge_type', mergeType);

    const response = await fetch(`${getBackendUrl()}/merge`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, error: errorText || 'Merge failed' };
    }

    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);
    const fileName = `merged.${getExtensionForMergeType(mergeType)}`;
    
    const originalSizes = files.map(f => f.size);
    const mergedSize = blob.size;

    return { 
      success: true, 
      downloadUrl, 
      fileName, 
      originalSizes, 
      mergedSize 
    };
  } catch (error) {
    return { success: false, error: 'Network error occurred' };
  }
};

// File splitting
export const splitFile = async (file: File, ranges: string): Promise<ApiResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('ranges', ranges);

    const response = await fetch(`${getBackendUrl()}/split`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, error: errorText || 'Split failed' };
    }

    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);
    const fileName = 'split_pages.zip';

    return { success: true, downloadUrl, fileName };
  } catch (error) {
    return { success: false, error: 'Network error occurred' };
  }
};

// Jira login
export const loginToJira = async (): Promise<{ sessionId?: string; error?: string }> => {
  try {
    const response = await fetch(`${getBackendUrl()}/login/jira`);
    
    if (!response.ok) {
      return { error: 'Jira login failed' };
    }
    
    const data = await response.json();
    return { sessionId: data.session_id };
  } catch (error) {
    return { error: 'Network error occurred' };
  }
};

// Word to Jira conversion
export const convertWordToJira = async (file: File, sessionId: string): Promise<ApiResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${getBackendUrl()}/convert/word-to-jira?session_id=${sessionId}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, error: errorText || 'Jira conversion failed' };
    }

    const result = await response.json();
    return { success: true, ...result };
  } catch (error) {
    return { success: false, error: 'Network error occurred' };
  }
};

// Jira to Word conversion
export const convertJiraToWord = async (sessionId: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${getBackendUrl()}/convert/jira-to-word?session_id=${sessionId}`, {
      method: 'POST',
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, error: errorText || 'Jira to Word conversion failed' };
    }

    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);
    const fileName = 'jira_export.docx';

    return { success: true, downloadUrl, fileName };
  } catch (error) {
    return { success: false, error: 'Network error occurred' };
  }
};

// PDF to Notion conversion
export const convertPdfToNotion = async (file: File): Promise<ApiResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${getBackendUrl()}/convert/pdf-to-notion`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, error: errorText || 'Notion conversion failed' };
    }

    const result = await response.json();
    return { success: true, ...result };
  } catch (error) {
    return { success: false, error: 'Network error occurred' };
  }
};

// Helper functions
const getCompressType = (extension: string): string => {
  const typeMap: Record<string, string> = {
    'pdf': 'pdf',
    'doc': 'word',
    'docx': 'word',
    'ppt': 'powerpoint',
    'pptx': 'powerpoint',
    'xls': 'excel',
    'xlsx': 'excel',
    'csv': 'csv',
    'jpg': 'image',
    'jpeg': 'image',
    'png': 'image',
    'gif': 'image',
    'bmp': 'image',
  };
  return typeMap[extension] || 'pdf';
};

const getExtensionForMergeType = (mergeType: string): string => {
  const extMap: Record<string, string> = {
    'pdf': 'pdf',
    'word': 'docx',
    'powerpoint': 'pptx',
    'excel': 'xlsx',
    'images': 'pdf',
  };
  return extMap[mergeType] || 'pdf';
};