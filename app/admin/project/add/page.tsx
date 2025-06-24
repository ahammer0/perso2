import { addProject } from "../actions";
import MediaPicker from "../../techno/ui/mediaPicker";
import { getTechnos } from "../../techno/actions";
import TechnoPicker from "../ui/technoPicker";
import getProjectMedias from "../../lib/getProjectMedia";
import { Button } from "@/app/ui/atoms/buttons";

export default async function addForm() {
  const medias = await getProjectMedias();
  const technos = await getTechnos();

  return (
    <>
      <form action={addProject} className="flex flex-col">
        <div className="flex flex-col">
          <label htmlFor="name">Nom du projet</label>
          <input type="text" name="name" required />
        </div>

        <div className="flex flex-col overflow-x-scroll">
          <label htmlFor="pictureId">Image du projet</label>
          <MediaPicker name="pictureId" medias={medias} required />
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
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label htmlFor="description">Description du projet</label>
          <textarea name="description" cols={30} rows={10}></textarea>
        </div>

        <div className="flex flex-col">
          <label htmlFor="url">Url du projet</label>
          <input type="url" name="url" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="technosUsed">Technos utilisées</label>
          <TechnoPicker technos={technos} name="technosUsed" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="isPublished">Visible au public</label>
          <input type="checkbox" name="isPublished" />
        </div>
        <Button type="submit">Ajouter le projet</Button>
      </form>
    </>
  );
}
