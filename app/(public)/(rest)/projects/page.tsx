import CardsWrapper from "@/app/ui/organisms/projects";
import { PrismaClient } from "@prisma/client";

export default async function Home() {
  async function fetchLastProjects() {
    const prisma = new PrismaClient();
    let projects = null;
    try {
      projects = await prisma.project.findMany({
        orderBy: [{ id: "desc" }],
        where: { isPublished: true },
        include: {
          picture: true,
          technosUsed: { include: { picture: true } },
        },
      });
    } catch (e) {
      console.error(e);
    } finally {
      prisma.$disconnect();
      return projects;
    }
  }

  const projects = await fetchLastProjects();
  if (projects === null) {
    return;
  }
  return <CardsWrapper projects={projects} />;
}
