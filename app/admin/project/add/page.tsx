import { addProject } from "../actions";
import MediaPicker from "../../techno/ui/mediaPicker";
import { getMedias } from "../../media/actions";
import { getTechnos } from "../../techno/actions";
import TechnoPicker from "../ui/technoPicker";

export default async function addForm() {
  const medias = await getMedias()
  const technos = await getTechnos()

  return (
    <>
      <form action={addProject} className="flex flex-col text-black">
        <div className="flex flex-col">
          <label htmlFor="name">Nom du projet</label>
          <input type="text" name="name" required/>
        </div>

        <div className="flex flex-col">
          <label htmlFor="pictureId">Image du projet</label>
          <MediaPicker name="pictureId" medias={medias}/>
        </div>

        <div className="flex flex-col">
          <label htmlFor="description">Description du projet</label>
          <textarea name="description" cols={30} rows={10} required></textarea>
        </div>

        <div className="flex flex-col">
          <label htmlFor="url">Url du projet</label>
          <input type="url" name="url" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="technosUsed">Technos utilisées</label>
          <TechnoPicker technos={technos} name="technosUsed"/>
        </div>

        <div className="flex flex-col">
          <label htmlFor="isPublished">Visible au public</label>
          <input type="checkbox" name="isPublished" />
        </div>
        <button type="submit">Ajouter le projet</button>
      </form>
    </>
  );
}
