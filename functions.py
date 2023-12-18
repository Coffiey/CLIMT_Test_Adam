# import os 
# from PIL import Image, ImageDraw
# import cv2
# import numpy as np
# from IPython.display import HTML
# from base64 import b64encode
# import requests
# import json

# civit_base_URL = "https://civitai.com/api/v1/"

# import torch
# from torch import autocast
# from torch.nn import functional as F
# from diffusers import StableDiffusionPipeline, AutoencoderKL, AutoPipelineForText2Image, AutoPipelineForImage2Image
# from diffusers import UNet2DConditionModel, PNDMScheduler, LMSDiscreteScheduler
# from diffusers.schedulers.scheduling_ddim import DDIMScheduler
# from transformers import CLIPTextModel, CLIPTokenizer
# from tqdm.auto import tqdm
# from huggingface_hub import notebook_login

# device = "cpu"

# notebook_login()

# model_id = "runwayml/stable-diffusion-v1-5"

# pipe_text_to_image = AutoPipelineForText2Image.from_pretrained(
#     model_id, torch_dtype=torch.float32,
# ).to(device)

# pipe_image_to_image = AutoPipelineForImage2Image.from_pretrained(
#     model_id, torch_dtype=torch.float32, use_safetensors=True
# ).to(device)



# def create_from_text(prompt, negative_prompt,  guidance_scale,num_inference_steps=5):
    
#     image = pipe_text_to_image(prompt, num_inference_steps=5).images[0] 
#     image_prompt = prompt.replace(' ', '_')
#     image_location = f"created/model/TTI/{image_prompt}.png"
#     image.save(image_location)
#     return {"url": image_location}
    


# def create_from_image(prompt, negative_prompt,  guidance_scale,num_inference_steps=5):
#     prompt_image = Image.open("./cow.jpeg").convert("RGB")
#     prompt_image = prompt_image.resize((768, 512))
#     image = pipe_image_to_image(prompt=prompt,image=prompt_image, num_inference_steps=5,strength=0.5, guidance_scale=7.5).images[0] 
#     image_prompt = prompt.replace(' ', '_')
#     image_location = f"created/model/ITI/{image_prompt}.png"
#     image.save(image_location)
#     return {"url": image_location}


# def create_from_text_with_lora(prompt, negative_prompt,  guidance_scale,num_inference_steps=5):
#     pipe_text_to_image.load_lora_weights(".", weight_name="Emma_Watson.safetensors",)
#     pipe_text_to_image.fuse_lora(lora_scale=0.6)
#     image = pipe_text_to_image(prompt, num_inference_steps=50).images[0] 
#     image_prompt = prompt.replace(' ', '_')
#     image_location = f"created/lora/TTI/{image_prompt}.png"
#     image.save(image_location)
#     pipe_text_to_image.unload_lora_weights()
#     return {"url": image_location}

# def create_from_image_with_lora(prompt, negative_prompt,  guidance_scale,num_inference_steps=5):
#     pipe_text_to_image.load_lora_weights(".", weight_name="Emma_Watson.safetensors",)
#     pipe_text_to_image.fuse_lora(lora_scale=0.6)
#     image = pipe_text_to_image(prompt, num_inference_steps=50).images[0] 
#     image_prompt = prompt.replace(' ', '_')
#     image_location = f"created/loral/ITI/{image_prompt}.png"
#     image.save(image_location)
#     pipe_text_to_image.unload_lora_weights()
#     return {"url": image_location}