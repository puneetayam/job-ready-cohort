// It contains user data (centralised data warehouse, who store and serve user data to all components if necessary).

import React, { createContext } from 'react'

export const UserDataContext = createContext();

function UserContext(props) {
    return (
        <div>
            <UserDataContext.Provider value="Puneet">
                {props.children}
            </UserDataContext.Provider>

        </div>
    )
}

export default UserContext