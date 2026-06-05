import { useState , useContext , createContext } from 'react'
import React  from 'react'
import Navbar from './components/Navbar'

export const StoreContext = createContext();




const App = () => {
  const [value,setvalue] = useState("white");
  return (
    <div>
      <StoreContext.Provider value={{value,setvalue}}

>
        <Navbar />  
      </StoreContext.Provider>
        
    </div>
  )
}

export default App