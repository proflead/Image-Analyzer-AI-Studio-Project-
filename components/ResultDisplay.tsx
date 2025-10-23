
import React from 'react';
import type { AnalysisResult } from '../types';

interface ResultDisplayProps {
  result: AnalysisResult | null;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  if (!result) return null;

  const validLinks = result.similarImages.filter(chunk => chunk.web && chunk.web.uri);

  return (
    <div className="space-y-6 animate-fade-in w-full">
      <div>
        <h2 className="text-2xl font-bold text-indigo-600 mb-3">Description</h2>
        <p className="text-gray-700 leading-relaxed bg-gray-100 p-4 rounded-lg">{result.description}</p>
      </div>
      
      {validLinks.length > 0 && (
        <div className="w-full">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3">Similar Images on the Web</h2>
          <ul className="divide-y divide-gray-200 bg-gray-100 p-4 rounded-lg max-h-96 overflow-y-auto">
            {validLinks.map((chunk, index) => (
              <li key={index} className="py-3">
                <a
                  href={chunk.web!.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <p 
                    className="font-semibold text-indigo-600 group-hover:text-indigo-500 group-hover:underline transition-colors duration-200 truncate"
                    title={chunk.web!.title || chunk.web!.uri}
                  >
                    {chunk.web!.title || 'Untitled Link'}
                  </p>
                  <p 
                    className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-200 truncate"
                    title={chunk.web!.uri}
                  >
                    {chunk.web!.uri}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
