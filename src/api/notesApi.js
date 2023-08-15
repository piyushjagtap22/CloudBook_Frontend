import axios from 'axios';

const USERS_URL = process.env.REACT_APP_NODE_BACKEND_API + '/api/notes';

// export const fetchNote = (data) => axios.get(`${USERS_URL}/fetchallnotes`, data);

export const createNote = (token, data) => {
    // console.log(data)
    return axios.request({
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:5000/api/notes/createnote',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: JSON.stringify(data)
    })
};

export const updateNote = (token, { id, title, description, tag }) => {
    return axios.request({
        method: 'put',
        maxBodyLength: Infinity,
        url: `http://localhost:5000/api/notes/updatenote/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: JSON.stringify({ title, description, tag })
    })
};

export const removeNote = (token, id) => {
    // console.log(data)
    return axios.request({
        method: 'delete',
        maxBodyLength: Infinity,
        url: `http://localhost:5000/api/notes/deletenote/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};

export const fetchNote = (token) => axios.get(`${USERS_URL}/fetchallnotes`, {
    headers: {
        'Authorization': `Bearer ${token}`,
    },
})