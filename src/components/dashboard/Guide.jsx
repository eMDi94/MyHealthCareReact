import React from 'react';
import PropTypes from 'prop-types';
import './Guide.css';


function PatientGuide(props) {
    return (
        <div className="guide-div">
            <div className="guide-element-div">
                <h1 className="title has-text-weight-bold">Profilo</h1>
                <p>
                    Nella sezione <strong>Profilo</strong> puoi trovare le informazioni che hai inserito
                    in fase di registrazione.
                </p>
            </div>
            <div className="guide-element-div">
                <h1 className="title has-text-weight-bold">I Miei Dottori</h1>
                <p>
                    Nella sezione <strong>I Miei Dottori</strong> puoi vedere i dottori che hai autorizzato
                    a vedere la tua situazione.
                </p>
            </div>
            <div className="guide-element-div">
                <h1 className="title has-text-weight-bold">Cerca Dottori</h1>
                <p>
                    Nella sezione <strong>Cerca Dottori</strong> puoi cercare per nome i dottori a cui vuoi
                    associarti.
                </p>
            </div>
            <div className="guide-element-div">
                <h1 className="title has-text-weight-bold">I Miei Farmaci</h1>
                <p>
                    Nella sezione <strong>I Miei Farmaci</strong> puoi trovare modificare e vedere i tuoi farmaci.
                </p>
            </div>
            <div className="guide-element-div">
                <h1 className="title has-text-weight-bold">Posologie</h1>
                <p>
                    Nella sezione <strong>Posologie</strong> puoi consultare le posologie dei tuoi farmaci.
                </p>
            </div>
            <div className="guide-element-div">
                <h1 className="title has-text-weight-bold">I Miei Parametri</h1>
                <p>
                    Nella sezione <strong>I Miei Parametri</strong> puoi inserire i parametri di cui vuoi tener traccia.
                </p>
            </div>
            <div className="guide-element-div">
                <h1 className="title has-text-weight-bold">Misurazioni</h1>
                <p>
                    Nella sezione <strong>Misurazioni</strong> puoi vedere, inserire e cancellare le tue misurazioni.
                </p>
            </div>
        </div>
    );
}


function DoctorGuide(props) {
    return (
        <div className="guide-div">
            <div className="guide-element-div">
                <h1 className="title has-text-weight-bold">I Miei Pazienti</h1>
                <p>
                    Nella sezione <strong>I Miei Pazienti</strong> potrai trovare i pazienti che ti hanno
                    autorizzato a vedere la loro situazione.<br/>
                    Selezionando il paziente potrai vedere la sua scheda.
                </p>
            </div>
            <div className="guide-element-div">
                <h1 className="title has-text-weight-bold">Scheda Personale</h1>
                <p>
                    La <strong>Scheda Personale</strong> è accessibile solo dalla sezione <strong>I Miei Pazienti</strong>.
                    <br />
                    Qui puoi vedere il suo <strong>Profilo</strong>, i suoi <strong>Farmaci</strong>,
                    i suoi <strong>Parametri</strong>, modificare e vedere le <strong>Posologie </strong> 
                    dei suoi farmaci e, ovviamente, le sue <strong>Misurazioni</strong>.
                </p>
            </div>
        </div>
    );
}


function Guide(props) {
    const { userRole } = props;
    if (userRole === 'Patient') {
        return <PatientGuide />;
    } else {
        return <DoctorGuide />;
    }
}


Guide.propTypes = {
    userRole: PropTypes.string.isRequired,
};


export default Guide;
