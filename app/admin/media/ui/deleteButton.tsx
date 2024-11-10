"use client"
import {deleteMedia} from '../actions.tsx'

export default function DeleteButton({id}:{id:Number}){
  return <>
    <button onClick={()=>deleteMedia(id)}>Supprimer</button>
  </>
}
