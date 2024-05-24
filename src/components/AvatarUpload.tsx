// AvatarUpload.tsx
import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

interface Prop {
  callback: (url: string) => any;
}
const AvatarUpload = ({ callback }: Prop) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setImageUrl(URL.createObjectURL(file));
    uploadAvatar(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const uploadAvatar = async (avatar: File | null) => {
    console.log({ avatar });
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
        }
      );

      console.log("Upload successful", response.data);
      callback(response.data.secure_url ?? "");

      // Handle the uploaded image URL as needed (e.g., save it to the database)
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
      {/* <button onClick={uploadAvatar}>Upload Avatar</button> */}
    </div>
  );
};

export default AvatarUpload;
