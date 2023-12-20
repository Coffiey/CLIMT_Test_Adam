import { ChangeEvent, useState } from "react";
import axios from "axios";
import "./CreateSDImage.css";
import {
  TEXT_TO_IMAGE_URL,
  IMAGE_TO_IMAGE_URL,
} from "../../Constants/Constants";
import { CreateSDImagerops } from "../../Interfaces/interfaces";

import AddLora from "../addLora/AddLora";
import AddPrompts from "../AddPrompts/AddPrompts";

function CreateSDImage({
  setImage,
  setImageLoading,
  setDisplayImageView,
  displayImageView,
}: CreateSDImagerops) {
  const [addLora, setAddLora] = useState<boolean>(false);
  const [loraLoaded, setLoraLoaded] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const [axiosURL, setAxiosURL] = useState<string>(TEXT_TO_IMAGE_URL);
  const [uploadedImage, setUploadedImage] = useState<null | string>(null);
  const [negativePrompt, setNegativePrompt] = useState<string>("");
  const [guidanceScale, setGuidanceScale] = useState<string>("7");
  const [numInferenceSteps, setNumInferenceSteps] = useState<string>("5");
  const [strength, setStrength] = useState<string>("5");
  const [loraScale, setLoraScale] = useState<string>("5");

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]!;
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUploadedImage(reader.result as string);
    };
  };

  const handleLoraScaleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoraScale(event.target.value);
  };

  const handleStrengthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStrength(event.target.value);
  };

  const handleReset = () => {
    setDisplayImageView(false);
  };

  const handleGenerateAIImage = async () => {
    let funcURL = axiosURL;
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("negativePrompt", negativePrompt);
    formData.append("guidanceScale", guidanceScale);
    formData.append("numInferenceSteps", numInferenceSteps);

    if (axiosURL === IMAGE_TO_IMAGE_URL && uploadedImage) {
      formData.append("strength", strength);
      formData.append("image", uploadedImage);
    }

    if (loraLoaded) {
      funcURL = funcURL + `?lora_scale=${loraScale}`;
    }

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    try {
      setImageLoading(true);
      setDisplayImageView(true);
      const results = await axios.post(funcURL, formData, {
        headers,
        responseType: "json",
      });
      setImage(results.data.generatedImageURL);
      setImageLoading(false);
    } catch (err: any) {
      console.error("Error:", err.message);
    }
  };

  return (
    <>
      {displayImageView ? (
        <div className='CSDContainer'>
          <button onClick={handleReset}>Generate Another Image</button>
        </div>
      ) : (
        <div className='CSDContainer'>
          <div className='ButtonDiv'>
            <button
              onClick={() => {
                setUploadedImage(null);
                setAxiosURL(TEXT_TO_IMAGE_URL);
              }}
            >
              Text To Image
            </button>
            <button onClick={() => setAxiosURL(IMAGE_TO_IMAGE_URL)}>
              Image To Image
            </button>
            <button
              disabled={loraLoaded}
              onClick={() => setAddLora(!addLora)}
            >
              Add Lora
            </button>
          </div>
          <div className='promptDivContainer'>
            <AddPrompts
              setPrompt={setPrompt}
              setNegativePrompt={setNegativePrompt}
              setGuidanceScale={setGuidanceScale}
              setNumInferenceSteps={setNumInferenceSteps}
              prompt={prompt}
              negativePrompt={negativePrompt}
              guidanceScale={guidanceScale}
              numInferenceSteps={numInferenceSteps}
            />

            <div className='ImageDiv'>
              {axiosURL === IMAGE_TO_IMAGE_URL && (
                <>
                  <div>
                    <p>Image Strength: {strength}</p>
                    <span>Low</span>
                    <input
                      type='range'
                      min='0'
                      max='1'
                      step='0.1'
                      value={strength}
                      onChange={handleStrengthChange}
                    />
                    <span>High</span>
                  </div>
                  <div>
                    <p>Upload an Image</p>
                    <label>
                      <input
                        type='file'
                        accept='image/*'
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                      />
                      <span>Upload</span>
                    </label>
                    <button onClick={() => setUploadedImage(null)}>
                      cancel
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className='LoraDiv'>
              {loraLoaded && (
                <div>
                  <p>LoRA Scale: {loraScale}</p>
                  <span>Low</span>
                  <input
                    type='range'
                    min='0'
                    max='1'
                    step='0.1'
                    value={loraScale}
                    onChange={handleLoraScaleChange}
                  />
                  <span>High</span>
                </div>
              )}
            </div>
          </div>
          <div>
            <button
              disabled={!axiosURL}
              onClick={handleGenerateAIImage}
            >
              Generate
            </button>
          </div>
          {addLora && <AddLora setLoraLoaded={setLoraLoaded} />}
          <div>{uploadedImage && <img src={uploadedImage} />}</div>
        </div>
      )}
    </>
  );
}

export default CreateSDImage;
