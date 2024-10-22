import { NewProjectForm } from "@/app/ui/admin/projectForm";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Link href="/">Accueil</Link>
      <h1>formulaire d' ajout de cartes</h1>
      <NewProjectForm />
    </>
  );
}
