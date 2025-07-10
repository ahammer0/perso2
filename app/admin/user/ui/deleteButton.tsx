"use client";
import { deleteUser } from "../actions";

export default function DeleteButton({ id }: { id: number }) {
  return (
    <>
      <button onClick={() => deleteUser(id)}>Supprimer</button>
    </>
  );
}
