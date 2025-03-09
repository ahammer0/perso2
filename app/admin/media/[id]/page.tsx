import { getMedia } from "../actions.tsx";
import Image from "next/image";

export default async function ShowMedia(props: {
  params: Promise<{ id: String }>;
}) {
  const params = await props.params;
  const media = await getMedia(parseInt(params.id));

  return (
    <>
      <p>id reçu :{params.id}</p>
      <Image
        src={`/uploads/${media.fileName}`}
        alt={media.alt}
        height="500"
        width="500"
      />
      <p>AltText: {media.alt}</p>
      <p>Type: {media.type}</p>
    </>
  );
}
