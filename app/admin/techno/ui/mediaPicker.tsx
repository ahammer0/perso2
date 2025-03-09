"use client";
import { useState } from "react";
import Image from "next/image";
import { Prisma } from "@prisma/client";

export default function MediaPicker({
  medias,
  name,
  defaultValue = 0,
}: {
  name: string;
  medias: Prisma.MediaGetPayload<{}>[];
  defaultValue?: number;
}) {
  const [selectedImg, setSelectedImg] = useState(defaultValue);

  return (
    <>
      <div className="flex flex-row gap-2 m-2">
        {medias.map((el) => (
          <Image
            src={`/uploads/${el.fileName}`}
            alt={el.alt}
            height="100"
            width="100"
            className={`hover:cursor-pointer outline-offset-2 outline-2 outline-purple ${selectedImg === el.id ? "outline" : ""}`}
            onClick={() => setSelectedImg(el.id)}
            key={el.id}
          />
        ))}
      </div>
      <input type="hidden" value={selectedImg} name={name} readOnly />
    </>
  );
}
