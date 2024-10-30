import { React, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import './Kirishhisob.css'
import Carimg from '../../media/car.png'
import caricon from '../../media/caricon.png'
import phoneicon from '../../media/phoneicon.png'
import usernameicon from '../../media/usernameicon.png'
import Menubar from '../menubar/Menubar';

const Kirishhisob = () => {

    const location = useLocation();
    const { userId } = location.state || {};
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (userId) {
                const { data, error } = await supabase
                    .from('database')
                    .select('*')
                    .eq('id', userId)
                    .single();

                if (error) {
                    console.error('Xato:', error);
                } else {
                    setUserData(data);
                    console.log(data)
                }
            }
        };

        fetchUserData();
    }, [userId]);


    return (

        <div className='Hisob_wrap'>
            <Menubar></Menubar>
            <img src={Carimg} alt={Carimg} loading='lazy' className='Carimg' />
            {userData ? (
                <>
                    <div className="avto_raqam">
                        <img src={caricon} alt="caricon" />
                        <h1>{userData.avto_raqam}</h1>
                    </div>
                    <div className="telefon_raqam">
                        <img src={phoneicon} alt="caricon" />
                        <h1>{userData.telefon_raqam}</h1>
                    </div>
                    <div className="username">
                        <img src={usernameicon} alt="caricon" />
                        <h1>{userData.ism}</h1>
                    </div>
                </>
            ) : (
                <h1>Yuklanmoqda...</h1>
            )}
        </div>
    )
}

export default Kirishhisob