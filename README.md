# CLIMT Take Home Assignment

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

# CLIMT Image Creator

_by Adam_

### Instillation Insutrctions.

#### Backend

\*\*<span style="color: grey;">setp 1 git clone the repository:<br/>
`git clone https://github.com/Coffiey/CLIMT_Test_Adam.git`

**<span style="color: grey;">step 2 create a virtual enviroment for the fastAPI in route run:</span>** <br/>
for mac:<br/>
`python3 -m venv venv //create the environment`
`source venv/bin/activate //load the environment`

for windows:<br/>
`python -m venv venv //create the environment`
`venc/scripts/activate //load the environment`

**<span style="color: grey;">step 3 load Dependencies:</span>** <br/>
a requirements.txt file is included to bulk install all required python packages

`pip install -r requirements.txt`

**<span style="color: grey;">set 4 run server:</span>**<br/>
please note that I have loaded my hugging face token into git so the login should be autmatic but if it has expired then create a token at <a>https://huggingface.co/settings/tokens</a> and then paste it to the concole when promped by the log in fuction.

variable parameters:
|-Backend
| |-AIModel
| ` |-DiffusionModel.py

if the machine you use has a dedicated GPU then set `device = "cpu"` and `torch_dtype=torch.float16` for best preformace, the current set up if for a laptop with intergrated CPU/GPU

for mac:<br/>
`python3 main.py`

for windows:<br/>
`python main.py`

Frontend<br/><br/>
**<span style="color: grey;">step 1 cd into FrontEnd:</span>**<br/>
\*\*<span style="color: grey;">step 1 cd into FrontEnd:<br/>
`cd FrontEnd`

**<span style="color: grey;">step 1 cd into FrontEnd:</span>**<br/>
\*\*<span style="color: grey;">step 2 install depenencies:<br/>
`npm Install`

**<span style="color: grey;">step 1 cd into FrontEnd:</span>**<br/>
\*\*<span style="color: grey;">step 3 run build command:<br/>
`npm run build`

**<span style="color: grey;">step 1 cd into FrontEnd:</span>**<br/>
\*\*<span style="color: grey;">step 4 run build file:<br/>
`npm run preview`

the backend will run seperatly from the front end and call using exteral end points, please note cors is set globally for the sake of development as i developed this on two machines, if depolyment is ever an option CORS needs to be edited
Server information:
routes
get("/"):
this loads a simplistic html script as a test the server is running

    post("/api/model/text-to-image"):
      this will create an image from a text prompt


    post("/api/model/image-to-image"):
      this will recieve an image as well as a text prompt


    .put("/api/lora/load-lora-model-from-name"):
      this recieves a lora file from civitAI and loads it into the model
      although it is not performing desiered fiunctionality currently

    .delete("/api/lora/delete-lora-model"):
      this unloads the prevously loaded lora weights

references:
as per the outline, I have made notes on any code that is directly copied from chatGTP or google in the doco strings or comments. Athough this is a very small amout, however it is worth noting that ChatGTP and stack overflow were used in a far more casual manor to answer minor syntax queries as well as provide insight on doco-string best practices and formating best practices.

https://chat.openai.com/
https://stackoverflow.com/
https://fastapi.tiangolo.com/
https://docs.python.org/3.9/

Final Notes:
I just wanted to end by thanking you for this oppotunity, I have genuainly enjoyed this coding exercsie and stepping outside of my confort zone into stable Diffusion.

kind regards
Adam