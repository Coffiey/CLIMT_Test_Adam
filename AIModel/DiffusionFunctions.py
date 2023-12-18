
import os 
from PIL import Image, ImageDraw
from .DiffusionModel import pipe_image_to_image, pipe_text_to_image


def create_from_text(prompt, negative_prompt,  guidance_scale, num_inference_steps=5):
    image = pipe_text_to_image(prompt, num_inference_steps=5).images[0] 
    image_prompt = prompt.replace(' ', '_')
    image_location = f"created/model/TTI/{image_prompt}.png"
    image.save(image_location)
    return {"url": image_location}
    


def create_from_image(prompt, negative_prompt,  guidance_scale,num_inference_steps=5):
    prompt_image = Image.open("./cow.jpeg").convert("RGB")
    prompt_image = prompt_image.resize((768, 512))
    image = pipe_image_to_image(prompt=prompt,image=prompt_image, num_inference_steps=5,strength=0.5, guidance_scale=7.5).images[0] 
    image_prompt = prompt.replace(' ','_')
    image_location = f"created/model/ITI/{image_prompt}.png"
    image.save(image_location)
    return {"url": image_location}


def create_from_text_with_lora(prompt, negative_prompt,  guidance_scale,num_inference_steps=5):
    # pipe_text_to_image.load_lora_weights("ostris/super-cereal-sdxl-lora")
    # pipe_text_to_image.fuse_lora(lora_scale=0.6)
    image = pipe_text_to_image(prompt, num_inference_steps=50).images[0] 
    image_prompt = prompt.replace(' ', '_')
    image_location = f"created/lora/TTI/{image_prompt}.png"
    image.save(image_location)
    pipe_text_to_image.unload_lora_weights()
    return {"url": image_location}

def create_from_image_with_lora(prompt, negative_prompt,  guidance_scale,num_inference_steps=5):
#     pipe_text_to_image.load_lora_weights("llatent-consistency/lcm-lora-sdv1-5", weight_name="latent-consistency/lcm-lora-sdv1-5",)
#     pipe_text_to_image.fuse_lora(lora_scale=0.6)
    image = pipe_text_to_image(prompt, num_inference_steps=50).images[0] 
    image_prompt = prompt.replace(' ', '_')
    image_location = f"created/loral/ITI/{image_prompt}.png"
    image.save(image_location)
    pipe_text_to_image.unload_lora_weights()
    return {"url": image_location}