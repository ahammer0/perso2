import { PrismaClient } from "@prisma/client";

export default async function ShowUser({ params }: { params: { id: String } }) {
  async function fetchUser(id: Number) {
    "use server";
    const prisma = new PrismaClient();
    try {
      const user = await prisma.user.findUnique({
        where: { id: id },
        select:{
          name:true,
          email:true,
          role:true
        }
      });
      return user;
    } catch (e) {
      console.error(e);
    } finally {
      prisma.$disconnect;
    }
  }

  const user = await fetchUser(parseInt(params.id));
  return <>
    <div>
      <p>Nom de l' utilisateur : {user.name}</p>
      <p>Email : {user.email}</p>
      <p>Role : {user.role}</p>
    </div>
  </>
}
