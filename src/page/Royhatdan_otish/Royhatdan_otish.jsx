import { React, useState } from 'react'
import './Royhatdan_otish.css'
import { NavLink } from 'react-router-dom'
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
const Royhatdan_otish = () => {

    const [avto_raqam, setavto_raqam] = useState("");
    const [ism, setism] = useState("");
    const [telefon_raqam, settelefon_raqam] = useState("");
    const [parol, setparol] = useState("");
    const navigate = useNavigate();

    const handleSendData = async () => {
        if (!avto_raqam || !ism || !telefon_raqam || !parol) {
            alert("Iltimos, barcha maydonlarni to'ldiring!");
            return;
        }


        // Mavjud yozuvlarni tekshirish
        const { data: existingRecords, error: selectError } = await supabase
            .from('database') // O'z jadval nomingizni yozing
            .select('*')
            .or(`avto_raqam.eq.${avto_raqam}, telefon_raqam.eq.${telefon_raqam}`); // Har ikkala qiymat uchun 'or' shartini ishlatamiz

        if (selectError) {
            console.error('Xato:', selectError.message);
            return;
        }

        // Agar bazada mavjud yozuvlar topilsa
        if (existingRecords.length > 0) {
            const isAvtoRaqamExists = existingRecords.some(record => record.avto_raqam === avto_raqam);
            const isTelefonRaqamExists = existingRecords.some(record => record.telefon_raqam === telefon_raqam);

            // 1) Agar ikkalasi ham mavjud bo'lsa
            if (isAvtoRaqamExists && isTelefonRaqamExists) {
                alert("Ushbu avtomobil raqami va telefon raqami allaqachon ro'yxatdan o'tgan.");
                return;
            }

            // 2) Agar avtomobil raqami mavjud bo'lsa, lekin telefon raqami yo'q
            if (isAvtoRaqamExists && !isTelefonRaqamExists) {
                alert("Ushbu avtomobil raqami bilan ro'yxatdan o'tilgan.");
                return;
            }

            // 3) Agar telefon raqami mavjud bo'lsa, lekin avtomobil raqami yo'q
            if (!isAvtoRaqamExists && isTelefonRaqamExists) {
                alert("Ushbu telefon raqami bilan ro'yxatdan o'tilgan.");
                return;
            }
        }

        // Agar mavjud bo'lmasa, yangi foydalanuvchini qo'shish
        const { data, error } = await supabase
            .from('database') // O'z jadval nomingizni yozing
            .insert([{ avto_raqam: avto_raqam, ism: ism, telefon_raqam: telefon_raqam, parol: parol }]);

        if (error) {
            console.error('Xato:', error);
        } else {
            console.log('Ma\'lumot yuborildi:', data);
            localStorage.setItem("avtovizitkauzmydata", JSON.stringify({ avto_raqam, ism, telefon_raqam, parol }));
            navigate('/Kirishhisob');
            setavto_raqam('');
            setism('');
            settelefon_raqam('');
            setparol('');
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
                    required
                />

                <input
                    type="text"
                    placeholder='Ismingiz'
                    value={ism}
                    onChange={(e) => setism(e.target.value)}
                    required
                />

                <input
                    type="tel"
                    placeholder='Telefon Raqamingiz'
                    value={telefon_raqam}
                    onChange={(e) => settelefon_raqam(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder='parol'
                    value={parol}
                    onChange={(e) => setparol(e.target.value)}
                    required
                />

                <button onClick={handleSendData}>Ro'yhatdan o'tish</button>
                <NavLink to={"Kirish"}><button>Kirish</button></NavLink>
            </div>
        </div>
    )
}

export default Royhatdan_otish