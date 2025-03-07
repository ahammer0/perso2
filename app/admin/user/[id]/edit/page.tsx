import { PrismaClient } from "@prisma/client";
import { getOneUser, editUser } from "../../actions.tsx";
export default async function EditUser(props: { params: Promise<{ id: String }> }) {
  const params = await props.params;
  const userId = parseInt(params.id);
  const user = await getOneUser(userId);

  return (
    <>
      <form
        action={editUser.bind(null, userId)}
        className="flex flex-col text-black"
      >
        <div className="flex flex-col">
          <label htmlFor="name">Nom de l' utilisateur</label>
          <input type="text" name="name" defaultValue={user.name} />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" defaultValue={user.email} />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            defaultValue=""
            placeholder="*********"
          />
        </div>

        <select name="role" defaultValue={user.role}>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>

        <input type="submit" value="Modifier l'utilisateur" />
      </form>
    </>
  );
}
