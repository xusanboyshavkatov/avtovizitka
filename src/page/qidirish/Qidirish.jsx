import {React, useState} from 'react'
import { supabase } from '../../supabaseClient'
import './Qidirish.css'
import Menubar from '../menubar/Menubar'
import qidirish_map_icon from '../../media/qidirish_map_icon.png'
import backicon from '../../media/backicon.png'
import { NavLink } from 'react-router-dom'

const Qidirish = () => {
    const [findavto_raqam, setfindavto_raqam] = useState("")
    const [userData, setUserData] = useState(null);
    const [findopen, setfindopen] = useState(false)
    const [h2text, seth2text] = useState("")

    const handlefind = async () => {
        seth2text("Qidirilmoqda..")
        const { data, error } = await supabase
            .from('database')
            .select('*')
            .eq('avto_raqam', findavto_raqam)
            .single();

        if (error) {
            console.error('Xato:', error);
            setUserData(null); 
            setfindopen(false);
            seth2text("Bunday avtomobil mavjud emas")
        } else {
            console.log('Foydalanuvchi ma\'lumoti:', data);
            setUserData(data);
            setfindopen(true)
        }
    };

  return (
    <div className='Qidirish_wrap'>
        <Menubar></Menubar>
        <NavLink to={"/Kirishhisob"}> <img src={backicon} alt={backicon} loading='lazy' className='backicon'/> </NavLink>
        <h1>Avtomobil ma'  nblumotlarini qidirish</h1>
        <div className="Qidirish_form">
            <input type="text" placeholder='Avto raqam kiriting: 60F830TA'
            value={findavto_raqam}
            onChange={(e)=>setfindavto_raqam(e.target.value.toUpperCase())}
            />
            <button onClick={handlefind}>Qidirish</button>
        </div>
        {findopen ? 
        <div className="Qidirish_getdata">
             <a href={userData.telefon_raqam} type='tel'> <img src={qidirish_map_icon} alt={qidirish_map_icon} loading='lazy' className='callicon' /></a>
            <div className="Qidirish_getdata_data">
            <a href={userData.telefon_raqam} type='tel' className='telefonraqam'>{userData.telefon_raqam}</a>
            <p> {userData.ism}, {userData.avto_raqam}</p>
            </div>
        </div> : <h2>{h2text}</h2>  }
    </div>
  )
}

export default Qidirish