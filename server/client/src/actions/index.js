import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';
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
};

export const submitSurvey = (values,history) => {
    return async (dispatch) => {

        const res = await axios.post('/api/surveys',values);
        history.push('/surveys'); // history is coming from SurveyReviewForm and it's used to automatically redirect to sepecific Route
        dispatch({type: FETCH_USER,payload: res.data});
    }
};

export const fetchSurveys = () => {
    return async (dispatch) => {
        const res = await axios.get('/api/surveys');
        dispatch({type: FETCH_SURVEYS, payload: res.data});
    }
};