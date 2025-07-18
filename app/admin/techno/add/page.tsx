import { addTechno } from "../actions";
import MediaPicker from "../ui/mediaPicker";
import { getMedias } from "../../media/actions";

export default async function TechnoAdd() {
  const medias = await getMedias();
  return (
    <>
      <h2>Ajout d&apos;une techno</h2>
      <form action={addTechno} className="flex flex-col">
        <div className="flex flex-col">
          <label htmlFor="name">Nom de la techno</label>
          <input type="text" name="name" required />
        </div>
        <MediaPicker name="pictureId" medias={medias} />
        <div className="flex flex-col">
          <label htmlFor="url">Url de la techno</label>
          <input type="text" name="url" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="isPublished">Est visible ?</label>
          <input type="checkbox" name="isPublished" />
        </div>

        <input type="submit" value="Ajouter la techno" />
      </form>
    </>
  );
}
