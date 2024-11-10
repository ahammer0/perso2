import {editMedia,getMedia} from '../../actions.tsx'

export default async function EditMedia({params}:{params:{id:String}}){
  const media = await getMedia(parseInt(params.id))

  return <>
    
  <form action={editMedia.bind(null,media.id)} className="flex flex-col text-black">
    <div className="flex flex-col">
      <label htmlFor="alt">Description alt</label>
      <input type="text" name="alt" defaultValue={media.alt}/>
    </div>
    {/* <div className="flex flex-col"> */}
    {/*   <label htmlFor="file">Fichier</label> */}
    {/*   <input type="file" name="file" required/> */}
    {/* </div> */}
    <div className="flex flex-col">
      <label htmlFor="type"></label>
      <select name="type" defaultValue={media.type}>
        <option value="picture">Image d' illustration</option>
        <option value="icon">Icone</option>
        <option value="profile">Photo de profil</option>
      </select>
    </div>
    <input type="submit" value="Éditer le média" />
  </form>
  </>
}
