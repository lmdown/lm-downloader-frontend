import { DownloadableModelTag } from "./DownloadableModelTag"

export interface DownloadableModel {
  displayName: string
  installName: string
  tags: DownloadableModelTag[]
}
