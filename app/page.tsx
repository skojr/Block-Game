import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { auth } from "@/auth"
import SignIn from "@/components/SignIn"
import UserMenu from "@/components/UserMenu"
import Leaderboard from "@/components/Leaderboard"

export default async function Home() {
  const session = await auth()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 text-foreground dark">
      <main className="flex flex-col items-center justify-center gap-8 px-8 py-16">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-blue-600 to-amber-400 bg-clip-text text-transparent tracking-tight">
          Pick a Game!
        </h1>

        {session ? (
          <div className="flex flex-col gap-2">
            <Link href="/block_game" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-700 text-white text-xl font-bold">
              Block Game <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/two_block_game" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-700 text-white text-xl font-bold">
              2 Block Game <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/tic_tac_toe_game" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-700 text-white text-xl font-bold">
              Disappearing Tic-Tac-Toe <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : null}

        <div className="w-full flex flex-col items-center gap-4 pt-6 border-t border-border/30">
          <p className="text-sm text-muted-foreground text-center">
            Track your scores and see the global scoreboard
          </p>
          {session ? <UserMenu /> : <SignIn />}
        </div>

        <Leaderboard />
      </main>
    </div>
  )
}