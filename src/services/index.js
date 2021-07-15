const API_URL = 'https://graphql.datocms.com/';
const API_TOKEN = '5c20909d4aa00febcba58882c39933';

const DATO_HEADERS = {
  'Content-Type' : 'application/json',
  'Accept' : 'application/json',
  'Authorization' : `Bearer ${API_TOKEN}`
}

async function queryRequest(query){
  return await fetch(API_URL, {
    method: 'post',
    headers: DATO_HEADERS,
    body: JSON.stringify({query})
  }).then(response => response.json());
}

export const api = {
  comunidades: {
    create: async (comunidade) => {
      return fetch('/api/comunidades', {
        method: 'POST',
        headers: DATO_HEADERS,
        body: JSON.stringify({comunidade})
      }).then(res => res.json());
    },
    get: async () => {
      const lista = await queryRequest(`query {
        allComunidades{
          id, 
          name, 
          image, 
          link
        }
      }`);

      return lista.data.allComunidades;
    },
  },
  followings: {
    get: async () => {
      const lista = await queryRequest(`query {
        allFollowings{
          id, 
          name, 
          image, 
          link
        }
      }`);

      return lista.data.allFollowings;
    }
  },
  followers: {
    get: async () => {
      const lista = await queryRequest(`query {
        allFollowers{
          id, 
          name, 
          image, 
          link
        }
      }`);

      return lista.data.allFollowers;
    },
  },
  recados: {
    create: async (recado) => {
      return fetch('/api/recados', {
        method: 'POST',
        headers: DATO_HEADERS,
        body: JSON.stringify({recado})
      }).then(res => res.json());
    },
  
    get: async () => {
      const lista = await queryRequest(`query {
        allRecados{
          id, 
          from, 
          message,
          createdAt
        }
      }`);
  
      return lista.data.allRecados;
    }
  }
  
}