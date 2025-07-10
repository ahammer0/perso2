import { getMedia } from "../actions";
import Image from "next/image";
import { Button } from "@/app/ui/atoms/buttons";

export default async function ShowMedia(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ confirm: string }>;
}) {
  const params = await props.params;
  const media = await getMedia(parseInt(params.id));
  const isConfirm = (await props.searchParams).confirm === "true";

  if (!media) {
    return <p className="text-red-500">Le media demandé n&apos;existe pas</p>;
  }
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
      {isConfirm && (
        <Button href="/admin/media/add">Ajouter un autre média</Button>
      )}
    </>
  );
}
