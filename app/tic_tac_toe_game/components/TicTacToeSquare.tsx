"use client";

interface TicTacToeSquareProps {
    onSquareClick: () => void;
    occupied?: boolean;
    isX: boolean;
    disabled?: boolean;
}

export default function TicTacToeSquare({ onSquareClick, occupied = false, isX, disabled = false }: TicTacToeSquareProps) {
    return (
        <button
            onClick={onSquareClick}
            disabled={disabled || occupied}
            className="w-20 h-20 border-2 border-border bg-card hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 text-4xl font-bold text-foreground"
        >
            {occupied ? (isX ? "X" : "O") : ""}
        </button>
    );
}
