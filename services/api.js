import axios from 'axios';
import Constants from 'expo-constants';

const apiKey = Constants.expoConfig?.extra?.rawgApiKey;

if (!apiKey) {
    console.error("Chave da API não encontrada no app.json (extra.rawgApiKey)");
}

const apiClient = axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: apiKey,
  }
});

export const getPopularGames = (page = 1) => {
  return apiClient.get('/games', { params: { page: page, page_size: 20 } });
};

export const getGameDetails = (id) => {
  return apiClient.get(`/games/${id}`);
};

export const searchGames = (query) => {
  return apiClient.get('/games', { params: { search: query, page_size: 10 } });
};