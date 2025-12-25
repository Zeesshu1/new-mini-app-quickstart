"use client";
import React, { useState, useEffect, useCallback } from 'react';
import * as OnchainKitMinikit from '@coinbase/onchainkit/minikit';

export default function TicTacToe() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  // Safe access to MiniKit
  const MiniKit = (OnchainKitMinikit as any).MiniKit || (OnchainKitMinikit as any).default;

  useEffect(() => {
    if (typeof window !== 'undefined' && MiniKit) {
      try {
        MiniKit.install();
      } catch (e) {
        console.error("MiniKit installation failed:", e);
      }
    }
  }, [MiniKit]);

  const calculateWinner = useCallback((squares: (string | null)[]) => {
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
  }, []);

  const winner = calculateWinner(board);

  const handleClick = (i: number) => {
    if (winner || board[i]) return;
    const nextBoard = board.slice();
    nextBoard[i] = xIsNext ? "X" : "O";
    setBoard(nextBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const isDraw = !winner && board.every((square) => square !== null);
  const status = winner 
    ? `Winner: ${winner}` 
    : isDraw 
      ? "It's a Draw!" 
      : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-4 font-sans">
      <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 uppercase tracking-tighter">
        Base Tic-Tac-Toe
      </h1>
      
      <div className={`mb-8 text-xl font-bold px-10 py-3 rounded-2xl border transition-all duration-300 ${
        winner ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'bg-slate-900 border-slate-800 text-slate-300'
      }`}>
        {status}
      </div>

      <div className="grid grid-cols-3 gap-3 bg-slate-900/50 p-4 rounded-3xl border border-white/5 backdrop-blur-sm shadow-2xl">
        {board.map((value, i) => (
          <button
            key={i}
            className="w-24 h-24 text-4xl font-black flex items-center justify-center bg-slate-900 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all active:scale-90 shadow-inner group"
            onClick={() => handleClick(i)}
          >
            <span className={value === 'X' ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]' : 'text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]'}>
              {value}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="mt-12 px-12 py-4 bg-white text-slate-950 font-black rounded-2xl hover:bg-blue-50 transition-all active:scale-95 shadow-xl uppercase tracking-wider"
      >
        Restart Game
      </button>

      <div className="mt-12 text-slate-500 text-[10px] font-mono uppercase tracking-[0.3em] flex items-center gap-2">
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
        Powered by Base OnchainKit
      </div>
    </div>
  );
}
