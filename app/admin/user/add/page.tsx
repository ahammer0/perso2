import { handleAddUser } from "../actions";

export default function AddPage() {
  return (
    <>
      <form action={handleAddUser} className="flex flex-col text-black">
        <div className="flex flex-col">
          <label htmlFor="name">Nom de l&apos; utilisateur</label>
          <input type="text" name="name" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Mot de passe</label>
          <input type="password" name="password" />
        </div>

        <select name="role">
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>

        <input type="submit" value="Ajouter l'utilisateur" />
      </form>
    </>
  );
}
