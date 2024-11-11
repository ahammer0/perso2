"use client"
import { deleteProject } from "../actions";
export default function DeleteButton({id}:{id:number}){
  return <>
    <button onClick={()=>deleteProject(id)}>Supprimer</button>
  </>
}
