import React from 'react';
import "./Box.css"

export const Box = ({value, boxClass, onClick }) => {

  return (<button 
      className={boxClass} 
      onClick={onClick}>
      {value}  
    </button>)
}