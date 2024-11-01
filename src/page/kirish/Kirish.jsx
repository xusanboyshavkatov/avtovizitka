import {React, useState} from 'react'
import './Kirish.css'
import { NavLink } from 'react-router-dom'
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';



const Kirish = () => {
    const [telefon_raqam, settelefon_raqam] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!telefon_raqam || !password ) {
            alert("Iltimos, barcha maydonlarni to'ldiring!");
            return;
        }

        const { data, error } = await supabase
            .from('database')
            .select('*')
            .eq('telefon_raqam', telefon_raqam)
            .eq('parol', password)
            .single();

        if (error) {
            console.error('Xato:', error);
            alert("Bunday foydalanuvchi bazada mavjud emas yoki parolingiz xato, tekshirib qayta urunib ko'ring");
            return;
        } else {
            console.log('Foydalanuvchi ma\'lumoti:', data);
            // Foydalanuvchi `id`si bilan `Home` sahifasiga yo'naltirish
            navigate('/Kirishhisob', { state: { userId: data.id } });
        }
    };
    return (
        <div className='Kirish_wrap'>
            <div className="Kirish_title">
                <h1>Hisobga kirish</h1>
                <h2>Hush kelibsiz</h2>
            </div>
            <div className="Kirish_input">
                <input type="tel"
                    placeholder='Telefon Raqamingiz'
                    value={telefon_raqam}
                    onChange={(e) => settelefon_raqam(e.target.value)}
                />
                <input type="password"
                    placeholder='parol'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Kirish</button>
                <NavLink to={"/"}><button>Ro'yhatdan o'tish</button></NavLink>

            </div>
        </div>
    )
}

export default Kirish