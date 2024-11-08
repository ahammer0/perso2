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
    <section className="container mx-auto flex flex-col container m-4 mb-16 items-center">
      <div className="group m-0 p-0 flex flex-row w-full items-stretch justify-center">
        <h1 className="mr-[32rem] border-grayLight shadow shadow-purple p-4 px-8 rounded-lg text-center text-5xl font-bold text-white bg-indigo-500">
          Projects
        </h1>
      </div>
      {projects?.map((project, index: number) => {
        return (
          <div className="group m-0 p-0 flex flex-row w-full items-stretch justify-center">
            <div className="relative w-64">
              {/* barre verticale */}
              <div className="absolute shadow-indigo-500 shadow-lg left-[calc(50%-10px)] top-0 w-[20px] h-full group-last:h-1/2 bg-gradient-to-r from-black via-grayMedium to-black"></div>
              {/* barre horiz */}
              <div className="absolute shadow-indigo-500 shadow w-1/2 h-[20px] top-[calc(50%-10px)] right-0 bg-grayMedium bg-gradient-to-b from-black via-grayMedium to-black"></div>
              {/* rond */}
              <div className="absolute shadow-indigo-500 shadow left-[calc(50%-25px)] top-[calc(50%-25px)] w-[50px] aspect-square rounded-full bg-grayMedium bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] to-black from-grayMedium"></div>
            </div>
            <Card key={index} project={project} />
          </div>
        );
      })}
    </section>
  );
}
function Card({ project }: { project: { title: string } }) {
  return (
    <div className="h-64 shadow shadow-indigo-500 border-grayMedium border rounded my-4 w-2/5 text-white text-lg font-bold">
      {project.title}
    </div>
  );
}
