"use client";
import { deleteUser } from "../actions.tsx";

export default function DeleteButton( {id} : { id: Number } ) {
  console.log(id)
  return (
    <>
      <button onClick={() => deleteUser(id)}>Supprimer</button>
    </>
  );
}
