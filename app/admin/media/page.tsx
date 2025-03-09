import { getMedias } from "./actions";
import Link from "next/link";
import Image from "next/image";
import DeleteButton from "./ui/deleteButton";
import { H2 } from "@/app/ui/atoms/headers";
import { Button } from "@/app/ui/atoms/buttons";
import MediaCards from "@/app/ui/molecules/MediaCards";

export default async function Page() {
  const medias = await getMedias();
  return (
    <>
      <H2>Page des medias</H2>
      <Button href="/admin/media/add">Ajouter un média</Button>

      <MediaCards medias={medias} />
    </>
  );
}
