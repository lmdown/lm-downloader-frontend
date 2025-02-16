import DirInfo from "@/types/config/DirInfo";

export default class DirCheckUtil {

  static checkModelsDirValid(dirInfo: DirInfo, requiredDirs: string[]): boolean {
    // 去掉不影响存储模型的系统文件
    dirInfo.subdirs = this.filterSpecialFiles(dirInfo.subdirs)
    dirInfo.files = this.filterSpecialFiles(dirInfo.files)

    // 如果没有任何子目录或文件，认为可用
    if (
      (!dirInfo.subdirs || dirInfo.subdirs.length === 0)
      && (!dirInfo.files || dirInfo.files.length === 0)
    ) {
      return true;
    }

    // 将子目录名称数组转换为Set以便快速查找
    const subDirsSet = new Set(dirInfo.subdirs);

    // 检查所有必需的目录是否存在
    const allRequiredExist = requiredDirs.every(dir => subDirsSet.has(dir));
    return allRequiredExist
  }

  static filterSpecialFiles(fileNames: string[]) {
    if(!fileNames) return fileNames

    // 定义要过滤掉的文件名，不区分大小写
    const specialFiles = ['desktop.ini', '.ds_store', 'thumbs.db'];

    return fileNames.filter(fileName => {
        // 将当前文件名转换为小写后检查是否在特殊文件列表中
        const lowerCaseFileName = fileName.toLowerCase();
        return !specialFiles.includes(lowerCaseFileName);
    });
  }

}
