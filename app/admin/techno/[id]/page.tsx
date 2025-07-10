import Image from "next/image";
import { getTechno } from "../actions";

export default async function EditMedia(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const techno = await getTechno(parseInt(params.id));

  if (!techno) {
    return <p className="text-red-500">Le techno demandé n&apos;existe pas</p>;
  }
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
