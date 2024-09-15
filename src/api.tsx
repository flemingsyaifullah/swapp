// src/api.ts

const BASE_URL = 'https://swapi.dev/api';

export const API_URLS = {
    peoples: () => `${BASE_URL}/people/`,
    people: (id: string) => `${BASE_URL}/people/${id}/`,
    films: (id: string) => `${BASE_URL}/films/${id}/`,
    species: (id: string) => `${BASE_URL}/species/${id}/`,
    starships: (id: string) => `${BASE_URL}/starships/${id}/`,
    vehicles: (id: string) => `${BASE_URL}/vehicles/${id}/`,
    homeworld: (url: string) => url
};
