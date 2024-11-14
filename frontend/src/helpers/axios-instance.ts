import axios from 'axios';

const BASE_URL = await import.meta.env.VITE_API_PATH;
console.log('====================================');
console.log(BASE_URL);
console.log('====================================');
const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
