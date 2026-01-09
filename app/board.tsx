"use client";
import { useState } from "react";
import Square from "./square";

/**
 * 
 * If i want to have state that reflects if square is selected or not based on click, how should i do that
 * we can represent squares as a 1-d list
 *  - map row, col to 1-d index
 *  - each element should have
 *      - whether it is occupied
 *      - whether it is the target
 *      - whether it is selected (only 1 element can be selected at a time)
 *      - the current position on the grid
 * set glo
 * when a square is clicked
 *  - selected = !selected 
 *  - global selected = selected
 */

export default function Board({ rows = 3, cols = 3 }: { rows?: number, cols?: number }) {
    const [isASquareselected, setIsASquareselected] = useState<boolean>(false)
    const [selectedTileIndex, setSelectedTileIndex] = useState<number>(-1)
    const [squares, setSquares] = useState(
        Array.from({ length: rows * cols }, (_, i) => ({
            occupied: i !== rows * cols - 1, // occupied
            target: i === 0, // target
            selected: false,
        }))
    );

    function canMoveTile(indexFrom: number, indexTo: number): boolean {
        // can move from indexFrom to indexTo if
            // they are right next to each other
            // they are on top of each other
        const fromRow = Math.floor(indexFrom / rows)
        const fromCol = indexFrom % cols

        const toRow = Math.floor(indexTo / rows)
        const toCol = indexTo % cols
        
        // if in adjacent columns, must be in same row
        if (Math.abs(fromCol - toCol) <= 1 && fromRow === toRow) return true;
        
        // if in adjacent rows, must be in same column
        if (Math.abs(fromRow - toRow) <= 1 && fromCol === toCol) return true;

        // otherwise, not a legal move
        return false;
    }

    function handleTileClick(index: number): void {
        const copyOfSquares = squares.slice();
        // if empty square is clicked, and another square was previously selected
        if (!squares[index].occupied) {
            if (isASquareselected) {
                const emptyTile = squares[index]

                // move selected square to empty space
                if (!canMoveTile(selectedTileIndex, index)) {
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

    return (
        <div className="flex flex-col gap-2 p-2">
            {Array.from({ length: rows }, (_, row) => (
                <div key={row} className="flex gap-2">
                    {Array.from({ length: cols }, (_, col) => {
                        const index = row * cols + col
                        const square = squares[index]
                        return (
                            <Square
                                key={col}
                                onSquareClick={() => handleTileClick(index)}
                                occupied={square.occupied}
                                target={square.target}
                            />
                        )
                    })}
                </div>
            ))}
        </div>
    )
}