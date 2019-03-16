import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import List from '../../assets/list.png';
import Profile from '../../assets/profile.png';
import Measure from '../../assets/misurazione.jpg';
import './HomePage.css';


function ListItem(props) {
    const { index, text, imgSrc } = props;
    const divClass = index % 2 === 0 ? 'text-item-even' : 'text-item-odd has-text-white';
    const pulled = index % 2 === 0 ? 'is-pulled-left' : 'is-pulled-right';
    return (
        <div className={divClass}>
            <div className={`grow item-title has-text-weight-bold has-text-centered is-hidden-mobile`}>
                <div className={`item-title ${pulled}`}>
                    { text }
                </div>
            </div>
            <div className="grow item-title has-text-weight-bold has-text-centered is-hidden-tablet">
                { text }
            </div>
            <img src={imgSrc} className="item-image is-pulled-right is-hidden-mobile" alt="No Img." />
        </div>
    );
}


ListItem.propTypes = {
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
};


function HomePage(props) {
    const textElements = [
        {
            text: `Iniziare è facile. Basta che ti registri e potrai avere accesso alla tua pagina personale`,
            img: Profile,
        },
        {
            text: `Puoi scorrere la lista dei dottori che hanno aderito all'iniziativa ed associarli alla tua
                    scheda personale. Solo i dottori scelti da te potranno vedere i tuoi dati. Ci teniamo alla tua
                    privacy.`,
            img: List,
        },
        {
            text: `Inserisci le misurazioni dei tuoi valori. Queste potranno essere viste dai tuoi dottori che potranno aggiornare
                    in breve tempo la posologia dei tuoi farmaci per farti vivere la tua vita al meglio.`,
            img: Measure,
        },
    ];
    return (
        <React.Fragment>
            <section className="hero">
                <div className="hero-body hero-background">
                    <div className="container container-layout">
                        <img src={Logo} className="logo-style" alt="No Logo" />
                        <h1 className="has-text-centered title hero-title">
                            Tu ci tieni alla tua salute. <br/> Anche noi.
                        </h1>
                        <Link to="/register" className="button is-size-5 is-primary has-text-weight-bold">
                            Registrati!
                        </Link>
                    </div>
                </div>
            </section>
            <section>
                {
                    textElements.map((value, index) => <ListItem index={index} imgSrc={value.img} 
                                                            text={value.text} key={index} />)
                }
            </section>
        </React.Fragment>
    );
}


export default HomePage;
