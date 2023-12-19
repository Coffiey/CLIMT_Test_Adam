import torch

from diffusers import StableDiffusionPipeline, StableDiffusionImg2ImgPipeline
from tqdm.auto import tqdm
from huggingface_hub import notebook_login


"""
as this is developed on a macbook without dedicated GPU device is set to cpu

if you have a GPU use
    device = "cuda"
"""
device = "cpu"



"""
Hugging face token is currently attached via git however it may ask for a login token on server load

generate at:
https://huggingface.co/settings/tokens
"""
notebook_login()


"""stable diffusion model 1.5"""
model_id = "runwayml/stable-diffusion-v1-5"



"""variable for the text to image pipeline"""
pipe_text_to_image = StableDiffusionPipeline.from_pretrained(
    model_id, torch_dtype=torch.float32,
).to(device)

"""variable for the image to image pipeline"""
pipe_image_to_image = StableDiffusionImg2ImgPipeline.from_pretrained(
    model_id, torch_dtype=torch.float32, use_safetensors=True
).to(device)
