import React, { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'

function Navbar() {

    const data = useContext(UserDataContext);
    return (
        <div className='navbar'>Navbar is {data}</div>
    )
}

export default Navbar