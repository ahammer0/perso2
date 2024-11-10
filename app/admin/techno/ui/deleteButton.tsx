"use client"
import {deletetechno} from '../actions.tsx'

export default function DeleteButton(id:Number){
  return <>
    <button onClick={()=>deleteTechno(id)}>Supprimer</button>
  </>
}
