import os 
from PIL import Image, ImageDraw
import cv2
import numpy as np
from IPython.display import HTML
from base64 import b64encode

import torch
from torch import autocast
from torch.nn import functional as F
from diffusers import StableDiffusionPipeline, AutoencoderKL, AutoPipelineForText2Image, AutoPipelineForImage2Image
from diffusers import UNet2DConditionModel, PNDMScheduler, LMSDiscreteScheduler
from diffusers.schedulers.scheduling_ddim import DDIMScheduler
from transformers import CLIPTextModel, CLIPTokenizer
from tqdm.auto import tqdm
from huggingface_hub import notebook_login

device = "cpu"

notebook_login()

model_id = "runwayml/stable-diffusion-v1-5"

pipe_text_to_image = AutoPipelineForText2Image.from_pretrained(
    model_id, torch_dtype=torch.float32,
).to(device)

pipe_image_to_image = AutoPipelineForImage2Image.from_pretrained(
    model_id, torch_dtype=torch.float32, use_safetensors=True
).to(device)



def create_from_text(prompt):
    image = pipe_text_to_image(prompt, num_inference_steps=10).images[0] 
    image.save(prompt.replace(" ", "_") + ".png")
