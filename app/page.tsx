"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import SignIn from "@/components/SignIn";
import UserMenu from "@/components/UserMenu";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 text-foreground dark">
      <main className="flex flex-col items-center justify-center gap-8 px-8 py-16">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-blue-600 to-amber-400 bg-clip-text text-transparent tracking-tight">
            Welcome to Block Game!
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Slide blocks around and bring the yellow square to its goal. Can you solve the puzzle?
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          {status === "loading" ? (
            <div className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-card/50 dark:bg-card/30 animate-pulse">
              <div className="w-24 h-6 bg-muted rounded" />
            </div>
          ) : session ? (
            <div className="flex flex-col gap-2"><Link
              href="/block_game"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-700 hover:from-sky-600 hover:to-blue-800 dark:from-sky-400 dark:to-blue-600 dark:hover:from-sky-500 dark:hover:to-blue-700 transition-all text-white text-xl font-bold shadow-lg shadow-sky-500/20 dark:shadow-sky-500/30 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-sky-500 dark:focus:ring-sky-400"
            >
              Block Game
              <ArrowRight className="w-5 h-5" />
            </Link>
              <Link
                href="/tic_tac_toe_game"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-700 hover:from-sky-600 hover:to-blue-800 dark:from-sky-400 dark:to-blue-600 dark:hover:from-sky-500 dark:hover:to-blue-700 transition-all text-white text-xl font-bold shadow-lg shadow-sky-500/20 dark:shadow-sky-500/30 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-sky-500 dark:focus:ring-sky-400"
              >
                Disappearing Tic-Tac-Toe
                <ArrowRight className="w-5 h-5" />
              </Link>
              </div>
          ) : null}
          <div className="flex flex-col items-center gap-4 pt-6 border-t border-border/30 w-full max-w-md">
            <p className="text-sm text-muted-foreground text-center">
              Track your scores and see the global scoreboard
            </p>
            {session && <UserMenu />}
            {!session && status !== "loading" && <SignIn />}
          </div>
        </div>
      </main>
    </div>
  );
}
