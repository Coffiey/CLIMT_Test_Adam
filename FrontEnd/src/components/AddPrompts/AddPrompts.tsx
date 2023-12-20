import { AddPromptProps } from "../../Interfaces/interfaces";

function AddPrompts({
  setPrompt,
  setNegativePrompt,
  setGuidanceScale,
  setNumInferenceSteps,
  prompt,
  negativePrompt,
  guidanceScale,
  numInferenceSteps,
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

  return (
    <div className='promptDiv'>
      <div>
        <p>Write a Prompt</p>
        <input
          className='TextInput'
          type='text'
          placeholder='prompt...'
          value={prompt}
          onChange={handlePromptChange}
        />
      </div>
      <div>
        <p>Write a Negative Prompt</p>
        <input
          className='TextInput'
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
  );
}

export default AddPrompts;
