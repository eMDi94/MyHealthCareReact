import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { addPosology, retrievePosologies, deletePosology } from '../../actions/posologies';
import { getMedicines } from '../../actions/medicines';
import { MetroSpinner } from 'react-spinners-kit';


const daysOfTheWeek = {
    Monday: 'Lunedì',
    Tuesday: 'Martedì',
    Wednesday: 'Mercoledì',
    Thursday: 'Giovedì',
    Friday: 'Venerdì',
    Saturday: 'Sabato',
    Sunday: 'Domenica',
};


function DeletePosology(props) {
    const { posology, sendResponse, isActive } = props;
    const modalActive = isActive ? 'is-active' : '';
    if (!posology) {
        return null;
    }
    return (
        <div className={`modal ${modalActive}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head has-background-primary">
                    <p className="modal-card-title has-text-white">
                        Cancella Posologia
                    </p>
                </header>
                <section className="modal-card-body">
                    <p>Sei sicuro di voler eliminare la seguente posologia:</p>
                    <p>{posology.dayOfTheWeek} { posology.hour } - { posology.text } di {posology.medicine}</p>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick={() => sendResponse(true)}>
                        Sì
                    </button>
                    <button className="button is-danger" onClick={() => sendResponse(false)}>
                        No
                    </button>
                </footer>
            </div>
        </div>
    );
}


DeletePosology.propTypes = {
    posology: PropTypes.object.isRequired,
    sendResponse: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
};


class AddPosologyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            medicineId: undefined,
            hour: undefined,
            text: undefined,
        };
    }

    onChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    }

    render() {
        const { addCalback, closeCallback, dayOfTheWeek, isActive, medicines } = this.props;
        const modalActive = isActive ? 'is-active' : '';
        return (
            <div className={`modal ${modalActive}`}>
                <div className="modal-background" />
                <div className="modal-card">
                    <header className="modal-card-head has-background-primary">
                        <p className="modal-card-title has-text-white">
                            Aggiungi Posologia
                        </p>
                    </header>
                    <section className="modal-card-body">
                        <p>Posologia per giorno { daysOfTheWeek[dayOfTheWeek] } del farmaco: </p>
                        <div className="control" style={{marginTop: 10, marginBottom: 10}}>
                            <div className="select">
                                <select value={this.state.medicineId} onChange={this.onChange} name="medicineId"
                                        className="select">
                                    <option></option>
                                    {
                                        medicines.map((value, index) => 
                                            <option value={value.code} key={index}>
                                                { value.name }
                                            </option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text" value={this.state.hour}
                                        onChange={this.onChange} placeholder="Ora" name="hour" />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text" value={this.state.text}
                                        onChange={this.onChange} placeholder="Quantità" name="text" />
                            </div>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success"
                                onClick={() => addCalback(this.state.medicineId, this.state.hour, this.state.text)}>
                            Aggiungi
                        </button>
                        <button className="button is-danger" onClick={() => closeCallback()}>
                            Annulla
                        </button>
                    </footer>
                </div>
            </div>
        );
    }
}


AddPosologyModal.propTypes = {
    addCallback: PropTypes.func.isRequired,
    closeCallback: PropTypes.func.isRequired,
    dayOfTheWeek: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    medicines: PropTypes.array.isRequired,
};


function Posology(props) {
    const { posology, showDeleteCallback, currentUser } = props;
    let currentCode = currentUser;
    while (currentCode.search('-') !== -1) {
        currentCode = currentCode.replace('-', '');
    }
    return (
        <div className="box has-background-info has-text-white"
                onClick={(showDeleteCallback && posology.doctor === currentCode) ?
                            () => showDeleteCallback(posology) : null}>
            { posology.hour }<br/>{ posology.text }<br/>{ posology.medicine }
        </div>
    );
}


Posology.propTypes = {
    posology: PropTypes.object.isRequired,
    showDeleteCallback: PropTypes.func.isRequired,
    currentUser: PropTypes.number.isRequired,
};


class PosologiesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openDelete: false,
            selectedPosology: undefined,
            openAdd: false,
            selectedDay: undefined,
        };
    }

    componentWillMount() {
        this.props.retrieveMedicines(this.props.patientCode);
        this.props.retrievePosologies(this.props.patientCode);
    }

    addPosology = day => {
        this.setState({
            openAdd: true,
            selectedDay: day,
        });
    }

    performAdd = (medicineId, hour, text) => {
        this.props.addPosology({ dayOfTheWeek: this.state.selectedDay, medicineCode: medicineId, hour, quantity: text });
        this.setState({
            selectedDay: undefined,
            openAdd: false,
        });
    }

    closeAdd = () => {
        this.setState({
            selectedDay: undefined,
            openAdd: false,
        });
    }

    showDelete = posology => {
        this.setState({
            openDelete: true,
            selectedPosology: posology,
        });
    }

    deleteResponse = answer => {
        if (answer === true) {
            this.props.deletePosology(this.state.selectedPosology.posologyCode);
        }
        this.setState({
            openDelete: false,
        });
    }

    render() {
        const { posologiesLoading } = this.props;
        if (posologiesLoading === true) {
            return <MetroSpinner size={30} />;
        }
        const { posologies, user } = this.props;
        const isDoctor = user.role === 'Doctor';
        let posologiesPerDay = {
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
            Sunday: [],
        };
        posologies.forEach(p => {
            const posology = {
                posologyCode: p.code,
                text: p.quantity,
                hour: p.hour,
                medicine: p.medicine,
                dayOfTheWeek: daysOfTheWeek[p.dayOfTheWeek],
                doctor: p.doctor,
            };
            posologiesPerDay = {
                ...posologiesPerDay,
                [p.dayOfTheWeek]: [...posologiesPerDay[p.dayOfTheWeek], posology],
            };
        });
        return (
            <Fragment>
                <table className="table is-fullwidth is-striped">
                    <thead>
                        <tr>
                            {
                                Object.keys(daysOfTheWeek).map(value => 
                                    <th>
                                        { daysOfTheWeek[value] }
                                        { isDoctor ?
                                        <button className="button is-small is-rounded" style={{marginLeft: 10}}
                                                onClick={() => this.addPosology(value)}>
                                            <span className="icon is-small">
                                                <FontAwesomeIcon icon="plus" />
                                            </span>
                                        </button> : null
                                        }
                                    </th>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {
                                Object.keys(posologiesPerDay).map(v => 
                                    <td>
                                        {
                                            posologiesPerDay[v].map(posology =>
                                                <Posology posology={posology}
                                                    showDeleteCallback={isDoctor ? this.showDelete : undefined} 
                                                    currentUser={user.code} />
                                            )
                                        }
                                    </td>
                                )
                            }
                        </tr>
                    </tbody>
                </table>
                <AddPosologyModal addCalback={this.performAdd} closeCallback={this.closeAdd}
                                    dayOfTheWeek={this.state.selectedDay} isActive={this.state.openAdd}
                                    medicines={this.props.medicines} />
                <DeletePosology sendResponse={this.deleteResponse} posology={this.state.selectedPosology}
                                isActive={this.state.openDelete} />
            </Fragment>
        );
    }

}


PosologiesList.propTypes = {
    posologies: PropTypes.array.isRequired,
    medicines: PropTypes.array.isRequired,
    addPosology: PropTypes.func.isRequired,
    deletePosology: PropTypes.func.isRequired,
    retrievePosologies: PropTypes.func.isRequired,
    retrieveMedicines: PropTypes.func.isRequired,
    patientCode: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    posologiesLoading: PropTypes.bool.isRequired,
    medicinesLoading: PropTypes.bool.isRequired,
};


const mapStateToProps = state => ({
    posologies: state.posologiesReducer.posologies,
    medicines: state.medicinesReducer.medicines,
    posologiesLoading: state.posologiesReducer.posologiesLoading,
    medicinesLoading: state.medicinesReducer.medicinesLoading,
});


const mapDispatchToProps = {
    addPosology,
    deletePosology,
    retrievePosologies,
    retrieveMedicines: getMedicines,
};


export default connect(mapStateToProps, mapDispatchToProps)(PosologiesList);
