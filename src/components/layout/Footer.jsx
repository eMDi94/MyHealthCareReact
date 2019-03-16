import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Footer.css';


function Footer(props) {
    return (
        <footer className="footer has-background-primary footer-padding">
            <div className="content footer-content has-text-white has-text-weight-bold">
                <p>Made with <FontAwesomeIcon className="icon-style" icon="heart" /> by eMDi94</p>
            </div>
        </footer>
    );
}


export default Footer;
