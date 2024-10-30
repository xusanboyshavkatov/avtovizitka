import React from 'react'
import './Menubar.css'
import Homeicon from '../../media/homeicon.svg'
import find from '../../media/find.png'
import info from '../../media/info.svg'
import { NavLink } from 'react-router-dom'

const Menubar = () => {
  return (
    <div className='Menubar'>
      <NavLink to={"/Kirishhisob"}><img src={Homeicon} alt={Homeicon} loading='lazy'/></NavLink>
      <NavLink to={"/qidirish"}> <img src={find} alt={find} loading='lazy' className='scanimg'/></NavLink>
      <NavLink> <img src={info} alt={info} loading='lazy'/></NavLink>
    </div>
  )
}

export default Menubar