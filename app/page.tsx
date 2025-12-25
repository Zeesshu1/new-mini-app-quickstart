"use client";
import React, { useState } from 'react';

export default function TicTacToe() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  
  const winner = calculateWinner(board);

  function handleClick(i: number) {
    if (winner || board[i]) return;
    const nextBoard = board.slice();
    nextBoard[i] = xIsNext ? "X" : "O";
    setBoard(nextBoard);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  const isDraw = !winner && board.every((square) => square !== null);
  const status = winner 
    ? `Winner: ${winner}` 
    : isDraw 
      ? "It's a Draw!" 
      : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] text-white p-4">
      <h1 className="text-3xl font-bold mb-8 text-blue-400 tracking-tight">
        Base Tic-Tac-Toe
      </h1>
      
      <div className={`mb-6 text-xl font-bold px-8 py-3 rounded-full border shadow-lg transition-all ${
        winner ? 'bg-green-600 border-green-400 animate-bounce' : 'bg-slate-800 border-blue-500/50'
      }`}>
        {status}
      </div>

      <div className="grid grid-cols-3 gap-3 bg-slate-800 p-4 rounded-2xl shadow-2xl border border-slate-700">
        {board.map((value, i) => (
          <button
            key={i}
            className="w-20 h-20 sm:w-24 sm:h-24 text-4xl font-black flex items-center justify-center bg-slate-900 hover:bg-slate-700 transition-all rounded-xl border border-slate-700 active:scale-95"
            onClick={() => handleClick(i)}
          >
            <span className={value === 'X' ? 'text-blue-400' : 'text-pink-500'}>
              {value}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="mt-10 px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-2xl transition-all active:scale-90 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
      >
        RESTART
      </button>

      <div className="mt-8 text-slate-500 text-xs font-mono uppercase tracking-widest">
        Powered by Base OnchainKit
      </div>
    </div>
  );
}

function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
