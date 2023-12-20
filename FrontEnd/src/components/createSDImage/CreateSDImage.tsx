import { ChangeEvent, useState } from "react";
import axios from "axios";
import "./CreateSDImage.css";
import {
  TEXT_TO_IMAGE_URL,
  IMAGE_TO_IMAGE_URL,
} from "../../Constants/Constants";
import { CreateSDImagerops } from "../../Interfaces/interfaces";

import AddLora from "../addLora/AddLora";

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

  const handlePromptChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const handleNegativePromptChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNegativePrompt(event.target.value);
  };

  const handleGuidanceScaleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGuidanceScale(event.target.value);
  };

  const handleInferenceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNumInferenceSteps(event.target.value);
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

    console.log(formData.get("negativePrompt"));

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
        <div>
          <button onClick={handleReset}>Generate Another Image</button>
        </div>
      ) : (
        <div>
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
          <div>
            <div>
              <p>Write a Prompt</p>
              <input
                type='text'
                placeholder='prompt...'
                value={prompt}
                onChange={handlePromptChange}
              />
            </div>
            <div>
              <p>Write a Negative Prompt</p>
              <input
                type='text'
                placeholder='negative prompt...'
                value={negativePrompt}
                onChange={handleNegativePromptChange}
              />
            </div>
            <div>
              <p>Set guidance: {guidanceScale}</p>
              <span>relaxed</span>
              <input
                type='range'
                min='1'
                max='15'
                step='0.5'
                value={guidanceScale}
                onChange={handleGuidanceScaleChange}
              />
              <span>strict</span>
            </div>
            <div>
              <p>Number of Inference Steps: {numInferenceSteps}</p>
              <span>Fast </span>
              <input
                type='range'
                min='5'
                max='50'
                step='1'
                value={numInferenceSteps}
                onChange={handleInferenceChange}
              />
              <span> Fancy</span>
            </div>
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
          {axiosURL === IMAGE_TO_IMAGE_URL && (
            <div>
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
                <button onClick={() => setUploadedImage(null)}>cancel</button>
              </div>
            </div>
          )}
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
