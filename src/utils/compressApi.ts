const getBackendUrl = (): string => {
  // Backend base URL (NO /compress here)
  const defaultBase = "https://full-shrimp-deeply.ngrok-free.app";

  if (!import.meta.env.VITE_BACKEND_URL) {
    console.warn("BACKEND_URL not found, using default:", defaultBase);
  }

  return defaultBase;
  console.log defaultBase;
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

export const compressFile = async (
  file: File,
  level: string,
  compressType: string
): Promise<CompressResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("compress_type", compressType);
    formData.append("level", level);

    const backendUrl = `${getBackendUrl()}/compress`;

    console.log("➡️ POSTing to:", backendUrl);

    const response = await fetch(backendUrl, {
      method: "POST",
      body: formData,
    });

    console.log("⬅️ Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Compression failed:", errorText);
      return { success: false, error: errorText };
    }

    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);

    const originalSize = file.size;
    const compressedSize = blob.size;
    const compressionRatio = Math.round(
      ((originalSize - compressedSize) / originalSize) * 100
    );

    return {
      success: true,
      downloadUrl,
      fileName: `${file.name.replace(/\.[^/.]+$/, "")}_compressed${file.name.slice(
        file.name.lastIndexOf(".")
      )}`,
      originalSize,
      compressedSize,
      compressionRatio,
    };
  } catch (err) {
    console.error("❌ Network error:", err);
    return { success: false, error: (err as Error).message };
  }
};
