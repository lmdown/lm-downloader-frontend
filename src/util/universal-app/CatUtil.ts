import { UniversalAICategoryDTO } from "@/types/universal-app/UniversalAICategoryDTO"
import LocaleUtil from "../LocaleUtil"

export default class CatUtil {

  static getLocaleName(cat:UniversalAICategoryDTO) {
    if(LocaleUtil.localeIsEn()) {
      return cat.name_en
    } else {
      return cat.name_zh
    }
  }

}
