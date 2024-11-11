"use client";

import { useRef } from "react";
import { useState } from "react";
import Image from "next/image";
export default function PasteFileInput({
  name,
  defaultPicture = null,
}: {
  name: string;
  defaultPicture?: string | null;
}) {
  const imageRef = useRef(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image,setImage] = useState(`/uploads/${defaultPicture}`)

  function handlePaste(e: any) {
    const items: DataTransferItemList = e.clipboardData.items;
    if (items[0].type.startsWith("image")) {
      const file = items[0].getAsFile()
      if(file!==null){
      const reader = new FileReader()
      reader.onloadend = (ev)=>{
        const result = ev.target?.result??null
        if(result!==null){
          setImage(result.toString())
        }
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(file)
        if(fileInputRef.current!==null){
          fileInputRef.current.files = dataTransfer.files
        }
      }
      reader.readAsDataURL(file)
      }
    }
  }

  return (
    <>
      <Image
        src={image}
        alt="image du media"
        height={100}
        width={100}
        ref={imageRef}
      />
      <input type="file" name={name} ref={fileInputRef} />
      <input
        type="text"
        value="coller ici \n (ctrl+v)"
        onPaste={handlePaste}
        className="h-16 w-16"
        onChange={() => {}}
      />
    </>
  );
}
