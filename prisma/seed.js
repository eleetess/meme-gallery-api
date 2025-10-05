import { seedData } from "../seedData.js";
async function main() {
  const user = await Prisma.user.create({
    data: {
      unsername: "Erica",
      password: "pass123",
    },
  });
  await prisma.meme.create({
    data: {
      title: "Distracted Boyfriend",
      url: "https://i.imgur.com/example1.jpg",
      userId: user.id,
    },
  });
}
main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
