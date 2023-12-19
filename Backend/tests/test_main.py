from fastapi.testclient import TestClient

from ...main import app

client = TestClient(app)

def test_main():
    response = client.get("/")
    assert response.status_code == 200

def test_text_to_image():
    response = client.get("/")
    assert response.status_code == 200

def test_image_to_image():
    response = client.get("/")
    assert response.status_code == 200

def test_load_lora():
    response = client.get("/")
    assert response.status_code == 200

def test_unload_lora():
    response = client.get("/")
    assert response.status_code == 200

def test_path_not_found():
    response = client.get("/")
    assert response.status_code == 200