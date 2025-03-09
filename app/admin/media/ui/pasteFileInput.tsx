"use client";

import { useRef } from "react";
import { useState } from "react";
import Image from "next/image";

export default function ImageInput({
  name,
  defaultPicture = null,
}: {
  name: string;
  defaultPicture?: string | null;
}) {
  const imageRef = useRef(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState(
    defaultPicture ? `/uploads/${defaultPicture}` : "",
  );

  function handlePaste(e: any) {
    const items: DataTransferItemList = e.clipboardData.items;
    if (items[0].type.startsWith("image")) {
      const file = items[0].getAsFile();
      if (file !== null) {
        const reader = new FileReader();
        reader.onloadend = (ev) => {
          const result = ev.target?.result ?? null;
          if (result !== null) {
            setImage(result.toString());
          }
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          if (fileInputRef.current !== null) {
            fileInputRef.current.files = dataTransfer.files;
          }
        };
        reader.readAsDataURL(file);
      }
    }
    rmovePasteListener();
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image")) {
      setImage(URL.createObjectURL(file));
    }
    // setImage(e.target.value);
  }
  function addPasteListener() {
    window.addEventListener("paste", handlePaste);
  }
  function rmovePasteListener() {
    window.removeEventListener("paste", handlePaste);
  }

  return (
    <div className="grid grid-cols-2">
      <label
        className="cursor-pointer m-2 text-black rounded outline-4 outline-dashed outline-gray-400 hover:outline-gray-500 bg-neutral-300 flex flex-col justify-center items-center"
        onMouseEnter={addPasteListener}
        onMouseLeave={rmovePasteListener}
      >
        Choisir... <br />
        ou coller (Ctrl+v)
        <input
          className="absolute invisible"
          type="file"
          name={name}
          accept="image/*"
          onChange={handleChange}
          ref={fileInputRef}
        />
      </label>
      {image ? (
        <Image
          src={image}
          alt="image du media"
          height={100}
          width={100}
          ref={imageRef}
          className="object-contain w-auto h-[200px]"
        />
      ) : (
        <div className="h-[200px] w-[100px]">Aucun fichier selectionné</div>
      )}
    </div>
  );
}
