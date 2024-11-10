"use server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function getTechno(id: Number) {
  const prisma = new PrismaClient();
  const techno = await prisma.techno.findUnique({
    where: { id: id },
    include: { picture: true },
  });
  prisma.$disconnect;
  return techno;
}

export async function getTechnos() {
  const prisma = new PrismaClient();
  const technos = await prisma.techno.findMany({
    include: { picture: true },
  });
  prisma.$disconnect;
  return technos;
}

export async function addTechno(technoForm: FormData) {
  const prisma = new PrismaClient();
  const newTechno = await prisma.techno.create({
    data: {
      name: technoForm.get("name"),
      picture: {
        connect: { id: parseInt(technoForm.get("pictureId")) },
      },
      url: technoForm.get("url"),
      isPublished: technoForm.get("isPublished") === "on",
    },
  });
  redirect(`/admin/techno/${newTechno.id}`);
  prisma.$disconnect;
}

export async function editTechno(id: Number, technoForm: FormData) {
  const prisma = new PrismaClient();
  await prisma.techno.update({
    where: { id: id },
    data: {
      name: technoForm.get("name"),
      picture: {
        connect: { id: parseInt(technoForm.get("pictureId")) },
      },
      url: technoForm.get("url"),
      isPublished: technoForm.get("isPublished") === "on",
    },
  });
  redirect(`/admin/techno/${id}`);
  prisma.$disconnect;
}

export async function deleteTechno(id: Number) {
  const prisma = new PrismaClient();
  await prisma.techno.delete({ where: { id: id } });
  prisma.$disconnect;
}
