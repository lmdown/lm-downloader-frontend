import api from './uapp-axios'

export const getUAppMainMenu = async () => {
    const response = await api.get(`uapp-data/cats.json`);
    return response.data;
}

export const getUAppsByCatId = async (catId: string) => {
  const response = await api.get(`uapp-data/${catId}.json`);
  return response.data;
}
