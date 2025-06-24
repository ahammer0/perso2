import TechnoCard from "@/app/ui/molecules/TechnoCard";
import React from "react";
import { getProject } from "../actions";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/ui/atoms/buttons";

export default async function EditMedia(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const project = await getProject(parseInt(params.id));
  if (project === null) {
    return;
  }
  console.log("project", project);
  return (
    <>
      <h2>Détails du projet : {project.name}</h2>
      <Image
        src={`/uploads/${project.picture.fileName}`}
        alt={project.picture.alt}
        height={300}
        width={300}
      />
      <p>Description du projet: {project.description}</p>
      <p>Est visible: {project.isPublished ? "oui" : "non"}</p>
      <p>Technos utilisées</p>
      <div className="flex flex-row gap-1">
        {project.technosUsed.map((techno) => (
          <React.Fragment key={techno.id}>
            <TechnoCard techno={techno} />
          </React.Fragment>
        ))}
      </div>

      <Link href={project.url ?? "#"}>Lien vers le site du projet</Link>
      <Button href={`/admin/project/${params.id}/edit`} className="ml-2">
        Éditer
      </Button>
    </>
  );
}
