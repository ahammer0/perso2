import { PrismaClient } from "@prisma/client";
import {getOneUser} from '../actions.tsx'
import Link from 'next/link'

export default async function ShowUser({ params }: { params: { id: String } }) {

  const user = await getOneUser(parseInt(params.id));
  return <>
    <div>
      <p>Nom de l' utilisateur : {user.name}</p>
      <p>Email : {user.email}</p>
      <p>Role : {user.role}</p>
    </div>
    <Link href={`/admin/user/${params.id}/edit`}>Éditer</Link>
  </>
}
