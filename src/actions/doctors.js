import {
    RETRIEVE_MY_DOCTORS,
    ADD_DOCTOR,
    DELETE_DOCTOR,
    DOCTORS_LOADING
} from './types';
import axios from 'axios';
import { objectKeysFromCamelCaseToSnakeCase, objectKeysFromSnakeCaseToCamelCase } from '../utils/case';
import { tokenConfig } from '../utils/http';
import { createMessage } from './messages';


export const retrieveMyDoctors = () => (dispatch, getState) => {
    if (getState().myDoctorsReducer.myDoctors.length > 0) return;
    dispatch({
        type: DOCTORS_LOADING,
    });
    const config = tokenConfig(getState().authReducer.token);
    axios
        .get('http://localhost:8000/api/accounts/patient/my-doctors/', config)
        .then(res => {
            const doctors = res.data.map(value => objectKeysFromSnakeCaseToCamelCase(value));
            dispatch({
                type: RETRIEVE_MY_DOCTORS,
                payload: doctors,
            });
        })
        .catch(() => {
            dispatch(
                createMessage({ error: 'Non è stato possibile cercare i tuoti dottori '})
            );
        });
}


export const addDoctor = doctorCode => (dispatch, getState) => {
    const config = tokenConfig(getState().authReducer.token);
    const data = objectKeysFromCamelCaseToSnakeCase({doctorCode});
    axios
        .post('http://localhost:8000/api/accounts/patient/add-doctor/', data, config)
        .then(res => {
            const doctor = objectKeysFromSnakeCaseToCamelCase(res.data);
            dispatch({
                type: ADD_DOCTOR,
                payload: doctor,
            });
            dispatch(
                createMessage({ success: 'Dottore aggiunto con successo'})
            );
        })
        .catch(() => {
            dispatch(
                createMessage({ error: 'Non è stato possibile aggiungere il dottore' })
            );
        });
}


export const deleteDoctor = doctorCode => (dispatch, getState) => {
    const config = tokenConfig(getState().authReducer.token);
    axios
        .delete(`http://localhost:8000/api/accounts/patient/delete-doctor/${doctorCode}/`, config)
        .then(() => {
            dispatch({
                type: DELETE_DOCTOR,
                payload: doctorCode,
            });
            dispatch(
                createMessage({ success: 'Dottore rimosso dalla lista con successo' })
            );
        })
        .catch(() => {
            dispatch(
                createMessage({ error: 'Non è stato possibile rimuovere il dottore dalla lista' })
            );
        });
}
