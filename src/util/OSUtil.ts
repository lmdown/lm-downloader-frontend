interface Navigator {
  userAgentData?: NavigatorUAData;
}

interface NavigatorUAData {
  platform?: string;
}

export default class OSUtil {

  static isWindows(): boolean {
    const uaData: NavigatorUAData | undefined = (navigator as Navigator).userAgentData;
    if (uaData && uaData.platform) {
      return uaData.platform === "Windows";
    } else if (navigator.userAgent) {
      return /Win(dows )?NT/.test(navigator.userAgent);
    }
    return false;
  }

  static isMacOS(): boolean {
    const uaData: NavigatorUAData | undefined = (navigator as Navigator).userAgentData;
    if (uaData && uaData.platform) {
      return uaData.platform === "macOS" || uaData.platform === "MacOS"; // 注意大小写可能不同
    } else if (navigator.userAgent) {
      return /Macintosh|Mac OS X/i.test(navigator.userAgent); // 使用正则表达式匹配 macOS 用户代理
    }
    return false;
  }
}
