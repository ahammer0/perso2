"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    text: "Admin",
    href: "/admin/",
  },
  {
    text: "Projets",
    href: "/admin/project",
  },
  {
    text: "Technos",
    href: "/admin/techno",
  },
  {
    text: "Medias",
    href: "/admin/media",
  },
  {
    text: "Utilisateurs",
    href: "/admin/user",
  },
];

const AdminNavSidebar = () => {
  const pathname = usePathname();
  return (
    <div className=" p-4">
      <ul>
        {links.map((el) => (
          <li
            className={
              pathname.startsWith(el.href)
                ? "px-1 py-2 font-bold border rounded border-purple"
                : "px-1 py-2"
            }
            key={el.href}
          >
            <Link href={el.href}>{el.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminNavSidebar;
