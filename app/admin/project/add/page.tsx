import { PrismaClient } from "@prisma/client";

export default function addForm() {
  async function createProject(formData: FormData) {
    "use server";

    const rawFormData = {
      name: formData.get("name"),
      pictureId: formData.get("pictureId"),
      description: formData.get("description"),
      url: formData.get("url"),
      technosUsed: formData.get("technosUsed"),
      isPublished: formData.get("isPublished"),
    };

    console.log(rawFormData);

    const prisma = new PrismaClient();
    try {
      //build technos array
      const technos = JSON.parse(rawFormData.technosUsed).map((el) => {
        return { id: parseInt(el) };
      });
      //persisit new project in database
      const project = await prisma.project.create({
        data: {
          name: rawFormData.name,
          picture: rawFormData.pictureId!==''?{
            connect:{id:parseInt(rawFormData.pitcureId)}
          }:null,
          description: rawFormData.description.toString(),
          url: rawFormData.url.toString(),
          technosUsed: {
            connect: technos,
          },
          isPublished: rawFormData.isPublished==='on',
        },
      });
      console.log('nouveau projet',project)
    } catch (e) {
      console.error("createProject server action");
      console.error(e);
    } finally {
      await prisma.$disconnect;
    }
  }

  return (
    <>
      <form action={createProject} className="flex flex-col text-black">
        <div className="flex flex-col">
          <label htmlFor="name">Nom du projet</label>
          <input type="text" name="name" required/>
        </div>

        <div className="flex flex-col">
          {/* TODO remplir ce champ avec l'id de l' image choisie */}
          <label htmlFor="pictureId">Id de l' image</label>
          <input type="text" name="pictureId" value="" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description">Description du projet</label>
          <textarea name="description" cols="30" rows="10" required></textarea>
        </div>

        <div className="flex flex-col">
          <label htmlFor="url">Url du projet</label>
          <input type="url" name="url" />
        </div>

        <div className="flex flex-col">
          {/* TODO remplir ce champ avec un tableau */}
          <label htmlFor="technosUsed">Technos utilisées</label>
          <input type="text" name="technosUsed" value="[]" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="isPublished">Visible au public</label>
          <input type="checkbox" name="isPublished" />
        </div>
        <button type="submit">Ajouter le projet</button>
      </form>
    </>
  );
}
