import { ChangeEvent, useState } from "react";
import axios from "axios";
import "./CreateSDImage.css";
import TexttoImage from "./interfaces";

function CreateSDImage() {
  const [uploadState, setUploadState] = useState<string>("Text to Image");
  const [prompt, setPrompt] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<null | string>(null);
  const [negativePrompt, setNegativePrompt] = useState<string>("");
  const [guidanceScale, setGuidanceScale] = useState<string>("7");
  const [numInferenceSteps, setNumInferenceSteps] = useState<string>("5");

  const BASEURL: string = "http://127.0.0.1:8000";

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    let url = "/model/text-to-image";
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("negativePrompt", negativePrompt);
    formData.append("guidanceScale", guidanceScale);
    formData.append("numInferenceSteps", numInferenceSteps);
    if (uploadState === "Image To Image" && uploadedImage) {
      formData.append("image", uploadedImage);
      url = "/model/image-to-image";
    }

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    try {
      const results = await axios.post(BASEURL + url, formData, {
        headers,
        responseType: "json",
      });
      console.log(results.data);
    } catch (err: any) {
      console.error("Error:", err.message);
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          setUploadedImage(null);
          setUploadState("Text To Image");
        }}
      >
        Text To Image
      </button>
      <button onClick={() => setUploadState("Image To Image")}>
        Image To Image
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
      </div>
      {uploadState === "Image To Image" && (
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
        <button onClick={handleGenerateAIImage}>Generate</button>
      </div>
      <div>{uploadedImage && <img src={uploadedImage} />}</div>
    </div>
  );
}

export default CreateSDImage;
