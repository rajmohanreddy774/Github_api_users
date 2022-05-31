import React from 'react'

export const AppContext=React.createContext();

export const AppContextProvider = ({children}) => {
  return (
      <AppContext.Provider value={[]}>
    <div>
      <h1>Context</h1>
     {children}
    </div>
    </AppContext.Provider>
  )
}

