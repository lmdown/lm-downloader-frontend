export function addQueryParamsToPath(path: string, params: { [key: string]: any }): string {
  // 解析路径中的现有查询参数
  const [basePath, existingQueryString] = path.split('?', 2);
  const existingSearchParams = existingQueryString ? new URLSearchParams(existingQueryString) : new URLSearchParams();

  // 创建一个新的 URLSearchParams 对象用于新参数
  const newSearchParams = new URLSearchParams(existingQueryString);

  // 遍历传入的参数，只添加新的查询参数
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      // 如果值为 undefined 或 null，跳过该参数
      continue;
    } else if (Array.isArray(value)) {
      // 如果值是数组，添加多个相同的键
      value.forEach(v => newSearchParams.append(key, v.toString()));
    } else {
      // 否则，直接添加键值对
      newSearchParams.append(key, value.toString());
    }
  }

  // 获取最终的查询字符串
  const queryString = newSearchParams.toString();

  // 如果有查询参数，则将其附加到路径后面
  const fullPath = queryString ? `${basePath}?${queryString}` : basePath;

  return fullPath;
}
