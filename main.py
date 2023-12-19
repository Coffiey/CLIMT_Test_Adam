import uvicorn
import base64
import io
import time

from fastapi import FastAPI, Form, Request, HTTPException
from fastapi.responses import HTMLResponse
from PIL import Image
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
# from Backend.AIModel.DiffusionFunctions import create_from_image, create_from_text, delete_model_with_lora, load_model_with_lora
from Backend.mainFunctions.mainFuntions import create_image_file_tree, process_base64_image, download_lora_weights

"""generates App instance"""
app = FastAPI()

"""for wase origins are set as ALLOW ALL, do not do this in production"""
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

create_image_file_tree()

@app.get("/")
async def index():
    """
    Root endpoint for the CLIMT Stable Diffusion Generator API.

    returns:
     - HTMLResponse: An HTML response containing a welcome message and information about the API.

    references:
    - boiler plate HTML created by chat gtp as the server landing page has no purpose asn is there for completeness
    """
    html_content = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CLIMT Stable Diffusion Generator API</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                margin: 50px;
                text-align: center;
            }
            h1 {
                color: #007BFF;
            }
        </style>
    </head>
    <body>
        <h1>CLIMT Stable Diffusion Generator API</h1>
        <p>Welcome to the API! This API is designed to serve CLIMT stable diffusion generator functionality.</p>
    </body>
    </html>
    """
    return HTMLResponse(content=html_content, status_code=200)


@app.post("/api/model/text-to-image")
async def text_to_image(
    prompt: str = Form("prompt"),
    negative_prompt: str = Form("negativePrompt"),
    guidance_scale: float = Form("guidanceScale"),
    num_inference_steps: float = Form("numInferenceSteps"),
    lora_scale: float = Form("loraScale")
    ):
    """
    Endpoint for creating an image from a text prompt.

    parameters:
     - prompt (str): Positive prompts for image generation.
     - negative_prompt (str): Negative prompt to be avoided by image generation.
     - guidance_scale (float): How close the image aligns with the prompt.
     - num_inference_steps (float): Number of inference steps.
     - lora_scale (float): Lora scale for image generation.

    returns:
     - JSONResponse: JSON response with image data or error details.
    """
    # response = await create_from_text(prompt, negative_prompt, guidance_scale, num_inference_steps, lora_scale)
    response = [{"generatedImageURL": "/model/image_to_image/Horse.jpeg"}, False]
    time.sleep(10)
    if response[0]:
        return JSONResponse(response[0], status_code=200)
    else:
        raise HTTPException(status_code=400, detail=response[1])


@app.post("/api/model/image-to-image")
async def image_to_image(
    prompt: str = Form("prompt"),
    negative_prompt: str = Form("negativePrompt"),
    guidance_scale: str = Form("guidanceScale"),
    num_inference_steps: str = Form("numInferenceSteps"),
    strength: float = Form("strength"),
    image: str = Form("image"),
    lora_scale: float = Form("loraScale")
    ):
    """
    Endpoint for generating an image from a text prompt and user selected image.

    parameters:
     - prompt (str): Positive prompts for image generation.
     - negative_prompt (str): Negative prompt to be avoided by image generation.
     - guidance_scale (str): How close the image aligns with the prompt.
     - num_inference_steps (str): Number of inference steps.
     - strength (float): Strength parameter for image generation.
     - image (str): Base64-encoded image data.
     - lora_scale (float): Lora scale for image generation.

    returns:
     - JSONResponse: JSON response with image data or error details.
    """
    image_for_prompt = process_base64_image(image, prompt)
    # response = await create_from_image(prompt, negative_prompt, guidance_scale, num_inference_steps, image_for_prompt, strength, lora_scale)
    response = [{"generatedImageURL": "/model/image_to_image/Horse.jpeg"}, False]
    if response[0]:
        return JSONResponse(response[0], status_code=200)
    else:
        raise HTTPException(status_code=400, detail=response[1])


@app.put("/api/lora/load-lora-model-from-name")
async def load_lora(request: Request):
    """
    Endpoint for loading a LORA model from civitai api

    parameters:
     - request (Request): The FastAPI Request object containing the JSON request body.

    returns:
     - JSONResponse: JSON response with the loaded model information or error details.
    """
    request_body =  request.json()
    lora_weights = await download_lora_weights(request_body)
    # response = await load_model_with_lora(file_location=lora_weights, weight_name=lora_weights)
    response = [{"generatedImageURL": "Horse.jpeg"}, False]
    if response[0]:
        return JSONResponse(response[0], status_code=200)
    else:
        raise HTTPException(status_code=400, detail=response[1])


@app.delete("/api/lora/delete-lora-model")
async def unload_lora():
    """
    Endpoint for deleting the loaded LORA model.

    returns:
     - JSONResponse: A JSON response with an empty body and a status code of 204 (No Content)
    """
    # response = await delete_model_with_lora()
    response = [{"generatedImageURL": "Horse.jpeg"}, False]
    if response[0]:
        return JSONResponse(status_code=204)
    else:
        raise HTTPException(status_code=400, detail=response[1])

@app.get("/{path:path}")  
async def path_not_found(path):
    """catches incorrect paths"""
    raise HTTPException(status_code=404, detail="not found")


"""required for app to run"""
if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)