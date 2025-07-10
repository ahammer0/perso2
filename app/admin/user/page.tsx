import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import DeleteButton from "./ui/deleteButton";

export default async function Page() {
  async function fetchUsers() {
    const prisma = new PrismaClient();
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });
      return users;
    } catch (e) {
      console.error(e);
    } finally {
      prisma.$disconnect();
    }
  }
  const users = await fetchUsers();
  if (!users) {
    return (
      <>
        <h2>Page des users</h2>
        <p>Il n&apos;y a pas d&apos;utilisateurs</p>
      </>
    );
  }

  return (
    <>
      <h2>Page des users</h2>
      <Link href="/admin/user/add">Ajouter un utilisateur</Link>
      <table className="border border-collapse">
        <thead>
          <tr>
            <th className="text-left">Nom</th>
            <th className="text-left">Email</th>
            <th className="text-left">Role</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((el, id) => (
            <tr key={`user-${id}`}>
              <td className="border p-2">{el.name}</td>
              <td className="border p-2">{el.email}</td>
              <td className="border p-2">{el.role}</td>
              <td className="border p-1">
                <Link href={`/admin/user/${el.id}`}>Détails</Link>
                <DeleteButton id={el.id} />
                <Link href={`/admin/user/${el.id}/edit`}>Éditer</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
