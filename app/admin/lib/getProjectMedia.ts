"use server";
import { PrismaClient, Media } from "@prisma/client";

export async function getProjectMedias() {
  const prisma = new PrismaClient();
  let medias: Media[] = [];
  try {
    medias = await prisma.media.findMany({
      where: {
        type: "picture",
        projects: { none: {} },
      },
    });
  } catch (e) {
    console.error(e);
  } finally {
    prisma.$disconnect();
    return medias;
  }
}
export default getProjectMedias;
