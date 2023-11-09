import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
const baseURL = 'https://www.edu-cons.online'
const access = localStorage.getItem('accessToken')
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const axiosInstance = axios.create({
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosInstance.interceptors.request.use(async req => {
    
    console.log('Request:', req);
    const user = jwt_decode(localStorage.getItem('accessToken'))
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if (isExpired){
        console.log('false');
    }else{
        console.log('true');
        req.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    }
    if(!isExpired)  return req
    console.log(localStorage.getItem('refreshToken'));

    try {
        const response = await axios.post(
          `${baseURL}/token/refresh/`,
          {
            "refresh": localStorage.getItem('refreshToken'),
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
            cancelToken: source.token, 
          }
        );
    
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        req.headers.Authorization = `Bearer ${response.data.access}`;
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          console.error('Error refreshing the token:', error);
          localStorage.clear()
          window.location.href = '/login';

          
        }
      }
      return req;
    })


export default axiosInstance;