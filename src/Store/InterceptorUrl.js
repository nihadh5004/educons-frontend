import { baseUrl } from "./BaseUrl";
import axios from "axios";
// axios.defaults.baseURL = 'http://localhost:8000/api/';

let refresh = false;

axios.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401 && !refresh) {
        refresh = true;

        console.log(localStorage.getItem('refreshToken'))
        const response = await axios.post(`${baseUrl}/token/refresh/`, {
            refresh:localStorage.getItem('refreshToken')
        }, {
            headers: {
              'Content-Type': 'application/json',
            }
          },{withCredentials: true});

        if (response.status === 200) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`;
            const re = localStorage.getItem('refreshToken')
            console.log(re);

            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            const re2 = localStorage.getItem('refreshToken')
            console.log(re2)
            console.log('200');
            const newRequest = {
                ...error.config,
                headers: {
                  ...error.config.headers,
                  'Authorization': `Bearer ${response.data['access']}`,
                },
              };
            return axios(newRequest);
        }
    }
    refresh = false;
    return error;
});