import { getProjects } from "./actions";
import Link from "next/link";
import Image from "next/image";
import DeleteButton from "./ui/deleteButton";
import { H2 } from "@/app/ui/atoms/headers";
import { Button } from "@/app/ui/atoms/buttons";

export default async function Page() {
  const projects = await getProjects();

  return (
    <>
      <H2>Page des projets</H2>
      <Button href="/admin/project/add">Ajouter un projet</Button>

      <table className="border border-collapse">
        <thead>
          <tr>
            <th className="text-left">Nom</th>
            <th className="text-left">Image</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((el, id) => (
            <tr key={`user-${id}`}>
              <td className="border p-2">{el.name}</td>
              <td className="border p-2">
                <Image
                  src={`/uploads/${el.picture.fileName}`}
                  alt={el.picture.alt}
                  width="60"
                  height="60"
                />
              </td>
              <td className="border p-2 p-1">
                <Link href={`/admin/project/${el.id}`}>Détails</Link>
                <DeleteButton id={el.id} />
                <Link href={`/admin/project/${el.id}/edit`}>Éditer</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
