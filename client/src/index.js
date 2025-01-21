import React, { createContext } from 'react'
import ReactDom from 'react-dom/client'
import App from './App'
import UserStore from './store/userStore'
import TestStore from './store/testStore'

export const Context = createContext(null)

ReactDom.createRoot(document.getElementById('root')).render(
    <Context.Provider value={{
        user: new UserStore(),
        test: new TestStore()
    }}>
        <App/>
    </Context.Provider>
)