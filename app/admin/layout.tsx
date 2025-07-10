import Nav from "../ui/organisms/nav";
import isAuth from "./lib/isAuth";
import AdminNavSidebar from "@/app/ui/admin/AdminNavSidebar";

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
          <AdminNavSidebar />
          <div className="p-4 grow">{children}</div>
        </div>
      ) : (
        login
      )}
    </>
  );
}
