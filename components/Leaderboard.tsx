import prisma from "@/lib/prisma"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

async function getTopScores(game: string) {
  return prisma.score.findMany({
    where: { game },
    orderBy: { moves: "asc" },
    take: 10,
    include: { user: true },
  })
}

export default async function LeaderboardRow() {
  const games = ["2 Block Game", "Block Game", "Tic Tac Toe"] as const
  const results = await Promise.all(games.map(getTopScores))

  return (
    <section className="gap-8 mt-8 w-full max-w-7xl mx-auto px-4">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold">Leaderboard</h2>
      </div>

      {/* horizontal row: nowrap, cards have fixed min-width */}
      <div className="flex gap-8 overflow-x-auto py-2 px-1">
        {games.map((game, i) => (
          <Card
            key={game}
            className="bg-gradient-to-r from-sky-500 to-blue-700 text-white border border-border shadow-md min-w-[300px] flex-shrink-0"
          >
            <CardHeader className="px-6 py-4">
              <h3 className="text-lg font-semibold">{game}</h3>
            </CardHeader>

            <CardContent className="px-6 py-4">
              {results[i].length === 0 ? (
                <p className="text-sm text-white/80">No scores yet.</p>
              ) : (
                <ol className="space-y-2">
                  {results[i].map((row, idx) => (
                    <li
                      key={row.id}
                      className="flex items-center gap-3 rounded-md bg-white/10 px-3 py-2 text-sm"
                    >
                      <RankBadge rank={idx + 1} />
                      <span>
                        {row.user.name ?? row.user.email} | {row.moves} moves
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <div className="text-white text-2xl">🥇</div>
  if (rank === 2) return <div className="text-white text-2xl">🥈</div>
  if (rank === 3) return <div className="text-white text-2xl">🥉</div>

  return (
    <div className="text-white">
      #{rank}
    </div>
  )
}
