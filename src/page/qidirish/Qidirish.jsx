import {React, useState} from 'react'
import { supabase } from '../../supabaseClient'
import './Qidirish.css'
import Menubar from '../menubar/Menubar'
import callicon from '../../media/call.png'

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
        <h1>Avtomobil malumotlarini qidirish</h1>
        <div className="Qidirish_form">
            <input type="text" placeholder='Avto raqam kiriting: 60F830TA'
            value={findavto_raqam}
            onChange={(e)=>setfindavto_raqam(e.target.value.toUpperCase())}
            />
            <button onClick={handlefind}>Qidirish</button>
        </div>
        {findopen ? 
        <div className="Qidirish_getdata">
             <a href={`tel:${userData.telefon_raqam}`} type='tel'> <img src={callicon} alt={callicon} loading='lazy' className='callicon' /></a>
            <div className="Qidirish_getdata_data">
            <a href={userData.telefon_raqam} type='tel' className='telefonraqam'>{userData.telefon_raqam}</a>
            <div className="Qidirish_getdata_data_info">
            <p> {userData.ism}</p>
            <p>{userData.avto_raqam}</p>
            </div>
            </div>
        </div> : <h2>{h2text}</h2>  }
    </div>
  )
}

export default Qidirish