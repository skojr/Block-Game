"use client";
import Square from "./square";
import useBoardGame from "../hooks/useBoardGame";
import { Undo2, Redo2 } from "lucide-react";

export default function Board({ rows = 3, cols = 3 }: { rows?: number, cols?: number }) {
    const { squares, handleTileClick, undo, redo, canUndo, canRedo } = useBoardGame({ rows, cols })

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-center gap-3">
                <button
                    onClick={undo}
                    disabled={!canUndo}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-colors text-white text-sm font-semibold shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    <Undo2 className="w-4 h-4" />
                    Undo
                </button>
                <button
                    onClick={redo}
                    disabled={!canRedo}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-colors text-white text-sm font-semibold shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    <Redo2 className="w-4 h-4" />
                    Redo
                </button>
            </div>
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
        </div>
    )
}