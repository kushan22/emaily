import axios from 'axios';
import { FETCH_USER } from './types';
// Redux thunk being a middleware calls this function with dispatch argument
export const fetchUser = () => {
    return async (dispatch) => {
       const res = await axios.get('/api/current_user');
       dispatch({type:FETCH_USER,payload:res.data});  
            
    }
};


export const handleToken = (token) => {
    return async (dispatch) => {
        const res = await axios.post('/api/stripe',token);
        dispatch({type:FETCH_USER,payload:res.data});
    }
}