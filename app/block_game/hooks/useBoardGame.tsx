"use client";
import { useState, useCallback } from "react";
import canMoveTile from "../domain/canMoveTile";
import useBoard from "@/hooks/useBoard";
import { CellData } from "@/types/BoardTypes";

interface Square {
    occupied: boolean;
    target: boolean;
    selected: boolean;
}

interface Hooks {
    moves: number;
    handleTileClick: (index: number) => void;
    squares: Square[];
    undo: () => void;
    redo: () => void;
    reset: () => void;
    canUndo: boolean;
    canRedo: boolean;
}

export default function useBoardGame({ rows, cols }: { rows: number, cols: number }): Hooks {
    const initialSquares: Square[] = Array.from({ length: rows * cols }, (_, i) => ({
        occupied: i !== rows * cols - 1,
        target: i === 0,
        selected: false,
    }));

    const [isASquareselected, setIsASquareselected] = useState<boolean>(false);
    const [selectedTileIndex, setSelectedTileIndex] = useState<number>(-1);

    const onCellClick = useCallback((currentCells: Square[], index: number): Square[] => {
        const copyOfSquares = [...currentCells];
        
        // if empty square is clicked, and another square was previously selected
        if (!currentCells[index].occupied) {
            if (isASquareselected) {
                const emptyTile = currentCells[index];

                // move selected square to empty space
                if (!canMoveTile(selectedTileIndex, index, cols)) {
                    alert("Illegal Move! Can only move square into adjacent, open space");
                    return currentCells; // Return unchanged if invalid move
                }

                // move selected square to empty space
                copyOfSquares[index] = currentCells[selectedTileIndex];
                copyOfSquares[selectedTileIndex] = emptyTile;
                
                // Reset selection state
                setIsASquareselected(false);
                setSelectedTileIndex(-1);
                
                return copyOfSquares;
            }
            // else do nothing
            return currentCells;
        } else {
            // update status of square - select it
            copyOfSquares[index].selected = true;
            setIsASquareselected(true);
            setSelectedTileIndex(index);
            return copyOfSquares;
        }
    }, [isASquareselected, selectedTileIndex, cols]);

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

    const undo = useCallback(() => {
        baseUndo();
        setIsASquareselected(false);
        setSelectedTileIndex(-1);
    }, [baseUndo]);

    const redo = useCallback(() => {
        baseRedo();
        setIsASquareselected(false);
        setSelectedTileIndex(-1);
    }, [baseRedo]);

    const reset = useCallback(() => {
        baseReset();
        setIsASquareselected(false);
        setSelectedTileIndex(-1);
    }, [baseReset]);

    return {
        moves,
        handleTileClick: handleCellClick,
        squares,
        undo,
        redo,
        reset,
        canUndo,
        canRedo,
    };
}
