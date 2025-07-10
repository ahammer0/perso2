"use client"
import { deleteTechno } from "../actions"

export default function DeleteButton({id}:{id:number}){
  return <>
    <button onClick={()=>deleteTechno(id)}>Supprimer</button>
  </>
}
