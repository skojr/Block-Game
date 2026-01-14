"use client";
import { useState, useCallback } from "react";
import { CellData } from "@/types/BoardTypes";

export interface UseBoardOptions<T extends CellData> {
  initialCells: T[];
  onCellClick: (currentCells: T[], index: number) => T[];
}

export interface UseBoardReturn<T extends CellData> {
  cells: T[];
  moves: number;
  handleCellClick: (index: number) => void;
  undo: () => void;
  redo: () => void;
  reset: () => void;
  canUndo: boolean;
  canRedo: boolean;
  setCells: (cells: T[]) => void;
}

export default function useBoard<T extends CellData>({
  initialCells,
  onCellClick,
}: UseBoardOptions<T>): UseBoardReturn<T> {
  const [cells, setCells] = useState<T[]>(initialCells.map((c) => ({ ...c } as T)));
  const [history, setHistory] = useState<T[][]>([]);
  const [future, setFuture] = useState<T[][]>([]);
  const [moves, setMoves] = useState<number>(0);

  const handleCellClick = useCallback(
    (index: number) => {
      const newCells = onCellClick(cells, index);
      
      // Store current state in history stack before making the move
      // Clear future stack since we're making a new move
      setHistory((prev) => [...prev, cells.map((c) => ({ ...c } as T))]);
      setFuture([]);
      setCells(newCells);
      setMoves((prev) => prev + 1);
    },
    [cells, onCellClick]
  );

  const undo = useCallback(() => {
    if (history.length === 0) return;

    const previousState = history[history.length - 1];
    setFuture((prev) => [...prev, cells.map((c) => ({ ...c } as T))]);
    setHistory((prev) => prev.slice(0, -1));
    setCells(previousState);
    setMoves((prev) => prev - 1);
  }, [history, cells]);

  const redo = useCallback(() => {
    if (future.length === 0) return;

    const nextState = future[future.length - 1];
    setHistory((prev) => [...prev, cells.map((c) => ({ ...c } as T))]);
    setFuture((prev) => prev.slice(0, -1));
    setCells(nextState);
    setMoves((prev) => prev + 1);
  }, [future, cells]);

  const reset = useCallback(() => {
    setCells(initialCells.map((c) => ({ ...c } as T)));
    setHistory([]);
    setFuture([]);
    setMoves(0);
  }, [initialCells]);

  return {
    cells,
    moves,
    handleCellClick,
    undo,
    redo,
    reset,
    canUndo: history.length > 0,
    canRedo: future.length > 0,
    setCells,
  };
}
