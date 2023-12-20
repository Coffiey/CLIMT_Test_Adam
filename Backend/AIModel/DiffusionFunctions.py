from PIL import Image
from .DiffusionModel import pipe_image_to_image, pipe_text_to_image


async def create_from_text(prompt, negative_prompt, guidance_scale, num_inference_steps, lora_scale=None):
    """
    This function will create a single Image from a prompt useing stable diffusion 1.5 and save it to the file tree

    paramters:
     - prompt (string) : positive prompts for image genereation.
     - negative_prompt (string) : negative prompt to be avioded by image generation.
     - guidance_scale (float) : how close the image alligns with the prompt.
     - num_inference_steps (int) : number of duffusion run (min5, max 50), determines quality at cost of speed.
     - lora_scale (float | None) : if included will how much lora weights will effect image.

     retruns:
        [image url in file tree, error]
    """
    try:
        if lora_scale:
            pipe_text_to_image.fuse_lora(lora_scale)
        image = pipe_text_to_image(prompt=prompt, negative_prompt=negative_prompt,guidance_scale=guidance_scale, num_inference_steps=num_inference_steps).images[0] 
        image_prompt = prompt.replace(' ', '_')[:10]
        image_location = "created/model/text_to_image/" + image_prompt + ".png"
        image.save(image_location)
        return [{"generatedImageURL": image_location}, False]
    except Exception as e:
        return [False, e]



async def create_from_image(prompt, negative_prompt, guidance_scale, num_inference_steps, image_for_prompt, strength, lora_scale=None):
    """
    This function will create a single Image from a prompt adn uploaded image useing stable diffusion 1.5 and save it to the file tree

    paramters:
     - prompt (string) : positive prompts for image genereation.
     - negative_prompt (string) : negative prompt to be avioded by image generation.
     - guidance_scale (float) : how close the image alligns with the prompt.
     - num_inference_steps (int) : number of duffusion run (min5, max 50), determines quality at cost of speed.
     - image_for_prompt (Image): reference image.
     - strength (float) : how close to generated image is to the new image. 
     - lora_scale (float | None) : if included will how much lora weights will effect image.

     retruns:
        [image url in file tree, error]

    """
    try:
        if lora_scale:
            pipe_text_to_image.fuse_lora(lora_scale)
        prompt_image = Image.open("./cow.jpeg").convert("RGB")
        prompt_image = prompt_image.resize((768, 512))
        image = pipe_image_to_image(prompt=prompt,negative_prompt=negative_prompt, image=image_for_prompt, num_inference_steps=num_inference_steps,strength=strength, guidance_scale=guidance_scale).images[0] 
        image_prompt = prompt.replace(' ', '_')[:10]
        image_location = "created/model/text_to_image/" + image_prompt + ".png"
        image.save(image_location)
        return [{"generatedImageURL": image_location}, False]
    except Exception as e:
        return [False, e]

async def load_model_with_lora(file_location, weight_name):
    """
    this function loads lora weights into the pre existing "pipe_text_to_image" and "pipe_image_to_image"

    paramters:
    - file_location (string): location in file tree of the downloaded lora.
    - weight_name (string): location of the weights file within the download.

    retruns:
        [success message, error]
    """
    try:
        pipe_text_to_image.load_lora_weights(file_location=file_location, weight_name=weight_name)
        pipe_image_to_image.load_lora_weights(file_location=file_location, weight_name=weight_name)
        return ["lora:"+ weight_name + "has been loaded", False]
    except Exception as e:
        return [False, e]


async def delete_model_with_lora():
    """
    this function unloads lora weights from the pre existing "pipe_text_to_image" and "pipe_image_to_image"

    retruns:
        [success message, error]
    """
    try:
        pipe_text_to_image.unload_lora_weights()
        pipe_image_to_image.unload_lora_weights()
        return ['Model weights reset', False]
    except Exception as e:
        return [False, e]
