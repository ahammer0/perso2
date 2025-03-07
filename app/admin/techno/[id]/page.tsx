import Image from "next/image";
import { getTechno } from "../actions.tsx";

export default async function EditMedia(
  props: {
    params: Promise<{ id: String }>;
  }
) {
  const params = await props.params;
  const techno = await getTechno(parseInt(params.id));

  return (
    <>
      <p>{techno.name}</p>
      <Image
        src={`/uploads/${techno.picture.fileName}`}
        alt={techno.picture.alt}
        height="150"
        width="150"
      />
    </>
  );
}
