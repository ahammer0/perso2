import Link from "next/link";
import Image from "next/image";
import DeleteButton from "./ui/deleteButton";
import { getTechnos } from "./actions";
import { H2 } from "@/app/ui/atoms/headers";
import { Button } from "@/app/ui/atoms/buttons";

export default async function Page() {
  const technos = await getTechnos();

  return (
    <>
      <H2>Page des technos</H2>
      <Button href="/admin/techno/add">Ajouter une techno</Button>
      <table className="border border-collapse">
        <thead>
          <tr>
            <th className="text-left">Nom</th>
            <th className="text-left">Image</th>
            <th className="text-left">Visible ?</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {technos.map((el, id) => (
            <tr key={`user-${id}`}>
              <td className="border p-2">{el.name}</td>
              <td className="border p-2">
                <Image
                  src={`/uploads/${el.picture.fileName}`}
                  alt={el.picture.alt}
                  height="60"
                  width="60"
                />
              </td>
              <td className="border p-2">{el.isPublished ? "oui" : "non"}</td>
              <td className="border p-2 p-1">
                <Link href={`/admin/techno/${el.id}`}>Détails</Link>
                <DeleteButton id={el.id} />
                <Link href={`/admin/techno/${el.id}/edit`}>Éditer</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
