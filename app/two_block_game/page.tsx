"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, LayoutGrid } from "lucide-react";
import TwoBlockGameBoard from "./components/TwoBlockGameBoard";

export default function Home() {
  const [boardSize, setBoardSize] = useState<number>(3);

  const boardSizes = [3, 4, 5, 6];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800 text-foreground">
      <main className="flex min-h-screen w-full flex-col items-center justify-center px-8 py-16 gap-8">
        <div className="w-full max-w-3xl flex justify-start mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-700 hover:from-sky-600 hover:to-blue-800 transition-colors text-white text-base font-semibold shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-amber-900 dark:from-gray-100 dark:via-gray-200 dark:to-amber-100 bg-clip-text text-transparent tracking-tight">
            2 Block Game
          </h1>
          <p className="text-muted-foreground text-lg font-medium">Goal: Move the amber squares to opposite corners</p>
          <p className="text-muted-foreground text-lg font-medium">Top-left target → Bottom-right corner</p>
          <p className="text-muted-foreground text-lg font-medium">Bottom-right target → Top-left corner</p>
          <p className="text-muted-foreground text-lg font-medium">Rule 1: You can only move a square into open space</p>
          <p className="text-muted-foreground text-lg font-medium">Rule 2: You can only move a square into directly adjacent spaces (either horizontally or vertically)</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-card/80 dark:bg-card/60 backdrop-blur-sm border border-border shadow-lg">
            <LayoutGrid className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Board Size:</span>
            <div className="flex gap-2">
              {boardSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setBoardSize(size)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    boardSize === size
                      ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md"
                      : "bg-secondary/50 hover:bg-secondary text-foreground"
                  }`}
                >
                  {size}x{size}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center p-8 rounded-2xl bg-card/50 dark:bg-card/30 backdrop-blur-sm border border-border shadow-xl">
            <TwoBlockGameBoard key={boardSize} rows={boardSize} cols={boardSize} />
          </div>
        </div>
      </main>
    </div>
  );
}
