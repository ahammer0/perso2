import MediaPicker from "../../ui/mediaPicker.tsx";
import { getMedias } from "@/app/admin/media/actions.tsx";
import { editTechno,getTechno } from "../../actions.tsx";

export default async function TechnoAdd({
  params,
}: {
  params: { id: String };
}) {
  const medias = await getMedias();
  const techId = parseInt(params.id);
  const techno = await getTechno(techId);
  return (
    <>
      <h2>édition d'une techno</h2>
      <form
        action={editTechno.bind(null, techId)}
        className="flex flex-col text-black"
      >
        <div className="flex flex-col">
          <label htmlFor="name">Nom de la techno</label>
          <input type="text" name="name" required defaultValue={techno.name} />
        </div>
        <MediaPicker
          name="pictureId"
          medias={medias}
          defaultValue={techno.picture.id}
        />
        <div className="flex flex-col">
          <label htmlFor="url">Url de la techno</label>
          <input type="text" name="url" defaultValue={techno.url} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="isPublished">Est visible ?</label>
          <input
            type="checkbox"
            name="isPublished"
            defaultChecked={techno.isPublished}
          />
        </div>

        <input type="submit" value="Ajouter le média" />
      </form>
    </>
  );
}
