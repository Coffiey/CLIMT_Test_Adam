interface Body {
  downloadURL: string;
  name: string;
}

interface CreateSDImagerops {
  setImage: (value: string) => void;
  setImageLoading: (value: boolean) => void;
  setDisplayImageView: (value: boolean) => void;
  displayImageView: boolean;
  imageLoading: boolean;
  image: string | null;
}

interface AddPromptProps {
  setPrompt: (value: string) => void;
  setNegativePrompt: (value: string) => void;
  setGuidanceScale: (value: string) => void;
  setNumInferenceSteps: (value: string) => void;
  setStrength: (value: string) => void;
  setUploadedImage: (value: null | string) => void;
  prompt: string;
  negativePrompt: string;
  guidanceScale: string;
  numInferenceSteps: string;
  axiosURL: string;
  strength: string;
  uploadedImage: string | null;
}

interface AddLoraProps {
  setLoraLoaded: (value: boolean) => void;
  setLoraScale: (value: string) => void;
  loraLoaded: boolean;
  loraScale: string;
}

interface CreatedImageViewProps {
  image: string | null;
  imageLoading: boolean;
}
export type {
  Body,
  CreateSDImagerops,
  CreatedImageViewProps,
  AddLoraProps,
  AddPromptProps,
};
