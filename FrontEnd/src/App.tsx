import "./App.css";
import { useState } from "react";
import CreatedImageView from "./components/CreatedImageView/CreatedImageView";
import CreateSDImage from "./components/createSDImage/CreateSDImage";

function App() {
  const [displayImageView, setDisplayImageView] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);

  return (
    <>
      <CreateSDImage
        setImage={setImage}
        setImageLoading={setImageLoading}
        setDisplayImageView={setDisplayImageView}
        displayImageView={displayImageView}
      />
      <CreatedImageView
        image={image}
        imageLoading={imageLoading}
      />
      )
    </>
  );
}

export default App;
