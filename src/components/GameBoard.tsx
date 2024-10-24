import React, { useEffect, useState } from "react";
import Cell from "./Cell";

const Width = 7, Height = 6;
enum ColorTurn {
  Red,
  Yellow
};

const Size = { width: 350, height: 50 };

export default () => {
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>("");
  const [turn, setTurn] = useState<ColorTurn>(ColorTurn.Red);
  const [boardData, setBoardData] = useState<Array<Array<string>>>([]);

  const initBoard = () => {
    let tempData = new Array(Height);
    for (let i = 0; i < Height; i++) {
      tempData[i] = new Array(Width);
      for (let j = 0; j < Width; j++)
        tempData[i][j] = "gray";
    }

    setBoardData(tempData);
  }

  useEffect(() => {
    initBoard();
    localStorage.setItem('red', "0");
    localStorage.setItem('yellow', "0");
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
    for (let i = 0; i < Height; i++) {
      for (let j = 0; j < Width; j++) {
        if (boardData[i][j] === "gray") {
          count++;
          continue;
        }
        if (j + 3 < Width && boardData[i][j] === boardData[i][j + 1] && boardData[i][j] === boardData[i][j + 2] && boardData[i][j] === boardData[i][j + 3]) {
          finishGame(boardData[i][j]);
          return;
        }
        else if (j + 3 < Width && i - 3 >= 0 && boardData[i][j] === boardData[i - 1][j + 1] && boardData[i][j] === boardData[i - 2][j + 2] && boardData[i][j] === boardData[i - 3][j + 3]) {
          finishGame(boardData[i][j]);
          return;
        }
        else if (j + 3 < Width && i + 3 < Height && boardData[i][j] === boardData[i + 1][j + 1] && boardData[i][j] === boardData[i + 2][j + 2] && boardData[i][j] === boardData[i + 3][j + 3]) {
          finishGame(boardData[i][j]);
          return;
        }
        else if (i + 3 < Height && boardData[i][j] === boardData[i + 1][j] && boardData[i][j] === boardData[i + 2][j] && boardData[i][j] === boardData[i + 3][j]) {
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
    for (i = Height - 1; i >= 0; i--)
      if (boardData[i][index] === "gray")
        break;
    if (i === -1) return;
    let tempData = boardData;
    tempData[i][index] = turn === ColorTurn.Red ? "red" : "yellow";

    setBoardData(tempData);
    setTurn(turn === ColorTurn.Red ? ColorTurn.Yellow : ColorTurn.Red);

    CheckStatus();
  }

  return (
    <div className="w-96 bg-gray-100 drop-shadow-md rounded-md flex flex-col justify-center items-center space-y-4 p-2">
      <div className="flex justify-between w-full p-2 items-center">
        <div className="font-serif text-3xl text-red-800 outline-1 outline-blue-500 drop-shadow-2xl select-none">
          {isFinished ? (winner === "" ? "Draw!" : `${winner.toUpperCase()} won the Game!`) : `${turn}'s turn!`}
        </div>
      </div>

      <div className="flex flex-wrap" style={{ width: 360, height: 300 }}>
        {
          boardData.map((row, rindex) =>
            row.map((cell, cindex) => {
              return <Cell key={cell} row={rindex} col={cindex} color={cell}
                turn={turn === ColorTurn.Red ? "red" : "yellow"}
                hint={(rindex === Height - 1 && boardData[rindex][cindex] === "gray") || boardData[rindex][cindex] === "gray" && boardData[rindex + 1][cindex] !== "gray" ? true : false} />
            })
          )
        }
      </div>
      <div className="flex flex-wrap" style={Size}>
        {
          isFinished ? <button onClick={(e) => startGame()} className="bg-white" style={{ width: 330, height: 49, marginLeft: 10 }}>Play again</button> :
            boardData[0] && boardData[0].map((cell, index) => {
              return <button key={cell + index} onClick={(e) => handleDrop(index)} className="bg-white" style={{ width: 49, height: 49, marginRight: 1 }}>Drop</button>
            })
        }
      </div>
      <div className="flex justify-center items-center" style={Size}>
        <div className="font-serif text-sm text-red-800 outline-1 outline-blue-500 drop-shadow-2xl select-none">
          {`RED : ${localStorage.getItem("red")} times, YELLOW : ${localStorage.getItem('yellow')} times won the Game!`}
        </div>
      </div>
    </div >
  );
};
