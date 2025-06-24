import Image from "next/image";
import Link from "next/link";
import { Prisma } from "@prisma/client";
import Tree from "../molecules/tree/Tree";
import TechnoCard from "../molecules/TechnoCard";

// TODO: image cliquable qui donne sur un page détails
//    TODO: ajouter un slug aux projects
//    TODO: rendre les images cliquable
//    TODO: créer une page détails avec le slug en param

export default async function CardsWrapper({
  projects,
}: {
  projects: Prisma.ProjectGetPayload<{
    include: { picture: true; technosUsed: { include: { picture: true } } };
  }>[];
}) {
  const nodes = projects.map((project) => <Card project={project} />);

  return (
    <section
      className="container mx-auto p-4 pb-16 max-w-[800px]"
      id="projects"
    >
      <Tree title="Projects" nodes={nodes} />
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
    <>
      <div className="flex flex-col">
        <h3 className="text-center mb-2">{project.name}</h3>
        <div className="flex flex-col md:flex-row">
          <Image
            src={`/uploads/${project.picture.fileName}`}
            alt={project.picture.alt}
            height={250}
            width={200}
            className="object-contain object-top self-center px-2 rounded"
          />
          <div className="grow flex flex-col justify-between mb-2">
            <p className="text-base font-normal">{project.shortDescription}</p>
            {project.url && (
              <Link
                href={project.url}
                className=" my-4 self-center underline font-normal"
              >
                See it live !
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* liste des technos */}
      <div className="flex flex-row flex-wrap justify-center gap-2">
        {project.technosUsed.map((tech) => (
          <TechnoCard techno={tech} key={tech.id} />
        ))}
      </div>
    </>
  );
}
