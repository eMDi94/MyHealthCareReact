import { combineReducers } from 'redux';
import auth from './auth';
import messages from './messages';
import medicines from './medicines';
import measures from './measures';
import doctors from './doctors';
import patients from './patients';
import posologies from './posologies';


export default combineReducers({
    authReducer: auth,
    messagesReducer: messages,
    medicinesReducer: medicines,
    measuresReducer: measures,
    myDoctorsReducer: doctors,
    myPatientsReducer: patients,
    posologiesReducer: posologies,
});
