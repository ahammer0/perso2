import { getProject } from "../actions";
import Image from "next/image";
import Link from "next/link";

export default async function EditMedia({
  params,
}: {
  params: { id: string };
}) {
  const project = await getProject(parseInt(params.id));
  if (project===null){return}
  return (
    <>
      <h2>Détails du projet : {project.name}</h2>
      <Image
        src={`/uploads/${project.picture.fileName}`}
        alt={project.picture.alt}
        height={300}
        width={300}
      />
      <p>{project.description}</p>
      <p>Technos utilisées</p>
      <div className="flex flex-row gap-1">
        {project.technosUsed.map((techno) => (
          <Image
            src={`/uploads/${techno.picture.fileName}`}
            alt={techno.picture.alt}
            width={60}
            height={60}
          />
        ))}
      </div>

      <Link href={project.url??'#'}>Lien vers le site du projet</Link>
    </>
  );
}
