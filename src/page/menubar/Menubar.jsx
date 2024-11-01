import React from 'react'
import './Menubar.css'
import Homeicon from '../../media/homeicon.svg'
import find from '../../media/find.png'
import info from '../../media/info.svg'
import menuicon from '../../media/menuicon.png'
import { NavLink } from 'react-router-dom'

const Menubar = () => {
  return (
    <div className='Menubar'>
      <NavLink to={"/qidirish"}> <img src={menuicon} alt={menuicon} loading='lazy' className='scanimg'/></NavLink>
    </div>
  )
}

export default Menubar