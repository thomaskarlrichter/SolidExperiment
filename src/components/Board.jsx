import React from 'react';
import { Box } from "./Box"
import "./Board.css"

export const Board = ({ board, onClick, boxClasses}) => {

  return (
    <div className='board'>
      {board.map(({value}, idx) => {
        return <Box 
                 key={idx} 
                 value={value} 
                 boxClass={ value==="X" ? boxClasses[idx] + " x" : boxClasses[idx] + " o"} 
                 onClick={() => value === null && onClick(idx)} />
      })}
    </div>
  )
}
