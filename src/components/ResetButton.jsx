import React from 'react';
import "./ResetButton.css";

export const ResetButton = ({ resetBoard, text }) => {

  return (
    <button className='reset-btn' onClick={resetBoard}>{text}</button>
  )
}
