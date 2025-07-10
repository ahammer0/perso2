"use client";
import { deleteMedia } from "../actions";

export default function DeleteButton({ id }: { id: number }) {
  return (
    <>
      <button onClick={() => deleteMedia(id)}>Supprimer</button>
    </>
  );
}
