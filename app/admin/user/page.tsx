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
      prisma.$disconnect;
    }
  }
  const users = await fetchUsers();

  return (
    <>
      <h2>Page des users</h2>
      <Link href="/admin/user/add">Ajouter un utilisateur</Link>
      <table className="border border-collapse">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((el, id) => (
            <tr key={`user-${id}`}>
              <td className="border p-2">{el.name}</td>
              <td className="border p-2">{el.email}</td>
              <td className="border p-2">{el.role}</td>
              <td className="border p-2">
                <Link href={`/admin/user/${el.id}`}>Détails</Link>
                <DeleteButton id={el.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
