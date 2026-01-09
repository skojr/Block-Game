"use client";
import { useState } from "react";
import canMoveTile from "../domain/game";

interface Square {
    occupied: boolean,
    target: boolean,
    selected: boolean
}

interface Hooks {
    handleTileClick: (index: number) => void,
    squares: Square[]
}
export default function useBoardGame({ rows, cols }: { rows: number, cols: number }): Hooks {

    const [isASquareselected, setIsASquareselected] = useState<boolean>(false);
    const [selectedTileIndex, setSelectedTileIndex] = useState<number>(-1);
    const [squares, setSquares] = useState<Square[]>(
        Array.from({ length: rows * cols }, (_, i) => ({
            occupied: i !== rows * cols - 1, // occupied
            target: i === 0, // target
            selected: false,
        }))
    );

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
                copyOfSquares[index] = squares[selectedTileIndex]
                copyOfSquares[selectedTileIndex] = emptyTile

                // update squares and reset everything to not selected
                setSquares(copyOfSquares)
                setIsASquareselected(false);
                setSelectedTileIndex(-1);
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

    return {
        handleTileClick,
        squares
    }
}