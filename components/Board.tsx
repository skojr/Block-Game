"use client";
import { GameBoardProps } from "../types/BoardTypes";

export default function Board({ rows, cols, cells, onCellClick, renderCell }: GameBoardProps) {
    return (
        <div className="flex flex-col gap-2 p-2">
            {Array.from({ length: rows }, (_, row) => (
                <div key={row} className="flex gap-2">
                    {Array.from({ length: cols }, (_, col) => {
                        const index = row * cols + col;
                        const cell = cells[index];
                        return (
                            <div key={col}>
                                {renderCell ? (
                                    renderCell(cell, index)
                                ) : (
                                    <button
                                        onClick={() => onCellClick(index)}
                                        className="w-20 h-20 border-2 border-border bg-card hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed flex items-center justify-center rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}