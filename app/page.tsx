"use client";
import React, { useState, useEffect, useCallback } from 'react';
// Hum pura module import karenge taaki export error na aaye
import * as OnchainKitMinikit from '@coinbase/onchainkit/minikit';

export default function TicTacToe() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [address, setAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const OWNER_WALLET = "0x9D3976c25f4DEFe584ed80bae5a7CeF59ba07aA5"; 
  const MOVE_FEE = "0.00001"; 

  // Safely access MiniKit
  const MiniKit = (OnchainKitMinikit as any).MiniKit || (OnchainKitMinikit as any).default;

  useEffect(() => {
    if (typeof window !== 'undefined' && MiniKit) {
      try {
        MiniKit.install();
      } catch (e) {
        console.error("MiniKit install error", e);
      }
    }
  }, [MiniKit]);

  const connectWallet = async () => {
    if (!MiniKit) return;
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
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let i = 0; i < lines.length; i++) {
      const
