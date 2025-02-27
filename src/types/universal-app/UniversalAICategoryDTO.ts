import { UniversalAIAppDTO } from "./UniversalAIAppDTO"

export interface UniversalAICategoryDTO {
  id?: string
  name: string
  icon?: string
  shortDesc?: string
  subCats?: UniversalAICategoryDTO[]
  apps?: UniversalAIAppDTO[]
}
