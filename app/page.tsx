"use client";
import Link from "next/link";
import { ArrowRight, LogIn, UserPlus } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800 text-foreground">
      <main className="flex flex-col items-center justify-center gap-8 px-8 py-16">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-amber-600 via-blue-700 to-amber-800 dark:from-blue-400 dark:via-blue-600 dark:to-amber-400 bg-clip-text text-transparent tracking-tight">
            Welcome to Block Game!
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Slide blocks around and bring the yellow square to its goal. Can you solve the puzzle?
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Link
            href="/game"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-700 hover:from-sky-600 hover:to-blue-800 transition-colors text-white text-xl font-bold shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Play Game
            <ArrowRight className="w-5 h-5" />
          </Link>
          <div className="flex flex-col items-center gap-3 pt-4 border-t border-border/50 w-full max-w-md">
            <p className="text-sm text-muted-foreground mb-2">
              Track your scores and see the global scoreboard
            </p>
            <div className="flex gap-3 w-full">
              <Link
                href="/login"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 transition-colors text-white text-base font-semibold shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
              <Link
                href="/signup"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 transition-colors text-white text-base font-semibold shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
