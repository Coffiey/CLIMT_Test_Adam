import { ChangeEvent, useState } from "react";

function CreateSDImage() {
  const [prompt, setPrompt] = useState<string>("");
  const [negativePrompt, setNegativePrompt] = useState<string>("");
  const [guidanceScale, setGuidanceScale] = useState<string>("");
  const [numInferenceSteps, setNumInferenceSteps] = useState<string>("");

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

  return (
    <div>
      <div>
        <div>
          <input
            type='text'
            placeholder='prompt...'
            value={prompt}
            onChange={handlePromptChange}
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='negative prompt...'
            value={negativePrompt}
            onChange={handleNegativePromptChange}
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='guidence Scale...'
            value={guidanceScale}
            onChange={handleGuidanceScaleChange}
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='prompt...'
            value={numInferenceSteps}
            onChange={handleInferenceChange}
          />
        </div>
      </div>
      <div>
        <button>Generate</button>
      </div>
    </div>
  );
}

export default CreateSDImage;
