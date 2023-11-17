import axios from 'axios';
import { VITE_BACKEND_URL } from '../../dictionary-front';

const clientAxios = axios.create({
  baseURL: `${VITE_BACKEND_URL}/api`,
});

export default clientAxios;