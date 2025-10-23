
import React, { useState, useCallback } from 'react';
import { analyzeImage } from './services/geminiService';
import type { AnalysisResult, ImageFile } from './types';
import { ImageUpload } from './components/ImageUpload';
import { ResultDisplay } from './components/ResultDisplay';
import { Loader } from './components/Loader';
import { ErrorMessage } from './components/ErrorMessage';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<ImageFile | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback((file: ImageFile) => {
    setImageFile(file);
    setAnalysisResult(null);
    setError(null);
  }, []);

  const handleClear = useCallback(() => {
    if (imageFile?.previewUrl) {
      URL.revokeObjectURL(imageFile.previewUrl);
    }
    setImageFile(null);
    setAnalysisResult(null);
    setError(null);
    setIsLoading(false);
  }, [imageFile]);

  const handleAnalyzeClick = async () => {
    if (!imageFile) {
      setError("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeImage(imageFile.base64, imageFile.mimeType);
      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            Image Analyzer & Finder
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Let Gemini describe your image and find similar ones across the web.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-4">
            <ImageUpload
              onImageUpload={handleImageUpload}
              onClear={handleClear}
              imagePreviewUrl={imageFile?.previewUrl || null}
            />
            <button
              onClick={handleAnalyzeClick}
              disabled={!imageFile || isLoading}
              className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-200 disabled:bg-gray-700 disabled:cursor-not-allowed disabled:text-gray-400"
            >
              {isLoading ? 'Analyzing...' : 'Analyze Image'}
            </button>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 min-h-[300px] flex items-center justify-center">
            {isLoading ? (
              <Loader />
            ) : error ? (
              <ErrorMessage message={error} />
            ) : analysisResult ? (
              <ResultDisplay result={analysisResult} />
            ) : (
              <div className="text-center text-gray-500">
                <p>Upload an image and click "Analyze Image" to see the magic happen.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
