"use client";

import React, { useState, useEffect, useCallback } from "react";

export const runtime = "nodejs"; // ❗ Edge runtime disable (MiniKit edge-safe nahi hai)

export default function TicTacToe() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  // ✅ MiniKit CLIENT-ONLY dynamic import
  useEffect(() => {
    if (typeof window === "undefined") return;

    (async () => {
      try {
        const mod = await import("@coinbase/onchainkit/minikit");
        const MiniKit = (mod as any).MiniKit || (mod as any).default;
        MiniKit?.install();
      } catch (e) {
        console.error("MiniKit installation failed:", e);
      }
    })();
  }, []);

  const calculateWinner = useCallback((squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }, []);

  const winner = calculateWinner(board);

  const handleClick = (i: number) => {
    if (winner || board[i]) return;

    const nextBoard = [...board];
    nextBoard[i] = xIsNext ? "X" : "O";

    setBoard(nextBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const isDraw = !winner && board.every(Boolean);

  const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? "It's a Draw!"
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] bg-black text-white p-4">
      <h
