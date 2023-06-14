import React, { useContext, useState } from 'react';

const Context = React.createContext();

export function ContextFunction() {
    return useContext(Context)
}

export function InputProvider({ children }) {

    const [user, setUser] = useState(false);

    let obj = {
        user,
        setUser
    }

    return (
        <Context.Provider value={obj}>
            {children}
        </Context.Provider>
    )
}