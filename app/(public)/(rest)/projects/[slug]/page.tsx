import Image from "next/image";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import TechnoCard from "@/app/ui/molecules/TechnoCard";

//TODO: polish this page
export default async function Home({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  async function fetchProject() {
    const prisma = new PrismaClient();
    let projects = null;
    try {
      projects = await prisma.project.findUnique({
        where: { isPublished: true, slug: slug },
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

  const project = await fetchProject();

  if (project === null) {
    return (
      <span className="text-red-500">The project asked does dot exist</span>
    );
  }

  return (
    <article className="flex flex-col items-center px-4">
      <h2 className="p-4">{project.name}</h2>
      <Image
        src={`/uploads/${project.picture.fileName}`}
        alt={project.picture.alt}
        height={250}
        width={200}
        className="object-contain object-center"
      />
      <p>{project.description}</p>
      <div className="flex flex-row gap-1">
        {project.technosUsed.map((tech) => (
          <TechnoCard techno={tech} key={tech.id} />
        ))}
      </div>
      {project.url && <Link href={project.url}>{project.url}</Link>}
      {project.repoUrl && <Link href={project.repoUrl}>{project.repoUrl}</Link>}
    </article>
  );
}
