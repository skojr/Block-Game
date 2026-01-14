import prisma from "@/lib/prisma"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

async function getTopScores(game: string) {
  return prisma.score.findMany({
    where: { game },
    orderBy: { moves: "asc" },
    take: 10,
    include: { user: true },
  })
}

export default async function Leaderboard() {
  const games = ["2 Block Game", "Block Game", "Tic Tac Toe"] as const
  const results = await Promise.all(games.map(getTopScores))

  return (
    <section className="w-full max-w-3xl mx-auto">
      <Card className="px-3 py-3 bg-gradient-to-r from-sky-500 to-blue-700 border border-border shadow-md text-white">
        {/* Increased header padding */}
        <CardHeader className="my-5 px-8 py-6">
          <h2 className="text-xl font-semibold">Leaderboard</h2>
          <p className="text-sm text-white">
            Top 10 lowest-move scores per game
          </p>
        </CardHeader>

        <Separator className="mb-4" />

        {/* Increased content padding */}
        <CardContent className="px-8 py-6 space-y-8">
          {games.map((game, i) => (
            <div key={game}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold">{game}</h3>
              </div>

              {results[i].length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No scores yet.
                </p>
              ) : (
                <ol className="space-y-2">
                  {results[i].map((row, idx) => (
                    <li
                      key={row.id}
                      className="flex items-center gap-4 rounded-md border border-border bg-background px-4 py-3 text-sm"
                    >
                      <RankBadge rank={idx + 1} />
                      <span>
                        {row.user.name ?? row.user.email} — {row.moves} moves
                      </span>
                    </li>
                  ))}
                </ol>
              )}

                <Separator className="mb-4" />
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  )
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <Badge className="bg-amber-500 text-white">#1</Badge>
  if (rank === 2) return <Badge className="bg-sky-500 text-white">#2</Badge>
  if (rank === 3) return <Badge className="bg-purple-500 text-white">#3</Badge>

  return (
    <Badge variant="outline" className="text-muted-foreground">
      #{rank}
    </Badge>
  )
}
