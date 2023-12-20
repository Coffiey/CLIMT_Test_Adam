import os
import base64
import io
import httpx

from PIL import Image

def create_image_file_tree():
    """function will onload, create  image pathways for the AI model to save to, simulating useing a cloud storage system"""
    base_directory = './created/model'
    directories = [os.path.join(base_directory, 'text_to_image'), os.path.join(base_directory, 'image_to_image'), os.path.join(base_directory, 'lora')]
    for directory in directories:
        if not os.path.exists(directory):
            os.makedirs(directory)


def process_base64_image(image):
    """
    Processes a base64-encoded image, decodes it, and opens it as a PIL Image.

    Parameters:
     - image (str): Base64-encoded image data.

   retruns:
        [image, error]
    """
    try:
        image_without_prefix = image.split(",")[1]
        image_bytes = base64.b64decode(image_without_prefix)
        image_for_prompt = Image.open(io.BytesIO(image_bytes))
        return [image_for_prompt, False]
    except Exception as e:
        return [False, e]

  
async def download_lora_weights(body):
    """
    Downloads lora weight as a .safetensor file

    Parameters:
     - body (dict): A dictionary containing the following keys:
        - "downloadURL" (str): The URL from which to download the file.
        - "name" (str): The desired name for the downloaded file.

    retruns:
        [safetensor location in file tree, error]

    references:
        - chat GTP was used to create boiler plate code for this as I am unfamiliar with httpx in python, was then edited by me
        - python docs
    """
    download_URL = body["downloadURL"]
    name = body["name"]
    save_path = "./created/model/lora/"

    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(download_URL)
            response.raise_for_status()  # Raise an exception for HTTP errors (e.g., 404)
            file_path = os.path.join(save_path, name)
            with open(file_path, "wb") as file:
                file.write(response.content)
            return  [file_path, False]
        except httpx.HTTPError as e:
            return [False, "HTTP error:" + e]
        except Exception as e:
            return [False, e]