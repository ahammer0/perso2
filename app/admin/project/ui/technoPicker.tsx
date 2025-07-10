"use client";
import { Prisma } from "@prisma/client";
import { useState } from "react";
import Image from "next/image";

export default function TechnoPicker({
  technos,
  defaultValue = "[]",
  name,
}: {
  technos: Prisma.TechnoGetPayload<{ include: { picture: true } }>[];
  defaultValue?: string;
  name: string;
}) {
  const [selected, setSelected] = useState<{ id: number }[]>(
    JSON.parse(defaultValue)
  );
  function toggleSelected(id: number) {
    const elid = selected.findIndex((el) => el.id === id);
    if (elid < 0) {
      setSelected([...selected, { id: id }]);
    } else {
      setSelected(selected.filter((el) => el.id !== id));
    }
  }

  function isSelected(id: number) {
    return -1 !== selected.findIndex((e) => e.id === id);
  }

  return (
    <>
      <div className="flex flex-row gap-2 m-2">
        {technos.map((el, id) => (
          <div key={`${id}-${el.name}`}>
            <Image
              src={`/uploads/${el.picture.fileName}`}
              alt={el.picture.alt}
              height={100}
              width={100}
              onClick={() => toggleSelected(el.id)}
              className={`hover:cursor-pointer outline-offset-2 outline-2 outline-purple ${isSelected(el.id) ? "outline" : ""}`}
            />
            <p className="text-center">{el.name}</p>
          </div>
        ))}
      </div>
      <input
        type="hidden"
        name={name}
        value={JSON.stringify(selected)}
        readOnly
      />
    </>
  );
}
