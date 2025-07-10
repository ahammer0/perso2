import { getProject } from "../../actions"
import Image from "next/image"

export default async function EditProject(props:{params: Promise<{id:string}>}) {
  const params = await props.params;
  const project = await getProject(parseInt(params.id))

  return <>
  <h2>Édition du projet {project?.name}</h2>
  <Image src={`/uploads/${project?.picture.fileName}`} 
  alt={project?.picture.alt??''}
  width={300}
  height={300}
  />
  </>
}
