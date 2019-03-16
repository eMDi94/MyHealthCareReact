import {
    ADD_PARAMETER,
    DELETE_PARAMETER,
    RETRIEVE_PARAMETERS,
    PARAMETERS_LOADING,
    ADD_MEASURE,
    RETRIEVE_MEASURES,
    DELETE_MEASURE,
    MEASURES_LOADING
} from './types';
import axios from 'axios';
import { objectKeysFromCamelCaseToSnakeCase, objectKeysFromSnakeCaseToCamelCase } from '../utils/case';
import { tokenConfig } from '../utils/http';
import { createMessage } from './messages';


export const addParameter = ({ name, unityMeasure }) => (dispatch, getState) => {
    const parameter = objectKeysFromCamelCaseToSnakeCase({
        name,
        unityMeasure,
    });
    const config = tokenConfig(getState().authReducer.token);
    axios
        .post('http://localhost:8000/api/measures/patient/create-parameter/', parameter, config)
        .then(res => {
            const p = objectKeysFromSnakeCaseToCamelCase(res.data);
            dispatch({
                type: ADD_PARAMETER,
                payload: p,
            });
            dispatch(
                createMessage({ success: 'Parametro aggiunto con successo' })
            );
        })
        .catch(() => {
            dispatch(
                createMessage({ error: 'Non è stato possibile inserire il nuovo parametro.' })
            );
        });
}


export const deleteParameter = parameterCode => (dispatch, getState) => {
    const config = tokenConfig(getState().authReducer.token);
    axios
        .delete(`http://localhost:8000/api/measures/patient/delete-parameter/${parameterCode}/`, config)
        .then(() => {
            dispatch({
                type: DELETE_PARAMETER,
                payload: parameterCode,
            });
            dispatch(
                createMessage({ success: 'Parametro eliminato con successo '})
            );
        })
        .catch(() => {
            dispatch(
                createMessage({ error: 'Non è stato possibile eliminare il parametro.' })
            );
        });
}


export const retrieveParameters = patientCode => (dispatch, getState) => {
    if (getState().measuresReducer.of === patientCode) {
        return;
    }
    dispatch({
        type: PARAMETERS_LOADING,
    });
    const config = tokenConfig(getState().authReducer.token);
    axios
        .get(`http://localhost:8000/api/measures/parameters/${patientCode}/`, config)
        .then(res => {
            const parametersArray = res.data.map(value => objectKeysFromSnakeCaseToCamelCase(value));
            dispatch({
                type: RETRIEVE_PARAMETERS,
                payload: {
                    parameters: parametersArray,
                    code: patientCode,
                },
            });
        })
        .catch(() => {
            dispatch(
                createMessage({ error: 'Non è stato possibili recuperare i parametri' })
            );
        });
}


export const addMeasure = (date, hour, parameter, value) => (dispatch, getState) => {
    const config = tokenConfig(getState().authReducer.token);
    const data = {
        date,
        hour,
        parameter,
        value,
    }
    axios
        .post('http://localhost:8000/api/measures/patient/create-measure/', data, config)
        .then(res => {
            const measureObject = objectKeysFromSnakeCaseToCamelCase(res.data);
            dispatch({
                type: ADD_MEASURE,
                payload: measureObject,
            });
            dispatch(
                createMessage({ success: 'Misurazione aggiunta con successo '})
            );
        })
        .catch(() => {
            dispatch(
                createMessage({ error: 'Non è stato possibile aggiungere la misurazione' })
            );
        });
}


export const retrieveMeasures = (patientCode, startDate, endDate) => (dispatch, getState) => {
    dispatch({
        type: MEASURES_LOADING,
    });
    const config = tokenConfig(getState().authReducer.token);
    const url = `http://localhost:8000/api/measures/${patientCode}/?start=${startDate}&end=${endDate}`;
    axios
        .get(url, config)
        .then(res => {
            const measures = res.data.map(value => objectKeysFromSnakeCaseToCamelCase(value));
            dispatch({
                type: RETRIEVE_MEASURES,
                payload: measures,
            });
        })
        .catch(() => {
            dispatch(
                createMessage({ error: 'Non è stato possibile recuperare le misurazioni' })
            );
        });
}


export const deleteMeasure = measureCode => (dispatch, getState) => {
    const config = tokenConfig(getState().authReducer.token);
    const url = `http://localhost:8000/api/measures/patient/delete-measure/${measureCode}`;
    axios
        .delete(url, config)
        .then(res => {
            dispatch({
                type: DELETE_MEASURE,
                payload: measureCode,
            });
            dispatch(
                createMessage({ success: 'Misurazione eliminata con successo '})
            );
        })
        .catch(() => {
            dispatch(
                createMessage({ error: 'Non è stato possibile eliminare la misurazione' })
            );
        });
}
