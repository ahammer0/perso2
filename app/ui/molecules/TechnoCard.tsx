import Link from "next/link";
import Image from "next/image";
import { GetTechno } from "@/types/techno";

export default function TechnoCard({ techno }: { techno: GetTechno }) {
  return (
    <Link href={techno.url} className="w-[40px] relative">
      <Image
        src={`/uploads/${techno.picture.fileName}`}
        alt={techno.picture.alt}
        height={40}
        width={40}
        className="rounded bg-white hover:scale-110 transition-all shadow-md peer"
      />
      <aside className="absolute invisible peer-hover:visible rounded-md shadow-md shadow-slate-800 p-1 px-2 z-40 left-1/2 -translate-x-1/2 top-[calc(100%+10px)] text-nowrap bg-neutral-200 text-black font-normal text-sm">
        {techno.name}
      </aside>
    </Link>
  );
}
