import { useEffect, useState } from "react";
import { CreatedImageViewProps } from "../../Interfaces/interfaces";
import "./CreatedImageView.css";

function CreatedImageView({ image, imageLoading }: CreatedImageViewProps) {
  const [imageURL, setImageURL] = useState<string | null>(null);

  const handleDownload = () => {
    const link = document.createElement("a");
    if (imageURL) {
      link.href = imageURL;
      link.download = "downloaded_image.jpg";
      link.click();
    }
  };

  useEffect(() => {
    if (image) {
      setImageURL(image.slice(17));
    }
    console.log(imageURL);
  }, [image]);
  return (
    <div className='CIVconainer'>
      <p className={imageURL ? "FinalImageTitle" : "FinalPlaceHolderTitle"}>
        Your Image
      </p>
      {imageLoading ? (
        <img
          className='finalImage'
          src='media/4pnu.gif'
        />
      ) : (
        <>
          {imageURL ? (
            <img
              className='finalImage'
              src={`.${imageURL}`}
            />
          ) : (
            <img
              className='finalImage'
              src='/media/placeholder-image.png'
            />
          )}
          {imageURL && <button onClick={handleDownload}>Download Image</button>}
        </>
      )}
    </div>
  );
}

export default CreatedImageView;
