import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { retrieveParameters, deleteParameter } from '../../actions/measures';
import { MetroSpinner } from 'react-spinners-kit';


function Parameter(props) {
    const { param, deleteParameter, userRole } = props;
    return (
        <tr>
            <td>{ param.name }</td>
            <td>{ param.unityMeasure }</td>
            {
                userRole === 'Patient' ? <td>
                    <button className="button is-danger has-text-white"
                            onClick={() => deleteParameter(param.code)}>
                        Elimina
                    </button>
                </td> : null
            }
        </tr>
    );
}


Parameter.propTypes = {
    param: PropTypes.object.isRequired,
    deleteParameter: PropTypes.func.isRequired,
    userRole: PropTypes.string.isRequired,
};


class ParametersList extends Component {

    componentWillMount() {
        const { patientCode } = this.props;
        this.props.getParameters(patientCode);
    }

    render() {
        const { parametersLoading } = this.props;
        if (parametersLoading === true) {
            return <MetroSpinner size={30} />;
        } else {
            const { parameters, userRole, deleteParameter } = this.props;
            return (
                <div className="columns is-centered">
                    <table className="table is-striped" style={{width: '50%'}}>
                        <thead>
                            <tr>
                                <th><abbr title="Nome">Nome</abbr></th>
                                <th><abbr title="UdM">Unità di Misura</abbr></th>
                                { userRole === 'Patient' ? <th></th> : null }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                parameters.map((value, index) => 
                                    <Parameter key={index} param={value} deleteParameter={deleteParameter}
                                                userRole={userRole} />)
                            }
                        </tbody>
                    </table>
                </div>
            );
        }
    }

}


ParametersList.propTypes = {
    parameters: PropTypes.array.isRequired,
    getParameters: PropTypes.func.isRequired,
    patientCode: PropTypes.string.isRequired,
    parametersLoading: PropTypes.bool.isRequired,
    userRole: PropTypes.string.isRequired,
    deleteParameter: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
    parameters: state.measuresReducer.parameters,
    parametersLoading: state.measuresReducer.parametersLoading,
});


const mapDispatchToProps = {
    getParameters: retrieveParameters,
    deleteParameter,
};


export default connect(mapStateToProps, mapDispatchToProps)(ParametersList);
