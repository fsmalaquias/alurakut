const API_URL = 'https://graphql.datocms.com/';
const API_TOKEN = '5c20909d4aa00febcba58882c39933';

const DATO_HEADERS = {
  'Content-Type' : 'application/json',
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
  getComunidades: async () => {
    return await queryRequest(`{allComunidades{id, name, image, link}}`);
  },
  getFollowings: async () => {
    return await queryRequest(`{allFollowings{id, name, image, link}}`);
  },
  getFollowers: async () => {
    return await queryRequest(`{allFollowers{id, name, image, link}}`);
  }
}