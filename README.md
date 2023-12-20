<p align="center">
  <h2>CLIMT Take Home Assignment</h2>
</p>

## Tasks:

1. An API that generates images upon receiving a prompt.
2. A web service capable of training with LoRA.

## Additional Notes:

- The frontend is flexible.
- A rough UI is acceptable as long as it is operational.
- Use FastAPI for the backend.
- Use the StableDiffusion1.5 model for image generation.
- Implementing Google searches and code generation using LLM is allowed. However, attach URLs used for reference and LLM responses separately.
- For aspects not mentioned here, make your own judgments in implementation and leave comments about those decisions.

---

<p align="center">
  <h1>CLIMT Image Creator</h1>
</p>

_by Adam_

### Instillation Insutrctions.

### Backend

<span style="color: grey;">setp 1 git clone the repository:<br/>
`git clone https://github.com/Coffiey/CLIMT_Test_Adam.git`

**<span style="color: grey;">step 2 create a virtual enviroment for the fastAPI in route run:</span>** <br/>
for mac:<br/>
`python3 -m venv venv //create the environment`<br/>
`source venv/bin/activate //load the environment`<br/>

for windows:<br/>
`python -m venv venv //create the environment`<br/>
`venc/scripts/activate //load the environment`<br/>

**<span style="color: grey;">step 3 load Dependencies:</span>** <br/>
_A `requirements.txt` file is included for bulk installation of all required Python packages._

`pip install -r requirements.txt`

**<span style="color: grey;">set 4 run server:</span>**<br/>
_please note that I have loaded my hugging face token into git so the login should be autmatic but if it has expired then create a token at <a>https://huggingface.co/settings/tokens</a> and then paste it to the concole when promped by the log in fuction._

variable parameters:
`|--Backend
    |--AIModel
        |--DiffusionModel.py`

_if the machine you use has a dedicated GPU then set `device = "cpu"` and `torch_dtype=torch.float16` for best preformace, the current set up if for a laptop with intergrated CPU/GPU_

for mac:<br/>
`python3 main.py`

for windows:<br/>
`python main.py`

### Frontend

**<span style="color: grey;">step 1 cd into FrontEnd:</span>**<br/>
`cd FrontEnd`

**<span style="color: grey;">step 2 install depenencies:</span>**<br/>
`npm Install`

**<span style="color: grey;">step 3 run build command:</span>**<br/>
`npm run build`

**<span style="color: grey;">step 4 run build file</span>**<br/>
`npm run preview`

_the backend will run seperatly from the front end and call using exteral end points, please note cors is set globally for the sake of development as i developed this on two machines, if depolyment is ever an option CORS needs to be edited._
<br/>

## Server Information

### Routes

- **GET("/")**

  - This loads a simplistic HTML script as a test that the server is running.

- **POST("/api/model/text-to-image")**

  - This will create an image from a text prompt.

- **POST("/api/model/image-to-image")**

  - This will receive an image as well as a text prompt.

- **PUT("/api/lora/load-lora-model-from-name")**

  - This receives a LoRA file from CivitAI and loads it into the model, although it is not performing desired functionality currently.

- **DELETE("/api/lora/delete-lora-model")**
  - This unloads the previously loaded LoRA weights.

## references:

as per the outline, I have made notes on any code that is directly copied from chatGTP or google in the doco strings or comments. Athough this is a very small amout, however it is worth noting that ChatGTP and stack overflow were used in a far more casual manor to answer minor syntax queries as well as provide insight on doco-string best practices and formating best practices.

<a>https://chat.openai.com/</a><br/>
<a>https://stackoverflow.com/</a><br/>
<a>https://fastapi.tiangolo.com/</a><br/>
<a>https://docs.python.org/3.9/</a><br/>

<br/><br/>

<p align="center">
  <strong>Final Notes:</strong><br/>
  I just wanted to end by thanking you for this opportunity. I have genuinely enjoyed this coding exercise and stepping outside of my comfort zone into Stable Diffusion.<br/><br/>
  Kind regards,<br/>
  Adam
</p>
