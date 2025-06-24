import CardsWrapper from "@/app/ui/organisms/projects";
import Nav from "@/app/ui/organisms/nav";
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
  return (
    <div>
      <div className="relative bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gray-700 to-neutral-900 min-h-screen text-white flex flex-col">
        <Nav />
        <div className="p-4">
          <CardsWrapper projects={projects} />
        </div>
      </div>
    </div>
  );
}
