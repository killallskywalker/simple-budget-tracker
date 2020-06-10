import React , { createContext , useReducer } from 'react';
import AppReducer from './AppReducer';

const initiatState = {
    transactions: [
        {id:1 , text: 'Flower' , amount:-20},
        {id:2 , text: 'Book' , amount:20},

    ]
}

//create context
export const GlobalContext = createContext(initiatState);

//provide component
export const GlobalProvider = ( { children}) => {
    const [state , dispatch] = useReducer(AppReducer , initiatState)

    return (<GlobalContext.Provider value={{
        transactions:state.transactions
    }}>
        {children}
    </GlobalContext.Provider>)
}