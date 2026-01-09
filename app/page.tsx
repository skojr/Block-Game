"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
        <Link
          href="/game"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-700 hover:from-sky-600 hover:to-blue-800 transition-colors text-white text-xl font-bold shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          Play Game
          <ArrowRight className="w-5 h-5" />
        </Link>
      </main>
    </div>
  );
}
