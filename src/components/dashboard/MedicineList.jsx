import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMedicines, deleteMedicine } from '../../actions/medicines';
import './MedicineList.css';
import { MetroSpinner } from 'react-spinners-kit';


function Medicine(props) {
    const { code, name, quantity, unity } = props.medicine;
    const { deleteMedicine, isPatient } = props;
    return (
        <tr>
            <td>{ name }</td>
            <td>{ quantity }</td>
            <td>{ unity }</td>
            {
                isPatient ? <td>
                    <button className="button is-danger has-text-white" onClick={() => deleteMedicine(code)}>
                        Elimina
                    </button>
                </td> : undefined
            }
        </tr>
    );
}


Medicine.propTypes = {
    medicine: PropTypes.object.isRequired,
    deleteMedicine: PropTypes.func.isRequired,
    isPatient: PropTypes.bool,
};


class MedicineList extends React.Component {

    componentWillMount() {
        const { userCode } = this.props;
        this.props.getMedicines(userCode);
    }

    
    render() {
        const { medicinesLoading } = this.props;
        if (medicinesLoading === true) {
            return <MetroSpinner size={30} />;
        } else {
        const { medicines, isPatient, deleteMedicine } = this.props;
        return (
                <div className="columns is-centered">
                    <table className="table is-striped table-style" style={{width: '50%'}}>
                        <thead>
                            <tr>
                                <th><abbr title="Nome">Nome</abbr></th>
                                <th><abbr title="Quantità">Quantità</abbr></th>
                                <th><abbr title="Misura">Misura</abbr></th>
                                {
                                    isPatient ? <th>Elimina</th> : undefined
                                }
                            </tr>
                        </thead>
                        <tbody>                
                            {
                                medicines.map((value, index) => 
                                    <Medicine medicine={value} isPatient={isPatient} key={index}
                                                deleteMedicine={deleteMedicine} />)
                            }
                        </tbody>
                    </table>
                </div>
            );
        }
    }

}


MedicineList.propTypes = {
    userCode: PropTypes.string.isRequired,
    getMedicines: PropTypes.func.isRequired,
    medicines: PropTypes.array.isRequired,
    isPatient: PropTypes.bool.isRequired,
    medicinesLoading: PropTypes.bool.isRequired,
    deleteMedicine: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
    medicines: state.medicinesReducer.medicines,
    medicinesLoading: state.medicinesReducer.medicinesLoading,
});


const mapDispatchToProps = {
    getMedicines,
    deleteMedicine,
};


export default connect(mapStateToProps, mapDispatchToProps)(MedicineList);
