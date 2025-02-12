import api from './axios'
export const getHomeBanners = async () => {
  // try {
    const response = await api.get(`/app-store/home-banner/`);
    return response.data;
  // } catch (error) {
  //   console.error('Failed to fetch app:', error);
  // }
}
