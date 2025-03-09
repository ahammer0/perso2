import DeleteButton from "@/app/admin/media/ui/deleteButton";
import { GetMedia } from "@/types/media";
import Link from "next/link";
import Image from "next/image";

const MediaCards = ({ medias }: { medias: GetMedia[] }) => {
  return (
    <ul className="flex flex-wrap justify-center gap-4">
      {medias.map((el, id) => (
        <li key={`user-${id}`} className="relative">
          <Image
            src={`/uploads/${el.fileName}`}
            alt={el.alt}
            width="60"
            height="60"
            className="bg-white rounded shadow-md peer hover:scale-110 transition-all hover:outline outline-2 outline-offset-2 outline-indigo-400"
          />
          <div className="border rounded p-1 absolute hidden peer-hover:block z-50 bg-slate-800 hover:block bottom-0 translate-y-full">
            <p className="">{el.alt}</p>
            <hr />
            <p className="">{el.type}</p>
            <hr />
            <Link href={`/admin/media/${el.id}`}>Détails</Link>
            <DeleteButton id={el.id} />
            <Link href={`/admin/media/${el.id}/edit`}>Éditer</Link>
          </div>
        </li>
      ))}
    </ul>
  );
};
export default MediaCards;
