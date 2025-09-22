const getBackendUrl = (): string => {
  const defaultBase = "https://full-shrimp-deeply.ngrok-free.app";

  if (!import.meta.env.VITE_BACKEND_URL) {
    console.warn("⚠️ BACKEND_URL not found, using default:", defaultBase);
  } else {
    console.log("✅ Using backend from env:", import.meta.env.VITE_BACKEND_URL);
  }

  return import.meta.env.VITE_BACKEND_URL || defaultBase;
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
    console.log("📂 Selected file:", {
      name: file.name,
      size: file.size,
      type: file.type,
    });
    console.log("⚙️ Compression params:", { level, compressType });

    const formData = new FormData();
    formData.append("file", file);
    formData.append("compress_type", compressType);
    formData.append("level", level);

    const backendUrl = `${getBackendUrl()}/compress`;
    console.log("➡️ About to POST to:", backendUrl);

    const response = await fetch(backendUrl, {
      method: "POST",
      body: formData,
    });

    console.log("⬅️ Response received:", {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
    });

    if (!response.ok) {
      let errorMessage = "Unknown error";

      try {
        const contentType = response.headers.get("content-type");
        console.log("🧾 Error response content-type:", contentType);

        if (contentType?.includes("application/json")) {
          const errorJson = await response.json();
          console.error("❌ Error JSON:", errorJson);
          errorMessage = errorJson.detail || errorJson.message || JSON.stringify(errorJson);
        } else {
          const errorText = await response.text();
          console.error("❌ Error Text:", errorText);
          errorMessage = errorText || "Compression failed.";
        }
      } catch (parseErr) {
        console.error("⚠️ Could not parse error response:", parseErr);
      }

      return { success: false, error: errorMessage };
    }

    // ✅ success path
    const blob = await response.blob();
    console.log("📦 Got compressed file blob:", {
      size: blob.size,
      type: blob.type,
    });

    const downloadUrl = URL.createObjectURL(blob);
    const originalSize = file.size;
    const compressedSize = blob.size;
    const compressionRatio = Math.round(
      ((originalSize - compressedSize) / originalSize) * 100
    );

    console.log("✅ Compression successful:", {
      originalSize,
      compressedSize,
      compressionRatio,
    });

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
    console.error("💥 Network/JS error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
};
