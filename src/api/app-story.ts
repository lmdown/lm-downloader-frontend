import api from './axios'

export const getAppStory = async (id: string) => {
    const response = await api.get(`/app-store/app-story/${id}`);
    return response.data;
}
