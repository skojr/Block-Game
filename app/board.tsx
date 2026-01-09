"use client";
import { useState } from "react";
import Tile from "./tile"

export default function Board({ rows = 3, cols = 3 }: { rows?: number, cols?: number }) {
    const [tiles, setTiles] = useState(
        Array.from({ length: rows * cols }, (_, i) => [
            i !== rows * cols - 1, // occupied
            i === 0 // target
        ])
    );

    return (
        <div className="flex flex-col gap-2 p-2">
            {Array.from({ length: rows }, (_, row) => (
                <div key={row} className="flex gap-2">
                    {Array.from({ length: cols }, (_, col) => {
                        const index = row * cols + col
                        return (
                            <Tile
                                key={col}
                                occupied={tiles[index][0]}
                                target={tiles[index][1]}
                            />
                        )
                    })}
                </div>
            ))}
        </div>
    )
}