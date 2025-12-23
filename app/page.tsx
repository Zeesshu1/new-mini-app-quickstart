"use client";
import React, { useState, useEffect } from 'react';

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
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

  const status = winner 
    ? `Winner: ${winner}` 
    : board.every(Boolean) 
      ? "It's a Draw!" 
      : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-6 text-blue-400">Base Tic-Tac-Toe</h1>
      
      <div className="mb-4 text-xl font-semibold bg-slate-800 px-6 py-2 rounded-full border border-blue-500 shadow-lg shadow-blue-500/20">
        {status}
      </div>

      <div className="grid grid-cols-3 gap-2 bg-slate-700 p-2 rounded-xl shadow-2xl">
        {board.map((value, i) => (
          <button
            key={i}
            className="w-24 h-24 text-4xl font-bold flex items-center justify-center bg-slate-800 hover:bg-slate-600 transition-colors rounded-lg border border-slate-600"
            onClick={() => handleClick(i)}
          >
            <span className={value === 'X' ? 'text-blue-400' : 'text-pink-400'}>
              {value}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-transform active:scale-95 shadow-lg"
      >
        Restart Game
      </button>

      <div className="mt-6 text-slate-400 text-sm">
        Built for Base Mini App
      </div>
    </div>
  );
}

// Logic to calculate winner
function calculateWinner(squares: any[]) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
