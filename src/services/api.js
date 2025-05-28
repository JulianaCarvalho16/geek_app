import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000/api' });

export const registerUser = (data) => API.post('/register', data);
export const loginUser = (data) => API.post('/login', data);
export const getTasks = (token) => API.get('/tasks', { headers: { Authorization: token } });
export const createTask = (data, token) => API.post('/tasks', data, { headers: { Authorization: token } });

const API_BASE_URL = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export async function signUp(email, password) {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, {
    email,
    password
  });

  return response.data;
}

export async function signIn(email, password) {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    email,
    password
  });

   if (response.data && response.data.token) {
    return response.data;
  } else {
    throw new Error('Usuário não encontrado ou senha incorreta');
  }
}

export default API;
