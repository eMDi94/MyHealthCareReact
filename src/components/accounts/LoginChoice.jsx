import React from 'react';
import { Link } from 'react-router-dom';
import DoctorLoginImg from '../../assets/medici.png';
import PatientLoginImg from '../../assets/paziente.jpg';
import './LoginChoice.css';

function LoginChoice(props) {
    return (
        <div className="card-div">
            <div className="card">
                <div className="card-header little-padding">
                    <h1 className="title-card">
                        Paziente
                    </h1>
                </div>
                <div className="card-image">
                    <Link to="/login/patient-login">
                        <img className="card-img" src={PatientLoginImg} alt="No img."/>
                    </Link>
                </div>
            </div>
            <div className="card">
                <div className="card-header little-padding">
                    <h1 className="title-card">
                        Dottore
                    </h1>
                </div>
                <div className="card-image">
                    <Link to="/login/doctor-login">
                        <img src={DoctorLoginImg} alt="No img." className="card-img"/>
                    </Link>
                </div>
            </div>
        </div>
    );
}


export default LoginChoice;
