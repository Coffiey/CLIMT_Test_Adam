import uvicorn
from fastapi import FastAPI, Form, UploadFile
import base64
import io
from PIL import Image
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
# from AIModel.DiffusionFunctions import create_from_image, create_from_text, create_from_text_with_lora, create_from_image_with_lora


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Only use In development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def index():
    return {"message" : "hello Adam"}

@app.post("/model/text-to-image")
def index(
    prompt: str = Form("prompt"),
    negative_prompt: str = Form("negativePrompt"),
    guidance_scale: str = Form("guidanceScale"),
    num_inference_steps: str = Form("numInferenceSteps"),
    ):
    print("fire")
    content = {"prompt": prompt, "negative_prompt" : negative_prompt}
    return JSONResponse(content=content, status_code=200)

@app.post("/model/image-to-image")
def ImageToImage(
    prompt: str = Form("prompt"),
    negative_prompt: str = Form("negativePrompt"),
    guidance_scale: str = Form("guidanceScale"),
    num_inference_steps: str = Form("numInferenceSteps"),
     image: str = Form("image")
    ):
    image_without_prefix = image.split(",")[1]
    image_bytes = base64.b64decode(image_without_prefix)
    image_for_prompt = Image.open(io.BytesIO(image_bytes))
    image_for_prompt.save("test.png")
    image_prompt = prompt.replace("_"," ")
    # create_from_image(image_prompt)
    content = {"prompt": prompt, "negative_prompt" : negative_prompt}
    return JSONResponse(content=content, status_code=200)

# @app.get("/lora/text-to-image/{prompt}")
# def index(prompt):
#     image_prompt = prompt.replace("_"," ")
#     # create_from_text_with_lora(image_prompt)
#     return JSONResponse(content=content, status_code=200)

@app.get("/{path:path}")  
def index(path):
    return {"message" : "404"}

if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)