import {React, useState} from 'react'
import './Royhatdan_otish.css'
import { NavLink } from 'react-router-dom'
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
const Royhatdan_otish = () => {

    const [avto_raqam, setavto_raqam] = useState('');
    const [ism, setism] = useState('');
    const [telefon_raqam, settelefon_raqam] = useState('');
    const [parol, setparol] = useState('');
    const navigate = useNavigate();

    const handleSendData = async () => {
        const { data, error } = await supabase
            .from('database') // O'z jadval nomingizni yozing
            .insert([{ avto_raqam: avto_raqam, ism: ism, telefon_raqam: telefon_raqam, parol: parol }]);

        if (error) console.error('Xato:', error);
        else {
            console.log('Ma\'lumot yuborildi:', data);
            navigate('/Hisob', { state: { avto_raqam, ism, telefon_raqam } });
            setavto_raqam('')
            setism('')
            settelefon_raqam("")
            setparol("")
        }

    };

    return (
        <div className='Royhatdan_otish_wrap'>
            <div className="Royhatdan_otish_title">
                <h1>Avtovizitka.uz</h1>
                <h2>Hush kelibsiz</h2>
            </div>
            <div className="Royhatdan_otish_input">
                <input
                    type="text"
                    placeholder='60F830TA'
                    value={avto_raqam}
                    onChange={(e) => setavto_raqam(e.target.value.toUpperCase())}
                />

                <input 
                type="text" 
                placeholder='Ismingiz' 
                value={ism}
                onChange={(e)=>setism(e.target.value)}
                />

                <input
                type="tel" 
                placeholder='Telefon Raqamingiz' 
                value={telefon_raqam}
                onChange={(e)=>settelefon_raqam(e.target.value)}
                />

                <input 
                type="password" 
                placeholder='parol' 
                value={parol}
                onChange={(e)=>setparol(e.target.value)}
                />

                <button onClick={handleSendData}>Ro'yhatdan o'tish</button>
                <NavLink to={"Kirish"}><button>Kirish</button></NavLink>
            </div>
        </div>
    )
}

export default Royhatdan_otish