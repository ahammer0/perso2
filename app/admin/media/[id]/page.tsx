import {getMedia} from '../actions.tsx'
import Image from 'next/image'

export default async function ShowMedia({
  params
  }:{
    params:{id:String}
  }){
  const media = await getMedia(parseInt(params.id))
  console.log(media)

  return <>
  <p>id reçu :{params.id}</p>
  <Image src={`/uploads/${media.fileName}`} alt={media.alt} height="500" width="500"/>
  <p>AltText: {media.alt}</p>
  </>
}
