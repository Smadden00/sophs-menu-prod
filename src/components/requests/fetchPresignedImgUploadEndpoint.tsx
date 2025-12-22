import { PresignedImgUploadResponse } from "../../types/index";

interface FetchPresignedImgUploadEndpointProps {
  fileType: string;
  getAccessTokenSilently: () => Promise<string>;
}

export default async function FetchPresignedImgUploadEndpoint({fileType, getAccessTokenSilently}: FetchPresignedImgUploadEndpointProps): Promise<PresignedImgUploadResponse> {
  try {
    const token = await getAccessTokenSilently();

    const response = await fetch(
      `https://sophsdatabasedomain.duckdns.org/api/recipes/presign-image-upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentType: fileType,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Error in fetching presigned image upload URL.");
    }

    const javascriptResponse = await response.json();

    return {
      imgUploadUrl: javascriptResponse.uploadUrl,
      imgPublicUrl: javascriptResponse.publicUrl,
    };

  } catch (error) {
    console.error("Error fetching presigned image upload URL: ", error);
    throw error;
  }
}
