"use client";
import { useState } from "react";
import canMoveTile from "../domain/game";

interface Square {
    occupied: boolean,
    target: boolean,
    selected: boolean
}

interface Hooks {
    moves: number,
    handleTileClick: (index: number) => void,
    squares: Square[],
    undo: () => void,
    redo: () => void,
    reset: () => void,
    canUndo: boolean,
    canRedo: boolean
}
export default function useBoardGame({ rows, cols }: { rows: number, cols: number }): Hooks {

    const initialSquares: Square[] = Array.from({ length: rows * cols }, (_, i) => ({
        occupied: i !== rows * cols - 1, // occupied
        target: i === 0, // target
        selected: false,
    }));

    const [isASquareselected, setIsASquareselected] = useState<boolean>(false);
    const [selectedTileIndex, setSelectedTileIndex] = useState<number>(-1);
    const [squares, setSquares] = useState<Square[]>(initialSquares);
    const [history, setHistory] = useState<Square[][]>([]);
    const [future, setFuture] = useState<Square[][]>([]);
    const [moves, setMoves] = useState<number>(0)

    function handleTileClick(index: number): void {
        const copyOfSquares = squares.slice();
        // if empty square is clicked, and another square was previously selected
        if (!squares[index].occupied) {
            if (isASquareselected) {
                const emptyTile = squares[index]

                // move selected square to empty space
                if (!canMoveTile(selectedTileIndex, index, cols)) {
                    alert("Illegal Move! Can only move square into adjacent, open space");
                    return;
                }

                // move selected square to empty space
                copyOfSquares[index] = squares[selectedTileIndex]
                copyOfSquares[selectedTileIndex] = emptyTile 
                
                // store current state in history stack before making the move
                // clear future stack since we're making a new move
                const newHistory = [...history, squares.map(s => ({ ...s }))];
                setHistory(newHistory);
                setFuture([]);

                // update squares and reset everything to not selected
                setSquares(copyOfSquares)
                setIsASquareselected(false);
                setSelectedTileIndex(-1);
                
                // increment move count
                setMoves(newHistory.length);
            } // else do nothing
        } else {
            // update status of square
            const square = copyOfSquares[index]
            square.selected = true;

            // update squares 
            setSquares(copyOfSquares)
            setIsASquareselected(true)
            setSelectedTileIndex(index);
        }
        return;
    };

    function undo(): void {
        if (history.length === 0) return; // nothing to undo
        
        // get the previous state from history stack
        const previousState = history[history.length - 1];
        
        // push current state to future stack (for redo)
        setFuture([...future, squares.map(s => ({ ...s }))]);
        
        // remove last state from history and restore it
        const newHistory = history.slice(0, -1);
        setHistory(newHistory);
        setSquares(previousState.map(s => ({ ...s })));
        setMoves(newHistory.length);
        
        // clear selection when undoing
        setIsASquareselected(false);
        setSelectedTileIndex(-1);
    }

    function redo(): void {
        if (future.length === 0) return; // nothing to redo
        
        // get the next state from future stack
        const nextState = future[future.length - 1];
        
        // push current state to history stack (for undo)
        const newHistory = [...history, squares.map(s => ({ ...s }))];
        setHistory(newHistory);
        
        // remove last state from future and restore it
        setFuture(future.slice(0, -1));
        setSquares(nextState.map(s => ({ ...s })));
        setMoves(newHistory.length);
        
        // clear selection when redoing
        setIsASquareselected(false);
        setSelectedTileIndex(-1);
    }

    function reset(): void {
        // restore to initial state
        setSquares(initialSquares.map(s => ({ ...s })));
        setHistory([]);
        setFuture([]);
        setMoves(0);
        setIsASquareselected(false);
        setSelectedTileIndex(-1);
    }

    return {
        moves,
        handleTileClick,
        squares,
        undo,
        redo,
        reset,
        canUndo: history.length > 0,
        canRedo: future.length > 0
    }
}