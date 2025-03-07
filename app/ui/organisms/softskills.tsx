import { PrismaClient } from "@prisma/client";
import { GetTechno } from "@/types/techno";
import { H2, H3 } from "../atoms/headers";
import TechnoCard from "../molecules/TechnoCard";
//
//TODO: display techs with cards& images
//
async function getUnusedTechnos() {
  const prisma = new PrismaClient();
  let technos: GetTechno[] = [];
  try {
    technos = await prisma.techno.findMany({
      where: {
        isPublished: true,
        projects: {
          none: {},
        },
      },
      include: {
        picture: true,
      },
    });
  } catch (e) {
    console.error(e);
  } finally {
    prisma.$disconnect();
    return technos;
  }
}
export default async function SoftSkills() {
  const technos = await getUnusedTechnos();

  return (
    <section className=" p-4 pb-6">
      <article className="mt-4">
        <H2 className="text-center text-slate-900 mb-4">More about myself</H2>
        <p>
          As an enthusiastic developer with a passion for computer science, I
          enjoy coding in my free time, constantly seeking new challenges and
          solutions. My love for problem-solving extends beyond technology, as I
          also engage in rock climbing and sailing. These activities have honed
          my ability to think critically, adapt to changing conditions, and work
          collaboratively with others. My dedication to continuous learning and
          my proactive approach make me a valuable team member who can navigate
          complex projects with ease and enthusiasm.
        </p>
      </article>
      <article className="mt-4">
        <H3 className="text-center text-slate-900 mb-4">
          Also playing with...
        </H3>
        <ul className="flex flex-wrap justify-center gap-2">
          {technos.map((techno) => (
            <li key={techno.name} className="">
              <TechnoCard techno={techno} />
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
