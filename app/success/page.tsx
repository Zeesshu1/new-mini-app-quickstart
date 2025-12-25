"use client";

import React, { useState, useEffect } from "react";

export default function Success() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [isThinking, setIsThinking] = useState<boolean>(false);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  // Computer (O) ka move handle karne ke liye useEffect
  useEffect(() => {
    const winner = calculateWinner(board);
    const isDraw = !winner && board.every(square => square !== null);

    if (!isXNext && !winner && !isDraw) {
      setIsThinking(true);
      
      // 800ms ka delay taaki human jaisa lage
      const timer = setTimeout(() => {
        makeComputerMove();
        setIsThinking(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isXNext, board]);

  const makeComputerMove = () => {
    const availableMoves = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null) as number[];
    if (availableMoves.length > 0) {
      // Random move select karna
      const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      const nextBoard = [...board];
      nextBoard[randomMove] = "O";
      setBoard(nextBoard);
      setIsXNext(true);
    }
  };

  const handleClick = (i: number) => {
    // Agar winner mil gaya, box bhara hai, ya computer ki baari hai toh click block karein
    if (calculateWinner(board) || board[i] || !isXNext || isThinking) return;
    
    const nextBoard = [...board];
    nextBoard[i] = "X";
    setBoard(nextBoard);
    setIsXNext(false);
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(square => square !== null);
  
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "It's a Draw!";
  } else {
    status = isThinking ? "Computer is thinking..." : "Your turn (X)";
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: isXNext ? '#3b82f6' : '#ef4444' }}>
        {status}
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 80px)', 
        gap: '10px', 
        justifyContent: 'center',
        backgroundColor: '#27272a',
        padding: '10px',
        borderRadius: '12px',
        width: 'max-content',
        margin: '0 auto',
        opacity: isThinking ? 0.7 : 1,
        transition: 'opacity 0.3s'
      }}>
        {board.map((square, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#18181b',
              border: '1px solid #3f3f46',
              fontSize: '28px',
              fontWeight: 'bold',
              color: square === 'X' ? '#3b82f6' : '#ef4444',
              borderRadius: '8px',
              cursor: (isThinking || square || winner) ? 'default' : 'pointer'
            }}
          >
            {square}
          </button>
        ))}
      </div>

      <button 
        onClick={() => { setBoard(Array(9).fill(null)); setIsXNext(true); }}
        style={{
          marginTop: '30px',
          padding: '12px 30px',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Reset Game
      </button>
    </div>
  );
}
