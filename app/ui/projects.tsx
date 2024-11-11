import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Prisma } from "@prisma/client";

export default async function CardsWrapper() {
  async function fetchLastProjects() {
    const prisma = new PrismaClient();
    let projects = null;
    try {
      projects = await prisma.project.findMany({
        orderBy: [{ id: "desc" }],
        take: 3,
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
    <section className="container mx-auto flex flex-col container m-4 mb-16 items-center">
      <div className="group m-0 p-0 flex flex-row w-full items-stretch justify-center">
        <h1 className="mr-[32rem] border-grayLight shadow shadow-purple p-4 px-8 rounded-lg text-center text-5xl font-bold text-white bg-indigo-500">
          Projects
        </h1>
      </div>
      {projects.map((project, index: number) => {
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
function Card({
  project,
}: {
  project: Prisma.ProjectGetPayload<{
    include: { picture: true; technosUsed: { include: { picture: true } } };
  }>;
}) {
  return (
    <div className="flex flex-col h-64 shadow shadow-indigo-500 border-grayMedium border rounded my-4 p-2 w-2/5 text-white text-lg font-bold overflow-hidden">
      <div className="flex flex-row grow">
        <Image
          src={`/uploads/${project.picture.fileName}`}
          alt={project.picture.alt}
          height={250}
          width={200}
          className="object-contain shrink"
        />
        <div className="grow flex flex-col justify-between">
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          {project.url && <Link href={project.url} className="align-end">Lien vers le site</Link>}
        </div>
      </div>
      {/* liste des technos */} 
      <div className="flex flex-row flex-wrap justify-center">
        {project.technosUsed.map((techno)=>(
          <Link href={techno.url}>
            <Image src={`/uploads/${techno.picture.fileName}`}
              alt={techno.picture.alt}
              height={40}
              width={40}
              />
          </Link>
          ))}
      </div>
    </div>
  );
}
