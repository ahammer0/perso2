import Image from "next/image";
import { editProject, getProject } from "../../actions";
import getProjectMedias from "../../../lib/getProjectMedia";
import MediaPicker from "../../../techno/ui/mediaPicker";
import TechnoPicker from "../../ui/technoPicker";
import { getTechnos } from "../../../techno/actions";
import { Button } from "@/app/ui/atoms/buttons";

export default async function EditProject(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const project = await getProject(parseInt(params.id));
  const medias = await getProjectMedias();
  const technos = await getTechnos();

  if (!project) {
    return <p className="text-red-500">Projet introuvable</p>;
  }

  return (
    <>
      <h2>Édition du projet {project?.name}</h2>
      <Image
        src={`/uploads/${project?.picture.fileName}`}
        alt={project?.picture.alt ?? ""}
        width={300}
        height={300}
      />
      <form action={editProject} className="flex flex-col">
        <div className="flex flex-col">
          <label htmlFor="name">Nom du projet</label>
          <input
            type="text"
            name="name"
            required
            defaultValue={project?.name}
          />
        </div>

        <div className="flex flex-col overflow-x-scroll">
          <label htmlFor="pictureId">Image du projet</label>
          <MediaPicker
            name="pictureId"
            medias={medias}
            required
            defaultValue={project?.pictureId}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="shortDescription">Description courte du projet</label>
          <textarea
            name="shortDescription"
            cols={30}
            rows={5}
            maxLength={200}
            required
            placeholder="max 200 caractères"
            defaultValue={project.shortDescription}
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label htmlFor="description">Description du projet</label>
          <textarea
            name="description"
            cols={30}
            rows={10}
            defaultValue={project.description ?? undefined}
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label htmlFor="url">Url du projet</label>
          <input
            type="url"
            name="url"
            defaultValue={project.url ?? undefined}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="technosUsed">Technos utilisées</label>
          <TechnoPicker
            technos={technos}
            name="technosUsed"
            defaultValue={JSON.stringify(
              project.technosUsed.map((el) => ({ id: el.id })),
            )}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="isPublished">Visible au public</label>
          <input
            type="checkbox"
            name="isPublished"
            defaultChecked={project.isPublished}
          />
        </div>

        <input type="hidden" name="id" value={project.id} />
        <Button type="submit">Enregistrer</Button>
      </form>
    </>
  );
}
