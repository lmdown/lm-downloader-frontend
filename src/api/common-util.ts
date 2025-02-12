import InstalledModel from '@/types/app-running/InstalledModel';
import api from './axios'

export const pathJoin = async (paths: string[]) => {
  let result
  try {
    const response = await api.post(
      `/self-manage/common-util/path-join`,
      {paths}
    );
    return response.data?.resultPath
  } catch(err) {
    console.log('err', err)
    return result
  }
}

export const getOSEnv = async (keys: string[]) => {
  let result
  try {
    const response = await api.post(
      `/self-manage/common-util/app-running-base-env-info`,
      {keys}
    );

    return response.data
  } catch(err) {
    console.log('err', err)
    return result
  }
}

export const setOSEnv = async (envObj: object) => {
  let result
  try {
    const response = await api.post(
      `/self-manage/common-util/save-app-running-base-env-info`,
      {envObj: envObj}
    );

    return response.data
  } catch(err) {
    console.log('err', err)
    return result
  }
}

export const getLanIP = async () => {
  let result
  try {
    const response = await api.get(
      `/self-manage/common-util/lan-ip`,
    );
    result = response.data?.ip
  } catch(err) {
    console.log('err', err)
  }
  return result
}

export const getUserHomeDir = async () => {
  let result
  try {
    const response = await api.get(
      `/self-manage/common-util/user-home-dir`,
    );
    result = response.data?.userHomeDir
  } catch(err) {
    console.log('err', err)
  }
  return result
}

export const getDirFileSize = async (dirPath: string) => {
  let result = 0
  try {
    const response = await api.get(
      `/self-manage/common-util/dir-file-size?dirPath=${dirPath}`,
    );
    result = response.data?.fileSize
  } catch(err) {
    console.log('err', err)
  }
  return result
}

export const getInstalledModelList = async (appInstallName: string): Promise<InstalledModel[]> => {
  let result = [] as InstalledModel[]
  try {
    const response = await api.get(
      `/self-manage/common-util/installed-model-files/${appInstallName}`,
    );
    result = response.data?.models
  } catch(err) {
    console.log('err', err)
  }
  return result
}

