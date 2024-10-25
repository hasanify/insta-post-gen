/* eslint-disable @next/next/no-img-element */
"use client";

import { UploadIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  const { pending } = useFormStatus();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <div className="flex w-full items-center justify-center transition-transform active:scale-95">
      <label
        className="relative flex h-36 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg bg-gray-200 px-2 py-4 text-center shadow-lg hover:bg-gray-300"
        htmlFor="dropzone-file">
        <div
          className={`absolute left-1/2 top-1/2 flex size-full -translate-x-1/2 -translate-y-1/2 justify-center ${selectedImage ? "visible" : "invisible"}`}>
          <img
            alt="Uploaded preview"
            className="size-full object-cover"
            src={selectedImage}
          />
          <button
            className="absolute left-1/2 top-1/2 flex w-4/5 max-w-80 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1 rounded-lg bg-gray-950 px-6 py-4 font-semibold text-white shadow-2xl"
            onClick={() => {
              setSelectedImage(undefined);
              if (inputRef.current) inputRef.current.value = "";
            }}
            type="button">
            <span>remove image</span>
            <XIcon className="size-4 text-white" />
          </button>
        </div>
        <div
          className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center pb-6 pt-5 ${selectedImage ? "invisible" : "visible"}`}>
          <UploadIcon className="mb-4 size-8" />
          <p className="text-sm">
            <span className="font-semibold">Click to upload</span>
          </p>
          <p className="text-xs">the cover image for your post</p>
        </div>
        <input
          accept="image/*"
          className="hidden"
          disabled={pending}
          id="dropzone-file"
          name="cover"
          onChange={handleImageUpload}
          ref={inputRef}
          required
          type="file"
        />
      </label>
    </div>
  );
};

export default ImageUpload;
