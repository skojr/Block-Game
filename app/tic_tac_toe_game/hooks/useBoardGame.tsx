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
}

export default function useBoardGame({ rows, cols }: { rows: number, cols: number }): Hooks {
    const initialSquares: Square[] = Array.from({ length: rows * cols }, (_, i) => ({
        occupied: false,
        isX: false,
    }));

    const isXRef = useRef<boolean>(true);
    const [winner, setWinner] = useState<"X" | "O" | null>(null);

    const onCellClick = useCallback((currentCells: Square[], index: number): Square[] => {
        // if empty square is clicked, place X or O
        if (!currentCells[index].occupied) {
            const copyOfSquares = [...currentCells];
            copyOfSquares[index] = {
                occupied: true,
                isX: isXRef.current,
            };
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
    }, [baseUndo]);

    const redo = useCallback(() => {
        baseRedo();
    }, [baseRedo]);

    const reset = useCallback(() => {
        baseReset();
        setWinner(null);
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
    };
}