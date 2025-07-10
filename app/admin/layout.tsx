import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="text-white flex flex-row">
        <div className="w-[200px] p-4">
        <ul>
          <li><Link href="/admin/">Admin</Link></li>
          <li><Link href="/admin/project">Projets</Link></li>
          <li><Link href="/admin/techno">Technos</Link></li>
          <li><Link href="/admin/media">Medias</Link></li>
          <li><Link href="/admin/user">Utilisateurs</Link></li>
        </ul>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </>
  );
}
