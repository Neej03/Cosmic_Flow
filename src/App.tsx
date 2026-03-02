/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect } from 'react';
import { CosmicCanvas } from './components/CosmicCanvas';
import { useGameStore } from './store/useGameStore';
import { Users, RotateCcw } from 'lucide-react';

export default function App() {
  const connect = useGameStore((state) => state.connect);
  const disconnect = useGameStore((state) => state.disconnect);
  const players = useGameStore((state) => state.players);
  const myColor = useGameStore((state) => state.myColor);
  const spawnRate = useGameStore((state) => state.spawnRate);
  const lifetime = useGameStore((state) => state.lifetime);
  const stretchFactor = useGameStore((state) => state.stretchFactor);
  const setSpawnRate = useGameStore((state) => state.setSpawnRate);
  const setLifetime = useGameStore((state) => state.setLifetime);
  const setStretchFactor = useGameStore((state) => state.setStretchFactor);
  const reset = useGameStore((state) => state.reset);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  const playerCount = Object.keys(players).length + 1;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white font-sans">
      <CosmicCanvas />
      
      {/* UI Overlay */}
      <div className="absolute top-0 left-0 w-full p-6 pointer-events-none flex justify-between items-start z-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            Cosmic Flow
          </h1>
          <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
            Move cursor to spawn particles.<br/>
            <span className="text-white font-medium">Left click</span> to place an attractor.<br/>
            <span className="text-white font-medium">Spacebar</span> to place a repulsor.
          </p>
          
          {myColor && (
            <div className="flex items-center gap-2 mt-4">
              <div className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" style={{ backgroundColor: myColor }} />
              <span className="text-xs text-gray-400 uppercase tracking-wider">Your Color</span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-4 pointer-events-auto">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
            <Users size={16} className="text-cyan-400" />
            <span className="text-sm font-medium">{playerCount} {playerCount === 1 ? 'Player' : 'Players'}</span>
          </div>
        </div>
      </div>

      {/* Controls Panel */}
      <div className="absolute bottom-6 left-6 z-10 pointer-events-auto">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 w-64 shadow-2xl space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">Spawn Rate</label>
              <span className="text-xs font-mono text-cyan-400">{spawnRate}</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="200" 
              step="5"
              value={spawnRate}
              onChange={(e) => setSpawnRate(parseInt(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              aria-label="Spawn Rate"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">Lifetime</label>
              <span className="text-xs font-mono text-cyan-400">{lifetime.toFixed(1)}s</span>
            </div>
            <input 
              type="range" 
              min="0.5" 
              max="10.0" 
              step="0.1"
              value={lifetime}
              onChange={(e) => setLifetime(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              aria-label="Lifetime"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">Stretch</label>
              <span className="text-xs font-mono text-cyan-400">{stretchFactor.toFixed(1)}x</span>
            </div>
            <input 
              type="range" 
              min="0.1" 
              max="10.0" 
              step="0.1"
              value={stretchFactor}
              onChange={(e) => setStretchFactor(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              aria-label="Stretch Factor"
            />
          </div>

          <button
            onClick={reset}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white/5 hover:bg-white/10 active:bg-white/20 border border-white/10 rounded-xl transition-all group"
          >
            <RotateCcw size={16} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-300 group-hover:text-white">Reset All</span>
          </button>
        </div>
      </div>
    </div>
  );
}
