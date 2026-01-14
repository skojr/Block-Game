import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BlockGameBoard from "./components/BlockGameBoard";

export default function Home() {
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
            Block Game
          </h1>
          <p className="text-muted-foreground text-lg font-medium">Goal: Move the yellow square into the bottom right corner</p>
          <p className="text-muted-foreground text-lg font-medium">Rule 1: You can only move a square into open space</p>
          <p className="text-muted-foreground text-lg font-medium">Rule 2: You can only move a square into directly djacent spaces (either horizontally or vertically)</p>
          
        </div>
        <div className="flex items-center justify-center p-8 rounded-2xl bg-card/50 dark:bg-card/30 backdrop-blur-sm border border-border shadow-xl">
          <BlockGameBoard />
        </div>
      </main>
    </div>
  );
}
