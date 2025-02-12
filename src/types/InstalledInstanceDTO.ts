/**
 * This Type is defind for Client Side.
 */
export interface InstalledInstanceDTO {
  id: string
  appId: string
  name: string
  version: string
  appInstallPath: string
  appFullPath: string
  installName: string
  installMethod: string
  fileStorageTotalSize: number
  totalSizeCalcTime: Date
  tags: string[];
  fileStorageInfoList: FileStorageInfoDTO[];
  newVersion: string;
  releaseTime: string;
  appIcon: string
  createTime?: Date
  updateTime?: Date
}

export interface AppDownloadDTO {
  method: string;
  url: string;
}
export interface FileStorageInfoDTO {
  /**
   * 类型
   * 可执行程序,
   * 未知
   * 图片
   * 模型文件
   * JS
   * python
   * java
   * html....
   */
  type: string;

  icon: string;

  /**
   * 位置
   */
  location: string;
  /**
   * 大小，以字节为单位
   */
  size: number;
  /**
   * 设备类型，
   * local 本机内部硬盘
   * remote 远程共享目录
   * portable 临时接入的移动设备
   */
  deviceType: string;
  /**
   * flash drive
   * hdd
   * sdd
   */
  storageMediaType: string;

}
