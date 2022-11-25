import React, { useState, useEffect } from 'react';
import './App.css';
import { Board } from "./components/Board";
import { ScoreBoard } from "./components/ScoreBoard";
import { ResetButton } from "./components/ResetButton";
import { Profile } from "./components/Profile";
import { LoginForm } from "./components/LoginForm";
import { useSession, LogoutButton } from "@inrupt/solid-ui-react";

export default function App() {
  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const [board, setBoard] = useState(Array(9).fill({ value: null }));
  const [boxClasses, setBoxClasses] = useState(Array(9).fill("box"));
  const [xPlaying, setXPlaying] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [help, setHelp] = useState(false);

  const handleBoxClick = (boxIdx) => {
    let winner;
    const updateBoard = board.map(({ value }, idx) => {
      if (idx === boxIdx) {
        return xPlaying === true ? { value: "X" } : { value: "O" };
      } else {
        return { value };
      }
    })
    setBoard(updateBoard);

    winner = checkWinner(updateBoard);

    if (winner?.player) {
      let myboxClasses = boxClasses.slice();
      for (let i = 0; i < boxClasses.length; i++) {
        if (i === winner.line[0]) myboxClasses[i] += " winnerline";
        if (i === winner.line[1]) myboxClasses[i] += " winnerline";
        if (i === winner.line[2]) myboxClasses[i] += " winnerline";
      }
      setBoxClasses(myboxClasses);
      if (winner?.player === "O") {
        let { oScore } = scores;
        oScore += 1;
        setScores({ ...scores, oScore });
      } else {
        let { xScore } = scores;
        xScore += 1;
        setScores({ ...scores, xScore });
      }
    }

    setXPlaying(!xPlaying);
  }

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];
      if (board[x].value && board[x].value === board[y].value && board[y].value === board[z].value) {
        setGameOver(true);
        return { player: board[x], line: [x, y, z] };
      }
    }
  }

  const resetBoard = (resetScore) => {
    setGameOver(false);
    if (resetScore) {
      setScores({ xScore: 0, oScore: 0 });
    }
    setBoard(Array(9).fill({ value: null }));
    setBoxClasses(Array(9).fill("box"));
  }
  const { session, sessionRequestInProgress } = useSession();

  return (
    <div className="app">
      {session.info.isLoggedIn ? (<div>
        <LogoutButton onLogout={(e) => { setHelp(!help); onsole.log("cookie will be removed"); console.log("cookie: ", document.cookie) }}>
          <div className="logoutbutton">
            Log Out
          </div>
        </LogoutButton>
        <Profile />
        <hr />
        <ScoreBoard scores={scores} xPlaying={xPlaying} />
        <Board board={board} boxClasses={boxClasses} onClick={gameOver ? () => resetBoard(false) : handleBoxClick} />
        {
          gameOver ?
            (<ResetButton resetBoard={() => resetBoard(false)} text="Reset Game" />) :
            <div>game läuft</div>
        }
        <ResetButton resetBoard={() => resetBoard(true)} text="Reset ScoreBoard" />
      </div>) : (<>
        <LoginForm />
      </>
      )}
    </div >
  )
}
