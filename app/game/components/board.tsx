"use client";
import Square from "./square";
import useBoardGame from "../hooks/useBoardGame";

export default function Board({ rows = 3, cols = 3 }: { rows?: number, cols?: number }) {
    const { squares, handleTileClick } = useBoardGame({ rows, cols })

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