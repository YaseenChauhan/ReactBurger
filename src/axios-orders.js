import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://reactburger-bd7a4.firebaseio.com'
})
export default instance;