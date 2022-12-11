import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-fca4d-default-rtdb.firebaseio.com/'
});

export default instance;