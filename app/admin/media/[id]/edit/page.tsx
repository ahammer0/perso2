import { editMedia, getMedia } from "../../actions";

export default async function EditMedia(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const media = await getMedia(parseInt(params.id));

  if (!media) {
    return <p className="text-red-500">Le media demandé n&apos;existe pas</p>;
  }

  return (
    <>
      <form
        action={editMedia.bind(null, media.id)}
        className="flex flex-col text-black"
      >
        <div className="flex flex-col">
          <label htmlFor="alt">Description alt</label>
          <input type="text" name="alt" defaultValue={media.alt} />
        </div>
        {/* <div className="flex flex-col"> */}
        {/*   <label htmlFor="file">Fichier</label> */}
        {/*   <input type="file" name="file" required/> */}
        {/* </div> */}
        <div className="flex flex-col">
          <label htmlFor="type"></label>
          <select name="type" defaultValue={media.type}>
            <option value="picture">Image d&apos; illustration</option>
            <option value="icon">Icone</option>
            <option value="profile">Photo de profil</option>
          </select>
        </div>
        <input type="submit" value="Éditer le média" />
      </form>
    </>
  );
}
