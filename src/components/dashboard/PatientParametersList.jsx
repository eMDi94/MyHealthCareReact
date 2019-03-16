import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import AddParameter from './AddParameter';
import ParametersList from './ParametersList';


function PatientParameterView(props) {
    const { patientCode } = props;
    return (
        <Fragment>
            <AddParameter />
            <ParametersList patientCode={patientCode} userRole="Patient" />
        </Fragment>
    );
}


PatientParameterView.propTypes = {
    patientCode: PropTypes.string.isRequired,
};


export default PatientParameterView;
