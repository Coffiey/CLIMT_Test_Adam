import uvicorn
from fastapi import FastAPI

from functions import create_from_text


app = FastAPI()

@app.get("/")
def index():
    return {"message" : "hello Adam"}

@app.get("/model/text-to-image/{prompt}")
def index(prompt):
    image_prompt = prompt.replace("_"," ")
    create_from_text(image_prompt)
    return {"message" : "hello dave"}

@app.get("/model/image-to-image")
def index():
    return {"message" : "hello Adam"}

@app.get("/*")
def index():
    return {"message" : "hello Adam"}

if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)