import {
    AUTH_ERROR,
    USER_LOADED,
    USER_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAILURE
} from './types';
import { tokenConfig } from '../utils/http';
import { objectKeysFromCamelCaseToSnakeCase, objectKeysFromSnakeCaseToCamelCase } from '../utils/case';
import axios from 'axios';
import { createMessage } from './messages';


export const loadUser = () => (dispatch, getState) => {
    if (!getState().authReducer.token) return;
    dispatch({ type: USER_LOADING })
    const config = tokenConfig(getState().authReducer.token);
    axios
        .get('http://localhost:8000/api/accounts/retrieve-user/', config)
        .then(res => {
            const user = objectKeysFromSnakeCaseToCamelCase(res.data);
            dispatch({
                type: USER_LOADED,
                payload: user,
            });
        })
        .catch(() => {
            dispatch({
                type: AUTH_ERROR,
            });
        });
}


export const login = (email, password, loginType) => dispatch => {
    const loginObj = objectKeysFromCamelCaseToSnakeCase({
        email,
        password,
        loginType,
    });
    console.log(loginObj);
    axios
        .post('http://localhost:8000/api/accounts/login/', loginObj)
        .then(res => {
            const user = objectKeysFromSnakeCaseToCamelCase(res.data.user);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    user,
                    token: res.data.token,
                },
            });
        })
        .catch(err => {
            if (err.response && err.response.statusCode === 401) {
                dispatch(
                    createMessage({ error: 'Credenziali non valide' })
                );
            }
            console.log(err);
            dispatch({
                type: LOGIN_FAILURE,
            });
        });
}


export const logout = () => (dispatch, getState) => {
    const config = tokenConfig(getState().authReducer.token);
    console.log(config);
    axios
        .post('http://localhost:8000/api/accounts/logout/', null, config)
        .then(() => dispatch({ type: LOGOUT_SUCCESS }))
        .catch(() => dispatch(createMessage({ error: 'Logout non riuscito' })));
}


export const patientRegistration = (firstName, lastName, city, province, region, email, password) => dispatch => {
    const data = objectKeysFromCamelCaseToSnakeCase({
        firstName,
        lastName,
        city,
        province,
        region,
        email,
        password,
    });
    axios
        .post('http://localhost:8000/api/accounts/patient/patient-registration/', data)
        .then(res => {
            const user = objectKeysFromSnakeCaseToCamelCase(res.data.user);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: {
                    user,
                    token: res.data.token,
                },
            });
        })
        .catch(err => {
            dispatch(createMessage({ error: 'Registrazione non riuscita' }));
            dispatch({
                type: REGISTER_FAILURE,
            });
        });
}
