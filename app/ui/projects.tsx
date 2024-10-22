import { PrismaClient } from "@prisma/client";

export default async function CardsWrapper() {
  async function fetchLastProjects() {
    const prisma = new PrismaClient();
    try {
      const projects = await prisma.project.findMany({
        orderBy: [{ id: "desc" }],
        take: 3,
      });
      return projects;
    } catch (e) {
      console.error(e);
    } finally {
      prisma.$disconnect();
    }
  }

  const projects = await fetchLastProjects();

  return (
    <div className="container mx-auto flex flex-col container m-4 items-center">
      {projects?.map((project, index: number) => {
        return (
        <div className="group m-0 p-0 flex flex-row w-full items-stretch">
          <div className="relative w-64">
            {/* barre verticale */}  
            <div className="absolute left-[calc(50%-10px)] top-0 w-[20px] h-full group-first:h-1/2 group-first:top-[50%] group-last:h-1/2 bg-grayLight"></div>
            {/* barre horiz */}
            <div className="absolute w-1/2 h-[20px] top-[calc(50%-10px)] right-0 bg-grayLight"></div>
            {/* rond */}
            <div className="absolute left-[calc(50%-25px)] top-[calc(50%-25px)] w-[50px] aspect-square rounded-full bg-grayMedium"></div>
          </div>
          <Card key={index} project={project} />
        </div>
        );
      })}
    </div>
  );
}
function Card({ project }: { project: { title: string } }) {
  return <div className="h-64 bg-slate-300 grow rounded my-4">{project.title}</div>;
}
