import LocaleUtil from "../LocaleUtil"
import { UniversalAIAppDTO } from "@/types/universal-app/UniversalAIAppDTO"

const DOWNLOADABLE_APPS = [
  'Chatbox AI', // installName 'chatbox-ai',
  'Ollama', //  installName 'ollama',

  'Silly Tavern',
  'F5-TTS',
  'KoboldCpp',
  'LM Studio',
  'ComfyUI',
]

export default class UAppUtil {

  static getLocaleDesc(app: UniversalAIAppDTO) {
    if(LocaleUtil.localeIsEn()) {
      return app.desc_en
    } else {
      return app.desc_zh
    }
  }

  static checkIsDownloadable(app: UniversalAIAppDTO) {
    return DOWNLOADABLE_APPS.includes(app.name)
  }

}
