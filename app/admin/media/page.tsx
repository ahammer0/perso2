import { getMedias } from "./actions.tsx";
import Link from "next/link";
import Image from "next/image";
export default async function Page() {
  const medias = await getMedias();
  return (
    <>
      <h2>Page des medias</h2>
      <Link href="/admin/media/add">Ajouter un média</Link>

      <table className="border border-collapse">
        <thead>
          <tr>
            <th className="text-left">Id</th>
            <th className="text-left">Image</th>
            <th className="text-left">Description</th>
            <th className="text-left">Type</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {medias.map((el, id) => (
            <tr key={`user-${id}`}>
              <td className="border p-2">{el.id}</td>
              <td className="border p-2">
                <Image
                  src={`/uploads/${el.fileName}`}
                  alt={el.alt}
                  width="60"
                  height="60"
                />
              </td>
              <td className="border p-2">{el.alt}</td>
              <td className="border p-2">{el.type}</td>
              <td className="border p-2 p-1">
                <Link href={`/admin/media/${el.id}`}>Détails</Link>
                <Link href={`/admin/media/${el.id}/edit`}>Éditer</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
