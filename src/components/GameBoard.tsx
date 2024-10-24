import React, { useEffect, useState } from "react";
import Cell from "./Cell";

const width = 7, height = 6;

export default () => {
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>("");
  const [turn, setTurn] = useState<string>("Red");
  const [boardData, setBoardData] = useState<Array<Array<string>>>([]);

  const initBoard = () => {
    let tempData = new Array(height);
    for (let i = 0; i < height; i++) {
      tempData[i] = new Array(width);
      for (let j = 0; j < width; j++)
        tempData[i][j] = "gray";
    }

    setBoardData(tempData);
  }

  useEffect(() => {
    initBoard();
  }, [])

  const startGame = () => {
    setWinner("");
    initBoard();
    setIsFinished(false);
  }

  const finishGame = (winner: string) => {
    if (winner !== "") localStorage.setItem(winner, (Number(localStorage.getItem(winner)) + 1).toString());
    setWinner(winner);
    setIsFinished(true);
  }

  const CheckStatus = () => {
    let count = 0;
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (boardData[i][j] === "gray") {
          count++;
          continue;
        }
        if (j + 3 < width && boardData[i][j] === boardData[i][j + 1] && boardData[i][j] === boardData[i][j + 2] && boardData[i][j] === boardData[i][j + 3]) {
          finishGame(boardData[i][j]);
          return;
        }
        else if (j + 3 < width && i - 3 >= 0 && boardData[i][j] === boardData[i - 1][j + 1] && boardData[i][j] === boardData[i - 2][j + 2] && boardData[i][j] === boardData[i - 3][j + 3]) {
          finishGame(boardData[i][j]);
          return;
        }
        else if (j + 3 < width && i + 3 < height && boardData[i][j] === boardData[i + 1][j + 1] && boardData[i][j] === boardData[i + 2][j + 2] && boardData[i][j] === boardData[i + 3][j + 3]) {
          finishGame(boardData[i][j]);
          return;
        }
        else if (i + 3 < height && boardData[i][j] === boardData[i + 1][j] && boardData[i][j] === boardData[i + 2][j] && boardData[i][j] === boardData[i + 3][j]) {
          finishGame(boardData[i][j]);
          return;
        }
      }
    }
    if (count === 0)
      finishGame("");
  }
  const handleDrop = (index: number) => {
    let i;
    for (i = height - 1; i >= 0; i--)
      if (boardData[i][index] === "gray")
        break;
    if (i == -1) return;
    let tempData = boardData;
    tempData[i][index] = turn.toLowerCase();

    setBoardData(tempData);
    setTurn(turn === "Red" ? "Yellow" : "Red");

    CheckStatus();
  }

  return (
    <div className="w-96 bg-gray-100 drop-shadow-md rounded-md flex flex-col justify-center items-center space-y-4 p-2">
      <div className="flex justify-between w-full p-2 items-center">
        <div className="font-serif text-3xl text-red-800 outline-1 outline-blue-500 drop-shadow-2xl select-none">
          {isFinished ? (winner === "" ? "Draw!" : `${winner.toUpperCase()} won the Game!`) : `${turn}'s turn!`}
        </div>
      </div>

      <div className="border-gray-800 border-2 flex flex-wrap" style={{ width: 350, height: 300 }}>
        {
          boardData.map((row, index) =>
            row.map((cell, index1) => {
              return <Cell key={cell + index1} row={index} col={index1} color={cell}
                turn={turn}
                hint={(index === height - 1 && boardData[index][index1] === "gray") || boardData[index][index1] === "gray" && boardData[index + 1][index1] !== "gray" ? true : false} />
            })
          )
        }
      </div>
      <div className="flex flex-wrap" style={{ width: 350, height: 50 }}>
        {
          isFinished ? <button onClick={(e) => startGame()} className="bg-white" style={{ width: 330, height: 49, marginLeft: 10 }}>Start</button> :
            boardData[0] && boardData[0].map((cell, index) => {
              return <button key={cell + index} onClick={(e) => handleDrop(index)} className="bg-white" style={{ width: 49, height: 49, marginRight: 1 }}>Drop</button>
            })
        }
      </div>
      <div className="flex justify-center items-center" style={{ width: 350, height: 50 }}>
        <div className="font-serif text-sm text-red-800 outline-1 outline-blue-500 drop-shadow-2xl select-none">
          {`RED : ${localStorage.getItem("red")} times, YELLOW : ${localStorage.getItem('yellow')} times won the Game!`}
        </div>
      </div>
    </div >
  );
};
