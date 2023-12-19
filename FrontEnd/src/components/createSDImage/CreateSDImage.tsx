import { ChangeEvent, useState } from "react";
import axios from "axios";
import "./CreateSDImage.css";
import {
  TEXT_TO_IMAGE_URL,
  IMAGE_TO_IMAGE_URL,
  LOAD_LORA_URL,
  UNLOAD_LORA_URL,
} from "./Constants";

import AddLora from "../addLora/AddLora";

function CreateSDImage() {
  const [addLora, setAddLora] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const [axiosURL, setAxiosURL] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<null | string>(null);
  const [negativePrompt, setNegativePrompt] = useState<string>("");
  const [guidanceScale, setGuidanceScale] = useState<string>("7");
  const [numInferenceSteps, setNumInferenceSteps] = useState<string>("5");

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

  const handleGenerateAIImage = async () => {
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("negativePrompt", negativePrompt);
    formData.append("guidanceScale", guidanceScale);
    formData.append("numInferenceSteps", numInferenceSteps);

    if (axiosURL === IMAGE_TO_IMAGE_URL && uploadedImage) {
      formData.append("image", uploadedImage);
    }

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    try {
      if (axiosURL) {
        const results = await axios.post(axiosURL, formData, {
          headers,
          responseType: "json",
        });
        console.log(results.data);
      }
    } catch (err: any) {
      console.error("Error:", err.message);
    }
  };

  return (
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
      <button onClick={() => setAddLora(!addLora)}>Add Lora</button>
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
      </div>
      {axiosURL === IMAGE_TO_IMAGE_URL && (
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
      )}
      <div>
        <button
          disabled={!axiosURL}
          onClick={handleGenerateAIImage}
        >
          Generate
        </button>
      </div>
      {addLora && <AddLora setAddLora={setAddLora} />}
      <div>{uploadedImage && <img src={uploadedImage} />}</div>
    </div>
  );
}

export default CreateSDImage;
