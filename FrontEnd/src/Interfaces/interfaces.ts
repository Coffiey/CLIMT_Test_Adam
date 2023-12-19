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

interface AddLoraProps {
  setLoraLoaded: (value: boolean) => void;
}

interface CreatedImageViewProps {
  image: string | null;
  imageLoading: boolean;
}
export type { Body, CreateSDImagerops, CreatedImageViewProps, AddLoraProps };
