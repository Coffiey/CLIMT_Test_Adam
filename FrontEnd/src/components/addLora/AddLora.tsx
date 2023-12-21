import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "./AddlLora.css";
import {
  GET_LORA_URL,
  LOAD_LORA_URL,
  UNLOAD_LORA_URL,
} from "../../Constants/Constants";
import { Body, AddLoraProps } from "../../Interfaces/interfaces";

function AddLora({
  setLoraLoaded,
  setLoraScale,
  loraLoaded,
  loraScale,
}: AddLoraProps) {
  const [loraInput, setLoraInput] = useState<string>("");
  const [loraName, setLoraName] = useState<string>("");
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
    } catch (err) {
      setError(true);
      console.error("Error during Lora submit:", err);
      console.log(error);
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
    <div className='LoraContainer'>
      <div>
        <p className='LoraTitle'>Add Lora</p>
      </div>
      <div>
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
        <div>
          <div>
            <p>
              <a
                href='https://civitai.com/models'
                target='_blank'
                rel='noopener noreferrer'
              >
                https://civitai.com/models
              </a>
            </p>
            <p>
              find a Lora from civit Ai that you like type the Lora name in the
              search bar,
              <br /> make sure it has the LORA tag and it is Safe for work
              <br /> (if the name includes emoji's include them in the search)
            </p>
          </div>
          <div>
            <form onSubmit={handleLoraSubmit}>
              <input
                type='text'
                value={loraInput}
                onChange={handleLoraInputChange}
              />
              <button>Search</button>
            </form>
          </div>
        </div>
        {loraImage && (
          <div>
            <div>
              <p>Title: {loraName}</p>
              <p>
                Lora Prompts:{" "}
                {loraTrainingWords.map((loraTrainingWord) => {
                  return <span>[{loraTrainingWord}] </span>;
                })}
              </p>
            </div>
            <div>
              <img src={loraImage} />
            </div>
            <div>
              <button
                disabled={!loraFileName}
                onClick={handleLoadLora}
              >
                Apply Lora
              </button>
              <button onClick={handleDeleteLora}>Delete Lora</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddLora;
