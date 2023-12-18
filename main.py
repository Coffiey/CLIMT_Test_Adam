import uvicorn
from fastapi import FastAPI

from functions import create_from_text, create_from_image,create_from_text_with_lora


app = FastAPI()

@app.get("/")
def index():
    return {"message" : "hello Adam"}

@app.get("/model/text-to-image/{prompt}")
def index(prompt):
    image_prompt = prompt.replace("_"," ")
    create_from_text(image_prompt)
    return {"message" : "hello dave"}

@app.get("/model/image-to-image/{prompt}")
def index(prompt):
    image_prompt = prompt.replace("_"," ")
    create_from_image(image_prompt)
    return {"message" : "image prompt"}

@app.get("/lora/text-to-image/{prompt}")
def index(prompt):
    image_prompt = prompt.replace("_"," ")
    create_from_text(image_prompt)
    return {"message" : "loraimage"}

@app.get("/*")
def index():
    return {"message" : "404"}

if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)