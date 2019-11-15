import axios from 'axios';
import env from '../environments/environment';

let instance = axios.create({
    baseURL: env.apiUrl,
    headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
        "Access-Control-Allow-Origin": "*"
    },
});

export default instance;