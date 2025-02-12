import { AIAppDTO } from '@/types/AIAppDTO'
import api from './axios'
import { InstalledInstanceDTO } from '@/types/InstalledInstanceDTO'

export const createInstallInstance = async (app: AIAppDTO) => {
  const response = await api.post(`/self-manage/installed-instance/app/${app.id}`, app)
  return response.data
}

export const getInstalledInstance = async (instanceId: string) => {
  const response = await api.get(`/self-manage/installed-instance/${instanceId}`)
  return response.data
}

export const getInstalledInstanceList = async ():Promise<InstalledInstanceDTO[]> => {
  const response = await api.get(`/self-manage/installed-instance`)
  return response.data
}

export const getInstalledInstanceVer = async (installName: string) => {
  const response = await api.get(`/self-manage/installed-instance/check-version/${installName}`)
  console.log('response.data', response.data)
  return response.data
}

export const deleteInstalledInstance = async (instanceId: string) => {
  const response = await api.delete(`/self-manage/installed-instance/${instanceId}`)
  return response.data
}

