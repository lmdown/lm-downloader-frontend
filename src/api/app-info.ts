import api from './axios'

export const getRelatedAppList = async (ids: string) => {
    const response = await api.get(`/app-store/ai-app-info/?ids=${ids}`);
    return response.data.data;
}

// http://localhost:19312/api/app-store/ai-app-info/install-name/ollama?locale=en
export const getAIAppInfoByInstallName = async (installName: string | undefined) => {
  if(!installName) {
    return null
  }
  const response = await api.get(`/app-store/ai-app-info/install-name/${installName}`);
  return response.data;
}
