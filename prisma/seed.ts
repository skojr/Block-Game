import 'dotenv/config'
import { PrismaClient } from '../app/generated/prisma'

const prisma = new PrismaClient()

const users = [
  {
    id: "google-sub-alice",
    email: "alice@prisma.io",
    name: "Alice",
    scores: {
      create: [
        { game: "2 Block Game", moves: 24 },
        { game: "Tic Tac Toe", moves: 12 },
      ],
    },
  },
  {
    id: "google-sub-bob",
    email: "bob@prisma.io",
    name: "Bob",
    scores: {
      create: [
        { game: "2 Block Game", moves: 25 },
        { game: "Block Game", moves: 15 },
      ],
    },
  },
]

async function main() {
  for (const user of users) {
    await prisma.user.create({ data: user })
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
