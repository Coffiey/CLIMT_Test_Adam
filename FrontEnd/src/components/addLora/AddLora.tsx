import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "./AddlLora.css";
import "../../index.css";
import {
  GET_LORA_URL,
  LOAD_LORA_URL,
  UNLOAD_LORA_URL,
} from "../../Constants/Constants";
import { Body, AddLoraProps } from "../../Interfaces/interfaces";

function AddLora({ setLoraLoaded, setLoraScale, loraScale }: AddLoraProps) {
  const [loraInput, setLoraInput] = useState<string>("");
  const [loraName, setLoraName] = useState<string>("");
  const [loraSubbmitting, setLoraSubmitting] = useState<boolean>(false);
  const [loraTrainingWords, setLoraTrainingWords] = useState<string[]>([]);
  const [loraFileName, setLoraFileName] = useState<string | null>(null);
  const [loraImage, setLoraImage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [loraDownloadURL, setLoraDownloadURL] = useState<string>("");

  const handleLoraInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoraInput(event.target.value);
  };

  const handleLoraScaleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoraScale(event.target.value);
  };

  const handleLoraSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(false);
    try {
      setLoraSubmitting(true);
      const url = GET_LORA_URL + loraInput;
      const response = await axios.get(url);
      const { items } = response.data;
      setLoraName(items[0].name);
      setLoraImage(items[0].modelVersions[0].images[0].url);
      setLoraFileName(items[0].modelVersions[0].files[0].name);
      setLoraDownloadURL(items[0].modelVersions[0].files[0].downloadUrl);
      const wordFlatMap = items[0].modelVersions[0].trainedWords.flatMap(
        (trainedWord: string) => trainedWord.split(",")
      );
      setLoraTrainingWords(wordFlatMap);
      setLoraLoaded(true);
      setLoraSubmitting(false);
    } catch (err) {
      console.error("Error during Lora submit:", err);
      setLoraSubmitting(false);
      setError(true);
    }
  };

  const handleLoadLora = async () => {
    if (loraFileName) {
      const body: Body = {
        downloadURL: loraDownloadURL,
        name: loraFileName,
      };

      const headers = {
        "Content-Type": "application/json",
      };

      try {
        const result = await axios.put(LOAD_LORA_URL, body, {
          headers,
          responseType: "json",
        });
        console.log(result.data);
      } catch (err: any) {
        console.error("Error:", err.message);
        setError(true);
      }
    }
  };

  const handleDeleteLora = async () => {
    try {
      const result = await axios.delete(UNLOAD_LORA_URL);
      console.log(result.data);
    } catch (err: any) {
      console.error("Error:", err.message);
    }

    setLoraInput("");
    setLoraName("");
    setLoraImage("");
    setLoraFileName("");
    setLoraDownloadURL("");
    setLoraTrainingWords([]);
    setLoraLoaded(false);
  };

  return (
    <div
      className='LoraContainer'
      style={{ backgroundImage: `url(${loraImage})`, backgroundSize: "cover" }}
    >
      <div
        className={loraImage ? "fade" : undefined}
        id='mimic'
      >
        <div className='LoraTitleDiv'>
          <p className='LoraTitle'>{loraName ? loraName : "Add Lora"}</p>
        </div>
        <div className='scaleContainer'>
          <p className='scaleRef'>LoRA Scale: {loraScale}</p>
          <div className='scaleDiv'>
            <span className='scalePointLeft'>Low</span>
            <input
              className='scaleBar'
              type='range'
              min='0'
              max='1'
              step='0.1'
              value={loraScale}
              onChange={handleLoraScaleChange}
            />
            <span className='scalePointRight'>High</span>
          </div>
        </div>

        {!loraImage && (
          <>
            <div>
              <p className='promptText'>
                find a Lora from civit Ai that you like type the Lora name in
                the search bar, make sure it has the LORA tag and it is Safe for
                work (if the name includes emoji's include them in the search)
              </p>{" "}
              <p className='promptHyperLink'>
                <a
                  href='https://civitai.com/models'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  https://civitai.com/models
                </a>
              </p>
            </div>

            <div className='LoraReqForm'>
              <form
                onSubmit={handleLoraSubmit}
                className='theForm'
              >
                <input
                  className='LoraReqinput'
                  type='text'
                  value={loraInput}
                  onChange={handleLoraInputChange}
                />
                <button
                  className='LoraSelectButton'
                  id={error ? "SelectRed" : undefined}
                >
                  {loraSubbmitting ? (
                    <img
                      src='./media/tunyHamster.gif'
                      className='loadingGif'
                    />
                  ) : (
                    "Search"
                  )}
                </button>
              </form>
            </div>
          </>
        )}
        {loraImage && (
          <div>
            <div>
              <p style={{ margin: "10px 0px 0px 5px", fontWeight: "bold" }}>
                Lora Prompts:
              </p>
              <p className='LoraKeyPrompts'>
                {loraTrainingWords.map((loraTrainingWord) => {
                  return <span>[{loraTrainingWord}] </span>;
                })}
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                className='buttonSpan, buttonLoraLeft'
                id={error ? "ApplyRed" : undefined}
                disabled={!loraFileName}
                onClick={handleLoadLora}
              >
                Apply
              </button>
              <button
                className='buttonSpan, buttonLoraRight '
                onClick={handleDeleteLora}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddLora;
