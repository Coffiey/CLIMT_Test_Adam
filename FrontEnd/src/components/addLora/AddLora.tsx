import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { GET_LORA_URL } from "./constants";
import AddLoraProps from "./interfaces";

function AddLora({ setAddLora }: AddLoraProps) {
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

  const handleDeleteLora = () => {
    setAddLora(false);
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
      console.log(items[0]);
    } catch (error) {
      setError(true);
      console.error("Error during Lora submit:", error);
    }
  };

  return (
    <div>
      <div>
        <p>Add Lora</p>
      </div>
      <div>
        <div>
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
                find a Lora from civit Ai that you like type the Lora name in
                the search bar,
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
                <button disabled={!loraFileName}>Apply Lora</button>
                <button onClick={handleDeleteLora}>Delete Lora</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddLora;
