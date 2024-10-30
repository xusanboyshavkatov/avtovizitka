import React from 'react'
import { Outlet } from 'react-router-dom';

const Maincontrol = () => {
    return (
        <div>
            <main>
                <Outlet></Outlet>
            </main>
        </div>
    )
}

export default Maincontrol