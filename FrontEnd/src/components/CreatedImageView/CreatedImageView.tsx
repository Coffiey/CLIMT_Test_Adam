import { CreatedImageViewProps } from "../../Interfaces/interfaces";

function CreatedImageView({ image, imageLoading }: CreatedImageViewProps) {
  return (
    <div>
      <p>Your Image</p>
      {imageLoading ? (
        <img src='media/4pnu.gif' />
      ) : (
        <>
          {image ? <img src={image} /> : <img src='/media/placeholder.jpg' />}
        </>
      )}
    </div>
  );
}

export default CreatedImageView;
