"use client";
import { deleteUser } from "../actions";

export default function DeleteButton( {id} : { id: Number } ) {
  console.log(id)
  return (
    <>
      <button onClick={() => deleteUser(id)}>Supprimer</button>
    </>
  );
}
