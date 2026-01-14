"use client";

interface BlockSquareProps {
    onSquareClick: () => void;
    occupied?: boolean;
    target?: boolean;
}

export default function BlockSquare({ onSquareClick, occupied = true, target = false }: BlockSquareProps) {
    return (
        <button onClick={onSquareClick} className="w-20 h-20 relative border-2 border-border bg-card hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed flex items-center justify-center rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 group overflow-hidden">
            {occupied && !target && (
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-amber-600 via-blue-700 to-amber-800 dark:from-blue-500 dark:via-blue-600 dark:to-blue-700 shadow-lg ring-2 ring-blue-900/20 dark:ring-blue-300/20 transition-transform duration-200 group-hover:scale-105"></div>
            )}
            {occupied && target && (
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 dark:from-amber-500 dark:via-amber-600 dark:to-amber-700 shadow-lg ring-2 ring-amber-900/20 dark:ring-amber-300/20 transition-transform duration-200 group-hover:scale-105"></div>
            )}
            {!occupied && (
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-300/10 dark:to-gray-600/10 rounded-xl"></div>
            )}
        </button>
    );
}
