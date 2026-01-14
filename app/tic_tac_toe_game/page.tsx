import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TicTacToeBoard from "./components/TicTacToeBoard";

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
            Tic-Tac-Toe
          </h1>
          <p className="text-muted-foreground text-lg font-medium">Take turns placing X and O to get three in a row</p>
          <p className="text-muted-foreground text-lg font-medium">Click on an empty square to place your mark</p>
        </div>
        <div className="flex items-center justify-center p-8 rounded-2xl bg-card/50 dark:bg-card/30 backdrop-blur-sm border border-border shadow-xl">
          <TicTacToeBoard />
        </div>
      </main>
    </div>
  );
}
