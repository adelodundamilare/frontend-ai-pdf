// AvatarUpload.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

import ProfileImage from "@/assets/profile.png";

interface Prop {
  callback: (url: string) => any;
}

const AvatarUpload = ({ callback }: Prop) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setImageUrl(URL.createObjectURL(file));
    uploadAvatar(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const uploadAvatar = async (avatar: File | null) => {
    if (!avatar) return;

    try {
      const formData = new FormData();
      formData.append("file", avatar);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_PUBLIC_CLOUD_NAME
        }/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            }
          },
        }
      );

      console.log("Upload successful", response.data);
      callback(response.data.secure_url ?? "");

      // Reset progress after upload
      setUploadProgress(0);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Avatar"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
        ) : (
          <p>Drag & drop an avatar file here, or click to select one</p>
        )}
      </div>
      {uploadProgress > 0 && (
        <div style={{ marginTop: "10px" }}>
          <progress className="" value={uploadProgress} max="100" />
          <span>{uploadProgress}%</span>
        </div>
      )}
    </div>
  );
};

export default AvatarUpload;

interface ImageProps {
  imageUrl: string;
  className?: string;
  onClick?: () => void;
}

export const AvatarImage: React.FC<ImageProps> = ({
  imageUrl,
  className,
  onClick,
}) => {
  const [base64, setBase64] = useState<string | null>(null);

  async function fetchImageAsBase64(imageUrl: string): Promise<string> {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  useEffect(() => {
    fetchImageAsBase64(imageUrl).then(setBase64).catch(console.error);
  }, [imageUrl]);

  return base64 ? (
    <img
      src={base64 ?? ProfileImage}
      alt="Avatar"
      className={"w-[50px] h-[50px] object-cover rounded-md" + " " + className}
      onClick={onClick}
    />
  ) : (
    <img
      src={ProfileImage}
      alt="Avatar"
      className={"w-[50px] h-[50px] object-cover rounded-md" + " " + className}
      onClick={onClick}
    />
  );
};
