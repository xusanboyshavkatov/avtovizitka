import { React, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import './Kirishhisob.css'
import Carimg from '../../media/car.png'
import qidirish_map_icon from '../../media/qidirish_map_icon.png'
import Menubar from '../menubar/Menubar';

const Kirishhisob = () => {



    const location = useLocation();
    const { userId } = location.state || {};
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const localData = localStorage.getItem("avtovizitkauzmydata");

        if (localData) {
            setUserData(JSON.parse(localStorage.getItem("avtovizitkauzmydata")))
            console.log("lokal storagedagi malumotlarni olib keldik");
        }
        else {
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
        }

    }, [userId]);


    return (

        <div className='Hisob_wrap'>
            <Menubar></Menubar>
            <img src={Carimg} alt={Carimg} loading='lazy' className='Carimg' />
            <p>Avto raqamingiz bo'yicha ma'umotlari</p>
            {userData ? (
                <>
                    <div className="Car_info">
                        <img src={qidirish_map_icon} alt={qidirish_map_icon} loading='lazy' />
                        <div className="Car_info_data">
                            <h2>{userData.telefon_raqam}</h2>
                            <p>{userData.avto_raqam}, {userData.ism}</p>
                        </div>
                    </div>
                </>
            ) : (
                <h1>Yuklanmoqda...</h1>
            )}
        </div>
    )
}

export default Kirishhisob