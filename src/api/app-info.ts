import api from './axios'

export const getRelatedAppList = async (ids: string) => {
    const response = await api.get(`/app-store/ai-app-info/?ids=${ids}`);
    return response.data.data;
}
