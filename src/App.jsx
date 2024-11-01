import React from 'react'
import Royhatdan_otish from './page/Royhatdan_otish/Royhatdan_otish'
import Kirish from './page/kirish/Kirish'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Kirishhisob from './page/kirishhisob/Kirishhisob';
import Qidirish from './page/qidirish/Qidirish';

const App = () => {

  const routers = createBrowserRouter([
    {
      path: '/',
      element: <Royhatdan_otish/>,
    },
    {
      path: 'Kirish',
      element: <Kirish></Kirish>,
    },
    {
      path: '/Kirishhisob',
      element: <Kirishhisob/>
    },
    {
      path: '/qidirish',
      element: <Qidirish />
    }
  ]);
  return (
    <div style={{width: "100%", height: "100vh",}}>
      <RouterProvider router={routers} />
    </div>
  )
}

export default App