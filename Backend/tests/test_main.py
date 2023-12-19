from fastapi.testclient import TestClient

from ...main import app

client = TestClient(app)

def test_main():
    response = client.get("/")
    assert response.status_code == 200

def test_text_to_image():
    headers = { "Content-Type": "multipart/form-data" }
    data = {"prompt": "your_prompt", "negative_prompt": "your_negative_prompt"}
    response = client.post("/api/model/text-to-image", headers=headers, data=data)
    assert response.status_code == 400

def test_image_to_image():
    headers = { "Content-Type": "multipart/form-data" }
    data = {"prompt": "your_prompt", "negative_prompt": "your_negative_prompt"}
    response = client.post("/api/model/image-to-image", headers=headers, data=data)
    assert response.status_code == 400

def test_load_lora():
    headers = { "Content-Type": "application/json" }
    data = {"downloadURL": "https://civitai.com/api/download/models/263470", "name" : "edgPinayDollLikeness.safetensors" }
    response = client.put("/api/lora/load-lora-model-from-name", headers=headers, data=data)
    assert response.status_code == 400

def test_unload_lora():
    response = client.delete("/api/lora/delete-lora-model")
    assert response.status_code == 204

def test_path_not_found():
    response = client.get("/1234/not-real")
    assert response.status_code == 200