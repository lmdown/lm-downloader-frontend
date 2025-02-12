import { DownloadableModel } from "@/types/app-running/DownloadableModel"

export const OLLAMA_MODELS_KEY = 'OLLAMA_MODELS'
export const OLLAMA_HOST_KEY = 'OLLAMA_HOST'

export const APP_CONFIG = {
  DISPLAY_ENV: [
    "OLLAMA_MODELS",
    "OLLAMA_HOST"
  ]
}

export const ALL_MODELS: DownloadableModel[] = [
  {
    "displayName": "Deepseek-R1",
    "installName": "deepseek-r1",
    "tags":[
      { "parameterSize": "1.5b", "fileSize": "1.1GB" },
      { "parameterSize": "7b", "fileSize": "4.7GB" },
      { "parameterSize": "8b", "fileSize": "4.9GB" },
      { "parameterSize": "14b", "fileSize": "9.0GB" },
      { "parameterSize": "32b", "fileSize": "20GB" },
      { "parameterSize": "70b", "fileSize": "43GB" },
      { "parameterSize": "671b", "fileSize": "404GB" }
    ]
  },
  {
    "displayName": "Llama 3.1",
    "installName": "llama3.1",
    "tags":[
      { "parameterSize": "8b", "fileSize": "4.9GB" },
      { "parameterSize": "70b", "fileSize": "43GB" },
      { "parameterSize": "405b", "fileSize": "243GB" }
    ]
  },
  {
    "displayName": "Qwen 2.5",
    "installName": "qwen2.5",
    "tags":[
      { "parameterSize": "0.5b", "fileSize": "398MB" },
      { "parameterSize": "1.5b", "fileSize": "986MB" },
      { "parameterSize": "3b", "fileSize": "1.9GB " },
      { "parameterSize": "7b", "fileSize": "4.7GB" },
      { "parameterSize": "14b", "fileSize": "9.0GB" },
      { "parameterSize": "32b", "fileSize": "20GB" },
      { "parameterSize": "72b", "fileSize": "47GB" }
    ]
  }

]
