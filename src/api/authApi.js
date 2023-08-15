import axios from 'axios';

const USERS_URL = process.env.REACT_APP_NODE_BACKEND_API + '/api/auth';

export const login = (data) => axios.post(`${USERS_URL}/login`, data);

export const register = (data) => axios.post(`${USERS_URL}/signup`, data);

export const verify = (data) => axios.post(`${USERS_URL}/verifycode`, data);

// export const getUserData = (token) => axios.post(`${USERS_URL}/getuser`, {}, {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

export const updateUser = (data) => axios.put(`${USERS_URL}/profile`, data);

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL
// })
// axiosInstance.interceptors.response.use((response) => {
//   return response
// }, async function (error) {
//   const originalRequest = error.config
//   if (error.response.status === 403 && !originalRequest._retry) {
//     const rToken = localStorage.getItem('refreshToken')
//     originalRequest._retry = true
//     const { data } = await axiosInstance.get(`${USERS_URL}/refresh`, {
//       headers: {
//         Authorization: `Bearer ${rToken}`,
//       },
//     })

//     localStorage.setItem('authToken', data.payload['authToken'])
//     originalRequest.headers.Authorization = `Bearer ${data.payload['authToken']}`

//     return axiosInstance(originalRequest)
//   }

//   return Promise.reject(error)
// })


// export const getUserData = (token) =>  axiosInstance.post(`${USERS_URL}/getuser`, {}, { headers: { Authorization: `Bearer ${token}` } })

