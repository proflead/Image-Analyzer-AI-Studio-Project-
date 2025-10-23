
import React, { useRef } from 'react';
import type { ImageFile } from '../types';

interface ImageUploadProps {
  onImageUpload: (imageFile: ImageFile) => void;
  onClear: () => void;
  imagePreviewUrl: string | null;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, onClear, imagePreviewUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        const previewUrl = URL.createObjectURL(file);
        onImageUpload({
          previewUrl,
          base64: base64String,
          mimeType: file.type,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      <div className="w-full aspect-video bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center relative overflow-hidden">
        {imagePreviewUrl ? (
          <>
            <img src={imagePreviewUrl} alt="Preview" className="w-full h-full object-contain" />
            <button
              onClick={onClear}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-red-500"
              aria-label="Clear image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </>
        ) : (
          <div className="text-center">
            <button
              onClick={handleUploadClick}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-200"
            >
              Upload an Image
            </button>
            <p className="mt-2 text-sm text-gray-400">PNG, JPG, or WEBP</p>
          </div>
        )}
      </div>
    </div>
  );
};
