import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

export function NewProjectForm() {
  async function create(formData: FormData) {
    "use server";
    //connection à la db
    const prisma = new PrismaClient();

    const newProject = {
      title: formData.get("projectName"),
    };
    console.log(newProject);
    //on le teste
    try {
      const project = await prisma.project.create({
        data: {
          title: formData.get("projectName")?.toString() || "",
        },
      });
      console.log("log du projet enregistré", project);
    } catch (e) {
      console.error(e);
    } finally {
      await prisma.$disconnect();
    }

    //on le persiste
    revalidatePath("/");
    redirect("/");
  }
  return (
    <form action={create}>
      <label htmlFor="projectName">Nom du projet</label>
      <input type="text" name="projectName" />
      <input type="submit" />
    </form>
  );
}
