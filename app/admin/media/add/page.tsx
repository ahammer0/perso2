import {addMedia} from '../actions.tsx'
export default function MediaAdd(){
  return <>
  <h2>Ajout d'utilisateur</h2>
  <form action={addMedia} className="flex flex-col text-black">
    <div className="flex flex-col">
      <label htmlFor="alt">Description alt</label>
      <input type="text" name="alt" required/>
    </div>
    <div className="flex flex-col">
      <label htmlFor="file">Fichier</label>
      <input type="file" name="file" required/>
    </div>
    <div className="flex flex-col">
      <label htmlFor="type"></label>
      <select name="type">
        <option value="picture">Image d' illustration</option>
        <option value="icon">Icone</option>
        <option value="profile">Photo de profil</option>
      </select>
    </div>
    <input type="submit" value="Ajouter le média" />
  </form>

  </>
}
