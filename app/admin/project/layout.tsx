import Link from "next/link";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        <Link href="/admin/project/add">Ajouter un Projet</Link>
      </div>
      {children}
    </>
  );
}
