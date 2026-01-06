import React, { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'

function Footer() {

    const data = useContext(UserDataContext);

    return (
        <div className='footer'>Footer is {data}</div>
    )
}

export default Footer