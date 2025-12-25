"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { MiniKit } from '@coinbase/onchainkit/minikit';

export default function TicTacToe() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [address, setAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- CONFIGURATION ---
  const OWNER_WALLET = "0x9D3976c25f4DEFe584ed80bae5a7CeF59ba07aA5"; 
  const MOVE_FEE = "0.00001"; 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      MiniKit.install();
    }
  }, []);

  const connectWallet = async () => {
    try {
      const response = await MiniKit.commands.connect();
      if (response && response.address) {
        setAddress(response.address);
      }
    } catch (error) {
      console.error("Connection failed", error);
    }
  };

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

  const handleClick = async (i: number) => {
    if (winner || board[i] || isLoading) return;

    setIsLoading(true);
    try {
      const tx = await MiniKit.commands.sendTransaction({
        transactions: [
          {
            to: OWNER_WALLET as `0x${string}`,
            value: (parseFloat(MOVE_FEE) * 1e18).toString(),
            data: "0x", 
          },
        ],
      });

      if (tx) {
        const nextBoard = board.slice();
        nextBoard[i] = xIsNext ? "X" : "O";
        setBoard(nextBoard);
        setXIsNext(!xIsNext);
      }
    } catch (error) {
      console.error("Transaction failed", error);
      alert("Payment failed or rejected.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const isDraw = !winner && board.every((square) => square !== null);
  const status = winner ? `Winner: ${winner}` : isDraw ? "It's a Draw!" : `Next: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] text-white p-4 font-sans bg-black">
      <div className="absolute top-4 right-4">
        <button onClick={connectWallet} className="bg-slate-900 border border-blue-500/40 px-4 py-2 rounded-xl text-sm font-bold">
          {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connect Wallet"}
        </button>
      </div>

      <h1 className="text-3xl font-black mb-2 text-blue-500 italic tracking-tighter text-center uppercase">Base Tic-Tac-Toe</h1>
      <p className="mb-8 text-slate-500 text-[10px] font-mono uppercase tracking-[0.3em] text-center">
        Fee: {MOVE_FEE} ETH / Move
      </p>
      
      <div className={`mb-8 text-lg font-bold px-10 py-3 rounded-2xl border transition-all ${
        winner ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-slate-900/50 border-slate-800'
      }`}>
        {isLoading ? "Verifying Payment..." : status}
      </div>

      <div className="grid grid-cols-3 gap-4 bg-slate-900/30 p-5 rounded-3xl border border-white/5 backdrop-blur-sm">
        {board.map((value, i) => (
          <button
            key={i}
            disabled={isLoading}
            className={`w-20 h-20 sm:w-24 sm:h-24 text-4xl font-black flex items-center justify-center bg-slate-900 rounded-2xl border border-slate-800 transition-all ${
              isLoading ? 'opacity-30' : 'hover:border-blue-500/50 active:scale-90 shadow-lg'
            }`}
            onClick={() => handleClick(i)}
          >
            <span className={value === 'X' ? 'text-blue-400' : 'text-pink-500'}>{value}</span>
          </button>
        ))}
      </div>

      <button onClick={resetGame} className="mt-12 px-12 py-4 bg-white text-black font-black rounded-2xl transition-all active:scale-95 shadow-xl">
        RESET BOARD
      </button>
    </div>
  );
}
