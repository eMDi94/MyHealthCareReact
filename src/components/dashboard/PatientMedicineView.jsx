import React, { Fragment} from 'react';
import PropTypes from 'prop-types';
import MedicineList from './MedicineList';
import AddMedicine from './AddMedicine';


function PatientMedicineView(props) {
    const { userCode } = props;
    return (
        <Fragment>
            <AddMedicine />
            <MedicineList userCode={userCode} isPatient={true} />
        </Fragment>
    );
}


PatientMedicineView.propTypes = {
    userCode: PropTypes.string.isRequired,
};


export default PatientMedicineView;
