import React, { createContext, useContext } from 'react';
import {StoreContext} from '../App.jsx'



const Navbar = () => {
    const {value,setvalue} = useContext(StoreContext);

    const themeColor=()=>{
      setvalue(prev => (prev === "pink" ? "blue" : "pink"),
        
       )
    }
  return (
    <div>
      <p style={{backgroundColor:value}}>{value}</p>
      <button onClick={themeColor} > Change Theme </button>
    </div>
  )
}

export default Navbar