
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-t-indigo-500 border-gray-700 rounded-full animate-spin"></div>
      <p className="text-lg text-gray-300">Analyzing image...</p>
    </div>
  );
};
