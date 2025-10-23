
export interface WebSource {
  uri: string;
  title: string;
}

export interface GroundingChunk {
  web?: WebSource;
}

export interface AnalysisResult {
  description: string;
  similarImages: GroundingChunk[];
}

export interface ImageFile {
  previewUrl: string;
  base64: string;
  mimeType: string;
}
