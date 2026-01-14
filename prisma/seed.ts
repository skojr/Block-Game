import 'dotenv/config'
import { PrismaClient, Prisma } from "../app/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    scores: {
      create: [
        { game: "2 Block Game", moves: 24 },
        { game: "Tic Tac Toe", moves: 12 },
        { game: "Block Game", moves: 16 },
      ],
    },
  },
  {
    name: "Bob",
    email: "bob@prisma.io",
    scores: {
      create: [
        { game: "2 Block Game", moves: 25 },
        { game: "Tic Tac Toe", moves: 10 },
        { game: "Block Game", moves: 15 },
      ],
    },
  },
];

async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
