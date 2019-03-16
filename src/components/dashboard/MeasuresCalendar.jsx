import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/it';
import BigCalendar from 'react-big-calendar';
import { connect } from 'react-redux';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { retrieveParameters, retrieveMeasures, addMeasure, deleteMeasure } from '../../actions/measures';


class InsertMeasureModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hour: '',
            value: undefined,
            parameter: undefined,
        };
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    }

    handleCallback = () => {
        const { hour, parameter, value } =  this.state;
        this.props.callback(hour, parameter, value);
    }

    handleClose = () => {
        this.setState({
            hour: '',
            value: undefined,
            parameter: undefined,
        });
        this.props.close('openInsert');
    }

    render() {
        const isActive = this.props.isActive ? 'is-active' : '';
        const { parameters } = this.props;
        return (
            <div className={`modal ${isActive}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head has-background-primary">
                        <p className="modal-card-title has-text-white">Inserisci Misurazione</p>
                        <button className="delete is-danger has-text-white" aria-label="close"
                                onClick={this.handleClose}/>
                    </header>
                    <section className="modal-card-body">
                        <div className="field">
                            <div className="control">
                                <div className="select">
                                    <select name="parameter" value={this.state.parameter}
                                            onChange={this.handleChange}>
                                        <option></option>
                                        {
                                            parameters.map((value, index) =>
                                                <option value={value.code} key={index}>
                                                    { value.name }
                                                </option>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <input name="hour" className="input" type="text" placeholder="Ora"
                                        value={this.state.hour} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <input name="value" className="input" type="text" placeholder="Valore"
                                        value={this.state.value} onChange={this.handleChange} />
                            </div>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success" onClick={this.handleCallback}>Salva</button>
                        <button className="button is-danger" onClick={this.handleClose}>Annulla</button>
                    </footer>
                </div>
            </div>
        );
    }

}


InsertMeasureModal.propTypes = {
    isActive: PropTypes.bool.isRequired,
    callback: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    parameters: PropTypes.array.isRequired,
};



function MeasureModal(props) {
    const { event, showMeasureModal, sendResponse, showDelete, close } = props;
    const isActive = showMeasureModal ? 'is-active': '';
    const date = event ? `${event.start.getDate()}-${event.start.getMonth() + 1}-${event.start.getFullYear()}` : undefined;
    return (
        <div className={`modal ${isActive}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head has-background-primary">
                    <p className="modal-card-title has-text-white">Misurazione</p>
                    <button className="delete is-danger has-text-white" aria-label="close"
                                onClick={() => close('openMeasureModal')}/>
                </header>
                <section className="modal-card-body">
                    <p>Misurazione:</p>
                    {
                        event ? (
                            <p>{ event.title } del { date }</p>
                        )
                        : null
                    }
                </section>
                <footer className="modal-card-foot">
                {
                    showDelete ?
                        <Fragment>
                            <p style={{marginRight: 10}}>Vuoi eliminare questa misurazione?</p>
                            <button className="button is-success is-medium"
                                    onClick={() => sendResponse('yes')}>
                                Sì
                            </button>
                            <button className="button is-danger is-medium"
                                    onClick={() => sendResponse('no')}>
                                No
                            </button>
                        </Fragment>
                    : null
                }
                </footer>
            </div>
        </div>
    );
}


MeasureModal.propTypes = {
    event: PropTypes.object.isRequired,
    showMeasureModal: PropTypes.bool.isRequired,
    sendResponse: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    showDelete: PropTypes.bool.isRequired,
};



class MeasuresCalendar extends Component {
    
    constructor(props) {
        super(props);
        this.localizer = BigCalendar.momentLocalizer(moment);
        this.state = {
            openInsert: false,
            selectedDay: undefined,
            selectedEvent: null,
            openMeasureModal: false,
            now: new Date(),
        };
    }

    componentWillMount() {
        const date = new Date();
        let startDate = moment(date).startOf('month').startOf('week').toDate();
        let endDate = moment(date).endOf('month').endOf('week').toDate();
        startDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
        endDate = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;
        this.props.retrieveParameters(this.props.patientCode);
        this.props.retrieveMeasures(this.props.patientCode, startDate, endDate);
    }

    handleSelect = (e) => {
        this.setState({
            selectedDay: e.start,
            openInsert: true,
        });
    }

    closeModal = modal => {
        this.setState({
            [modal]: false,
        });
    }

    getNow = () => {
        return this.state.now;
    }

    modalCb = (hour, parameter, value) => {
        this.setState({
            openInsert: false,
        });
        const { selectedDay } = this.state;
        const date = 
            `${selectedDay.getFullYear()}-${selectedDay.getMonth() + 1}-${selectedDay.getDate()}`;
        this.props.addMeasure(date, hour, parameter, value);
    }

    onSelectEvent = (event, e) => {
        this.setState({
            selectedEvent: event,
            openMeasureModal: true,
        });
    }

    deleteCallback = (response) => {
        if (response === 'yes') {
            this.props.deleteMeasure(this.state.selectedEvent.code);
        }
        this.setState({
            event: null,
            openMeasureModal: false,
        });
    }

    onRangeChange = (range) => {
        const { start, end } = range;
        const startDate = `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`;
        const endDate = `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`;
        this.props.retrieveMeasures(this.props.patientCode, startDate, endDate);
    }

    render() {
        let events = undefined;
        const { measuresLoading, parametersLoading, isPatient, parameters } = this.props;
        if (measuresLoading === true || parametersLoading === true) {
            events = [];
        }
        else {
            const { measures } = this.props;
            events = measures.map(value => {
                const param = parameters.find(p => p.code === value.parameter);
                if (param) {
                    return {
                        title: `${value.hour}-${param.name}-${value.value} ${param.unityMeasure}`,
                        start: new Date(value.date),
                        end: new Date(value.date),
                        code: value.code,
                    };
                } else {
                    return {};
                }
            });
        }
        return (
            <Fragment>
                <div style={{width: '95%', height: 500, marginBottom: 15, marginLeft: 25}}>
                    <BigCalendar
                        popup
                        selectable
                        culture='it'
                        localizer={this.localizer}
                        events={events} 
                        view="month"
                        getNow={this.getNow}
                        onSelectSlot={this.handleSelect}
                        onSelectEvent={this.onSelectEvent}
                        onRangeChange={this.onRangeChange} />
                </div>
                {
                    isPatient ?
                    <InsertMeasureModal isActive={this.state.openInsert} callback={this.modalCb}
                                        parameters={parameters} close={this.closeModal} />
                    : null
                }
                <MeasureModal showMeasureModal={this.state.openMeasureModal} event={this.state.selectedEvent}
                                sendResponse={this.deleteCallback} showDelete={isPatient} close={this.closeModal} />
            </Fragment>
        );
    }

}


MeasuresCalendar.propTypes = {
    parameters: PropTypes.array.isRequired,
    retrieveParameters: PropTypes.func.isRequired,
    patientCode: PropTypes.string.isRequired,
    measures: PropTypes.array.isRequired,
    retrieveMeasures: PropTypes.func.isRequired,
    addMeasure: PropTypes.func.isRequired,
    deleteMeasure: PropTypes.func.isRequired,
    parametersLoading: PropTypes.bool.isRequired,
    measuresLoading: PropTypes.bool.isRequired,
    isPatient: PropTypes.bool.isRequired,
};


const mapStateToProps = state => ({
    parameters: state.measuresReducer.parameters,
    measures: state.measuresReducer.measures,
    parametersLoading: state.measuresReducer.parametersLoading,
    measuresLoading: state.measuresReducer.measuresLoading,
});


const mapDispatchToProps = {
    retrieveParameters,
    retrieveMeasures,
    addMeasure,
    deleteMeasure,
};


export default connect(mapStateToProps, mapDispatchToProps)(MeasuresCalendar);
