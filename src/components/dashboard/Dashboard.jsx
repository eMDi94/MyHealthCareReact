import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';
import Guide from './Guide';
import { connect } from 'react-redux';
import './Dashboard.css';
import PatientProfile from './PatientProfile';
import MyDoctorsList from './MyDoctorsList';
import SearchDoctors from './SearchDoctors';
import PatientMedicineView from './PatientMedicineView';
import PosologiesList from './PosologiesList';
import PatientParametersList from './PatientParametersList';
import MeasuresCalendar from './MeasuresCalendar';
import MyPatientsList from './MyPatientsList';
import ParametersList from './ParametersList';
import MedicineList from './MedicineList';


function TabsMenu(props) {
    const { choices, onClick, selectedIndex } = props;
    return (
        <div className="tabs is-centered">
            <ul>
                {
                    choices.map((value, index) => 
                        <li className={index === selectedIndex ? 'is-active': null} key={index}>
                            <Link to={value.path} name={value.text} onClick={onClick}>
                                { value.text }
                            </Link>
                        </li>
                    )
                }
            </ul>
        </div>
    );
}


TabsMenu.propTypes = {
    choices: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    selectedIndex: PropTypes.number.isRequired,
};


class PatientDashboard extends Component {

    constructor(props) {
        super(props);
        const { match } = this.props;
        this.menuChoices = [
            {
                text: 'Guida',
                path: `${match.url}`,
            },
            {
                text: 'Profilo',
                path: `${match.url}/my-profile`,
            },
            {
                text: 'I Miei Dottori',
                path: `${match.url}/my-doctors`,
            },
            {
                text: 'Cerca dottori',
                path: `${match.url}/search-doctors`,
            },
            {
                text: 'I Miei Farmaci',
                path: `${match.url}/my-medicines`
            },
            {
                text: 'Posologie',
                path: `${match.url}/my-posologies`,
            },
            {
                text: 'I Miei Parametri',
                path: `${match.url}/my-parameters`,
            },
            {
                text: 'Misurazioni',
                path: `${match.url}/measures`,
            },
        ];
        this.state = {
            selectedIndex: 0,
        };
    }

    componentWillMount() {
        const { href } = window.location;
        const index = this.menuChoices.findIndex(value => `http://localhost:3000${value.path}` === href);
        if (index !== -1) {
            this.setState({
                selectedIndex: index,
            });
        }
    }

    onMenuItemClicked = e => {
        const { name } = e.target;
        const selectedIndex = this.menuChoices.findIndex(value => value.text === name);
        this.setState({
            selectedIndex: selectedIndex,
        });
    }

    render() {
        const { selectedIndex } = this.state;
        const { match, patient } = this.props;
        return (
            <Fragment>
                <TabsMenu choices={this.menuChoices} selectedIndex={selectedIndex}
                            onClick={this.onMenuItemClicked} />
                    <Route path={match.url} exact render={props => 
                                <Guide {...props} userRole={patient.role} />} />
                    <Route path={`${match.url}/my-profile`} exact render={props =>
                                    <PatientProfile patient={patient} {...props} />} /> 
                    <Route path={`${match.url}/my-doctors`} exact render={props => 
                                    <MyDoctorsList {...props} />} />
                    <Route path={`${match.url}/search-doctors`} exact render={props => 
                                    <SearchDoctors {...props} />} />
                    <Route path={`${match.url}/my-medicines`} exact render={props =>
                                    <PatientMedicineView userCode={patient.code} {...props} /> } />
                    <Route path={`${match.url}/my-posologies`} exact render={props =>
                                <PosologiesList user={patient} patientCode={patient.code} {...props} />} />
                    <Route path={`${match.url}/my-parameters`} exact render={props => 
                                <PatientParametersList patientCode={patient.code} {...props} /> } />
                    <Route path={`${match.url}/measures`} exact render={props => 
                            <MeasuresCalendar patientCode={patient.code} isPatient={true} {...props} />} />
            </Fragment>
        );
    }
}


PatientDashboard.propTypes = {
    patient: PropTypes.object.isRequired,
};


class DoctorDashboard extends Component {

    constructor(props) {
        super(props);
        const { match } = this.props;
        this.state = {
            selectedPatient: null,
            menuChoices: [
                {
                    text: 'Guida',
                    path: `${match.url}`,
                },
                {
                    text: 'I Miei Pazienti',
                    path: `${match.url}/my-patients`,
                },
            ],
            selectedIndex: 0,
        };
    }

    componentWillMount() {
        const { href } = window.location;
        const index = this.state.menuChoices.findIndex(value => `http://localhost:3000${value.path}` === href);
        if (index !== -1) {
            this.setState({
                selectedIndex: index,
            });
        }
    }

    onMenuItemClicked = e => {
        const { name } = e.target;
        const selectedIndex = this.state.menuChoices.findIndex(value => value.text === name);
        this.setState({
            selectedIndex: selectedIndex,
        });
    }

    onPatientSelected = patient => {
        const { match } = this.props;
        const menuChoices = this.state.selectedPatient ? this.state.menuChoices
            : [
                ...this.state.menuChoices,
                {
                    text: 'Vedi Parametri',
                    path: `${match.url}/view-parameters`,
                },
                {
                    text: 'Vedi Misurazioni',
                    path: `${match.url}/view-measures`,
                },
                {
                    text: 'Vedi Farmaci',
                    path: `${match.url}/view-medicines`,
                },
                {
                    text: 'Posologie',
                    path:`${match.url}/posologies`,
                },
        ];
        this.setState({
            selectedPatient: patient,
            menuChoices,
        });
    }

    render() {
        const { selectedIndex, selectedPatient } = this.state;
        const selectedPatientCode = selectedPatient ? selectedPatient.code : null;
        const { match } = this.props;
        return (
            <Fragment>
                <TabsMenu choices={this.state.menuChoices} onClick={this.onMenuItemClicked}
                            selectedIndex={selectedIndex} />
                <Route path={match.url} exact render={props => 
                        <Guide userRole="Doctor" {...props} /> } />
                <Route path={`${match.url}/my-patients`} exact render={props =>
                        <MyPatientsList {...props} selectPatient={this.onPatientSelected}
                            selectedPatientCode={selectedPatientCode} /> } />
                <Route path={`${match.url}/view-parameters`} exact render={props => 
                        <ParametersList patientCode={this.state.selectedPatient.code} {...props} /> } />
                <Route path={`${match.url}/view-measures`} exact render={props => 
                        <MeasuresCalendar patientCode={this.state.selectedPatient.code} isPatient={false} {...props}  />} />
                <Route path={`${match.url}/view-medicines`} exact render={props => 
                        <MedicineList userCode={this.state.selectedPatient.code} isPatient={false} {...props} /> } />
                <Route path={`${match.url}/posologies`} exact render={props => 
                        <PosologiesList user={this.props.doctor}
                                patientCode={this.state.selectedPatient.code} {...props} />} />
            </Fragment>
        );
    }
}


DoctorDashboard.propTypes = {
    doctor: PropTypes.object.isRequired,
};


function Dashboard(props) {
    const { user, match } = props;
    if (user.role === 'Patient') {
        return <PatientDashboard patient={user} match={match} />;
    } else {
        return <DoctorDashboard doctor={user} match={match} />;
    }
}


Dashboard.propTypes = {
    user: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    user: state.authReducer.user,
});


export default connect(mapStateToProps)(Dashboard);
