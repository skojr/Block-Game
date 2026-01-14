"use client";
import { useState } from "react";
import Board from "@/components/Board";
import useBoardGame from "../hooks/useBoardGame";
import TicTacToeSquare from "./TicTacToeSquare";
import { Undo2, Redo2, RotateCcw, Trophy } from "lucide-react";
import { CellData } from "@/types/BoardTypes";

interface TicTacToeGameBoardProps {
    rows?: number;
    cols?: number;
}

export default function TicTacToeBoard({ rows = 3, cols = 3 }: TicTacToeGameBoardProps) {
    const [isXTurn, setIsXTurn] = useState<boolean>(true);
    const { moves, squares, handleTileClick, undo, redo, reset, canUndo, canRedo, winner } = useBoardGame({ rows, cols });

    const handleCellClick = (index: number) => {
        if (winner) return; // Don't allow moves after a win
        handleTileClick(index, isXTurn);
        setIsXTurn(!isXTurn);
    };

    const renderCell = (cell: CellData, index: number) => {
        const square = cell as { occupied: boolean; isX: boolean };
        return (
            <TicTacToeSquare
                onSquareClick={() => handleCellClick(index)}
                occupied={square.occupied}
                isX={square.isX}
                disabled={!!winner}
            />
        );
    };

    return (
        <div className="flex flex-col gap-4">
            {winner && (
                <div className="flex justify-center items-center">
                    <div className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500/90 to-amber-600/90 dark:from-amber-600/90 dark:to-amber-700/90 backdrop-blur-sm border-2 border-amber-400/50 dark:border-amber-500/50 shadow-xl animate-pulse">
                        <div className="flex items-center gap-3">
                            <Trophy className="w-6 h-6 text-amber-200 dark:text-amber-100" />
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-amber-50 dark:text-amber-100">Winner!</span>
                                <span className="text-2xl font-bold text-white">
                                    Player {winner} Wins!
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex justify-center items-center gap-4">
                <div className="px-6 py-3 rounded-xl bg-card/80 dark:bg-card/60 backdrop-blur-sm border border-border shadow-lg">
                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-sm font-medium">Moves:</span>
                        <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 dark:from-amber-500 dark:via-amber-600 dark:to-amber-700 bg-clip-text text-transparent">
                            {moves}
                        </span>
                    </div>
                </div>
            </div>
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
                <button
                    onClick={() => {
                        reset();
                        setIsXTurn(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 transition-colors text-white text-sm font-semibold shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                </button>
            </div>
            <Board
                rows={rows}
                cols={cols}
                cells={squares as unknown as CellData[]}
                onCellClick={() => {}}
                renderCell={renderCell}
            />
        </div>
    );
}
