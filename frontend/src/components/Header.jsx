import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className='bg-slate-300  w-full flex justify-between items-center px-20 py-3'>
        <NavLink className='text-slate-800 font-bold text-2xl uppercase text-pretty font-mono'>
        <h1>auth app</h1>
        </NavLink>

        <ul className='flex gap-4 items-center'>
            <li className=' list-none'>
                <NavLink className='text-slate-600  text-xl uppercase text-pretty font-mono' to={'/'}>home</NavLink>
            </li>
            <li className=' list-none'>
                <NavLink className='text-slate-600  text-xl uppercase text-pretty font-mono' to={'/about'}>about</NavLink>
            </li>
            <li className=' list-none'>
                <NavLink className='text-slate-600  text-xl uppercase text-pretty font-mono' to={'/sign-in'}>sign in</NavLink>
            </li>
        </ul>
       

    </header>
  )
}

export default Header