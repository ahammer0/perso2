import Link from "next/link";
import Nav from "../ui/organisms/nav";
import isAuth from "./lib/isAuth";

export default async function AdminLayout({
  children,
  login,
}: {
  children: React.ReactNode;
  login: React.ReactNode;
}) {
  const isLogged = await isAuth();
  return (
    <>
      <Nav />

      {isLogged ? (
        <div className="text-white flex flex-row">
          <div className=" p-4">
            <ul>
              <li className="py-2">
                <Link href="/admin/">Admin</Link>
              </li>
              <li className="py-2">
                <Link href="/admin/project">Projets</Link>
              </li>
              <li className="py-2">
                <Link href="/admin/techno">Technos</Link>
              </li>
              <li className="py-2">
                <Link href="/admin/media">Medias</Link>
              </li>
              <li className="py-2">
                <Link href="/admin/user">Utilisateurs</Link>
              </li>
            </ul>
          </div>
          <div className="p-4 grow">{children}</div>
        </div>
      ) : (
        login
      )}
    </>
  );
}
