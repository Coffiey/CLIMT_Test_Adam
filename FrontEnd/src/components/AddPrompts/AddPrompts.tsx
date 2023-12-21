import { AddPromptProps } from "../../Interfaces/interfaces";
import { ChangeEvent } from "react";
import { IMAGE_TO_IMAGE_URL } from "../../Constants/Constants";

import "./AddPrompts.css";

function AddPrompts({
  setPrompt,
  setNegativePrompt,
  setGuidanceScale,
  setNumInferenceSteps,
  setStrength,
  setUploadedImage,
  prompt,
  negativePrompt,
  guidanceScale,
  numInferenceSteps,
  axiosURL,
  strength,
  uploadedImage,
}: AddPromptProps) {
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

  const handleStrengthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStrength(event.target.value);
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]!;
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUploadedImage(reader.result as string);
    };
  };
  return (
    <div className='UploadContainer'>
      <div className='promptDiv'>
        <div>
          <p className='inputTitles'>Write a Prompt</p>
          <input
            className='TextInput'
            type='text'
            placeholder='prompt...'
            value={prompt}
            onChange={handlePromptChange}
          />
        </div>
        <div>
          <p className='inputTitles'>Negative Prompt</p>
          <input
            className='TextInput'
            type='text'
            placeholder='negative prompt...'
            value={negativePrompt}
            onChange={handleNegativePromptChange}
          />
        </div>
        <div>
          <p className='inputTitles'>Set guidance: {guidanceScale}</p>
          <span>1</span>
          <input
            className='SliderInput'
            type='range'
            min='1'
            max='15'
            step='0.5'
            value={guidanceScale}
            onChange={handleGuidanceScaleChange}
          />
          <span>15</span>
        </div>
        <div>
          <p className='inputTitles'>
            Number of Inference Steps: {numInferenceSteps}
          </p>
          <span>5</span>
          <input
            className='SliderInput'
            type='range'
            min='5'
            max='50'
            step='1'
            value={numInferenceSteps}
            onChange={handleInferenceChange}
          />
          <span>50</span>
        </div>
      </div>
      {axiosURL === IMAGE_TO_IMAGE_URL && (
        <div className='ImageDiv'>
          <div>
            <p className='inputTitles'>Image Strength: {strength}</p>
            <span>0</span>
            <input
              className='SliderInput'
              type='range'
              min='0'
              max='1'
              step='0.1'
              value={strength}
              onChange={handleStrengthChange}
            />
            <span>1</span>
          </div>
          <div>
            <p className='inputTitles'>Upload an Image</p>
            <div className='imageButtonContainer'>
              <label>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
                <span
                  className='buttonSpan'
                  id='buttonSpanLeft'
                >
                  Upload
                </span>
              </label>
              <span
                className='buttonSpan'
                id='buttonSpanRight'
                onClick={() => setUploadedImage(null)}
              >
                cancel
              </span>
            </div>
            <div>
              {uploadedImage ? (
                <img
                  className='imageUpload'
                  src={uploadedImage}
                />
              ) : (
                <img
                  className='imageUpload'
                  src='media/placeholder-image.png'
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddPrompts;
