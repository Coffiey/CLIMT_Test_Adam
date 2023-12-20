interface Body {
  downloadURL: string;
  name: string;
}

interface CreateSDImagerops {
  setImage: (value: string) => void;
  setImageLoading: (value: boolean) => void;
  setDisplayImageView: (value: boolean) => void;
  displayImageView: boolean;
}

interface AddPromptProps {
  setPrompt: (value: string) => void;,
  setNegativePrompt: (value: string) => void;,
  setGuidanceScale: (value: string) => void;,
  setNumInferenceSteps: (value: string) => void;,
  prompt:string,
  negativePrompt:string,
  guidanceScale:string,
  numInferenceSteps:string,
}

interface AddLoraProps {
  setLoraLoaded: (value: boolean) => void;
}

interface CreatedImageViewProps {
  image: string | null;
  imageLoading: boolean;
}
export type { Body, CreateSDImagerops, CreatedImageViewProps, AddLoraProps,AddPromptProps };
