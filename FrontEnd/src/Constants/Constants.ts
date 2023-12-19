export const BASEURL = "http://127.0.0.1:8000";
export const TEXT_TO_IMAGE_URL = BASEURL + "/api/model/text-to-image";
export const IMAGE_TO_IMAGE_URL = BASEURL + "/api/model/image-to-image";
export const LOAD_LORA_URL = BASEURL + "/api/lora/load-lora-model-from-name";
export const UNLOAD_LORA_URL = BASEURL + "/api/lora/delete-lora-model";
export const GET_LORA_URL =
  "https://civitai.com/api/v1/models?types=LORA&nsfw=false&query=";
