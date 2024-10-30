import React from 'react'
import './Hisob.css'
import Carimg from '../../media/car.png'
import { useLocation } from 'react-router-dom';
import caricon from '../../media/caricon.png'
import phoneicon from '../../media/phoneicon.png'
import usernameicon from '../../media/usernameicon.png'
import Menubar from '../menubar/Menubar';

const Hisob = () => {
    const location = useLocation();
    const { avto_raqam, ism, telefon_raqam } = location.state || {};
    return (
        <div className='Hisob_wrap'>
            <Menubar></Menubar>
            <img src={Carimg} alt={Carimg} loading='lazy' className='Carimg' />
            <div className="avto_raqam">
                <img src={caricon} alt="caricon" />
                <h1>{avto_raqam}</h1>
            </div>
            <div className="telefon_raqam">
                <img src={phoneicon} alt="caricon" />
                <h1>{telefon_raqam}</h1>
            </div>
            <div className="username">
                <img src={usernameicon} alt="caricon" />
                <h1>{telefon_raqam}</h1>
            </div>
        </div>
    )
}

export default Hisob