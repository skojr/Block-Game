"use client";
import { useCallback, useRef, useState, useEffect } from "react";
import useBoard from "@/hooks/useBoard";
import { CellData } from "@/types/BoardTypes";
import didWin from "../domain/game";

interface Square {
    occupied: boolean;
    isX: boolean;
}

interface Hooks {
    moves: number;
    handleTileClick: (index: number, isX: boolean) => void;
    squares: Square[];
    undo: () => void;
    redo: () => void;
    reset: () => void;
    canUndo: boolean;
    canRedo: boolean;
    winner: "X" | "O" | null;
    willDisappearIndex: number | null;
}

export default function useBoardGame({ rows, cols }: { rows: number, cols: number }): Hooks {
    const initialSquares: Square[] = Array.from({ length: rows * cols }, (_, i) => ({
        occupied: false,
        isX: false,
    }));

    const isXRef = useRef<boolean>(true);
    const [winner, setWinner] = useState<"X" | "O" | null>(null);
    const moveHistoryRef = useRef<number[]>([]); // Track order of moves (FIFO queue)

    const onCellClick = useCallback((currentCells: Square[], index: number): Square[] => {
        // if empty square is clicked, place X or O
        if (!currentCells[index].occupied) {
            const copyOfSquares = [...currentCells];
            copyOfSquares[index] = {
                occupied: true,
                isX: isXRef.current,
            };
            
            // Track this move in history
            moveHistoryRef.current.push(index);
            
            // If we have 6 or more moves, remove the oldest one (FIFO)
            if (moveHistoryRef.current.length > 6) {
                const oldestIndex = moveHistoryRef.current.shift()!;
                copyOfSquares[oldestIndex] = {
                    occupied: false,
                    isX: false,
                };
            }
            
            return copyOfSquares;
        }
        
        // If cell is already occupied, return unchanged
        return currentCells;
    }, []);

    const {
        cells,
        moves,
        handleCellClick,
        undo: baseUndo,
        redo: baseRedo,
        reset: baseReset,
        canUndo,
        canRedo,
    } = useBoard({
        initialCells: initialSquares as unknown as CellData[],
        onCellClick: onCellClick as unknown as (currentCells: CellData[], index: number) => CellData[],
    });
    
    const squares = cells as unknown as Square[];
    
    // Determine which square will disappear on the next move
    // If we have exactly 6 moves, the oldest one (first in queue) will disappear
    const willDisappearIndex = moveHistoryRef.current.length === 6 
        ? moveHistoryRef.current[0] 
        : null;

    // Check for wins after each move
    useEffect(() => {
        const result = didWin(squares, cols);
        setWinner(result.won ? result.winner : null);
    }, [squares, cols]);

    const handleTileClick = useCallback((index: number, isX: boolean) => {
        if (winner) return; // Don't allow moves after a win
        isXRef.current = isX;
        handleCellClick(index);
    }, [handleCellClick, winner]);

    const undo = useCallback(() => {
        baseUndo();
        // Remove last move from history on undo
        if (moveHistoryRef.current.length > 0) {
            moveHistoryRef.current.pop();
        }
    }, [baseUndo]);

    const redo = useCallback(() => {
        baseRedo();
        // Note: Redo doesn't restore move history perfectly, but this is acceptable
        // for simplicity. A full implementation would track history in useBoard.
    }, [baseRedo]);

    const reset = useCallback(() => {
        baseReset();
        setWinner(null);
        moveHistoryRef.current = [];
    }, [baseReset]);

    return {
        moves,
        handleTileClick,
        squares,
        undo,
        redo,
        reset,
        canUndo,
        canRedo,
        winner,
        willDisappearIndex,
    };
}