import { Input } from "@/app/ui/atoms/inputs";
import { addMedia } from "../actions";
import ImageInput from "../ui/pasteFileInput";
import { Button } from "@/app/ui/atoms/buttons";
import { H2 } from "@/app/ui/atoms/headers";

export default function MediaAdd() {
  return (
    <>
      <H2>Ajout d&apos;utilisateur</H2>
      <form action={addMedia} className="flex flex-col">
        <div className="flex flex-col">
          <label htmlFor="alt">Description alt</label>
          <Input type="text" name="alt" required />
        </div>
        <div className="flex flex-col">
          <label htmlFor="file">Fichier</label>
          {/* <input type="file" name="file" required/> */}
          <ImageInput name="file" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="type"></label>
          <select name="type" className="text-black">
            <option value="picture">Image d&apos; illustration</option>
            <option value="icon">Icone</option>
            <option value="profile">Photo de profil</option>
          </select>
        </div>
        <Button type="submit">Ajouter le média </Button>
      </form>
    </>
  );
}
