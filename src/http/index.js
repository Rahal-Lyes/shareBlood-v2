import APIConfig from "@/config/setting";
import axios from 'axios';
import router from '@/router/index.js';


const instance=axios.create(APIConfig);

export default instance;