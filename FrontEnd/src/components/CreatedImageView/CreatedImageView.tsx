import { useEffect, useState } from "react";
import { CreatedImageViewProps } from "../../Interfaces/interfaces";

function CreatedImageView({ image, imageLoading }: CreatedImageViewProps) {
  const [imageURL, setImageURL] = useState<string | null>(null)

  useEffect(()=>{
    if (image) {
      setImageURL(image.slice(17))
    }
    console.log(imageURL)

  },[image])
  return (
    <div>
      <p>Your Image</p>
      {imageLoading ? (
        <img src='media/4pnu.gif' />
      ) : (
        <>
          {imageURL ? <img src={`.${imageURL}`} /> : <img src='/media/placeholder.jpg' />}
        </>
      )}
    </div>
  );
}

export default CreatedImageView;
