import { getOneUser } from "../actions";
import Link from "next/link";

export default async function ShowUser(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;

  const user = await getOneUser(parseInt(params.id));
  if (!user) throw new Error("User not found");
  return (
    <>
      <div>
        <p>Nom de l&apos; utilisateur : {user.name}</p>
        <p>Email : {user.email}</p>
        <p>Role : {user.role}</p>
      </div>
      <Link href={`/admin/user/${params.id}/edit`}>Éditer</Link>
    </>
  );
}
