"use server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function getTechno(id: number) {
  const prisma = new PrismaClient();
  const techno = await prisma.techno.findUnique({
    where: { id: id },
    include: { picture: true },
  });
  prisma.$disconnect();
  return techno;
}

export async function getTechnos() {
  const prisma = new PrismaClient();
  const technos = await prisma.techno.findMany({
    include: { picture: true },
  });
  prisma.$disconnect();
  return technos;
}

export async function addTechno(technoForm: FormData) {
  const prisma = new PrismaClient();

  const name = technoForm.get("name");
  if (!name || typeof name !== "string")
    throw new Error("Techno name is required");
  const pictureId = technoForm.get("pictureId");
  if (!pictureId || typeof pictureId !== "string")
    throw new Error("Picture id is required");
  const url = technoForm.get("url");
  if (!url || typeof url !== "string") throw new Error("Url is required");

  const newTechno = await prisma.techno.create({
    data: {
      name: name,
      picture: {
        connect: { id: parseInt(pictureId) },
      },
      url: url,
      isPublished: technoForm.get("isPublished") === "on",
    },
  });
  prisma.$disconnect();
  redirect(`/admin/techno/${newTechno.id}`);
}

export async function editTechno(id: number, technoForm: FormData) {
  const prisma = new PrismaClient();

  const name = technoForm.get("name");
  if (!name || typeof name !== "string")
    throw new Error("Techno name is required");
  const pictureId = technoForm.get("pictureId");
  if (!pictureId || typeof pictureId !== "string")
    throw new Error("Picture id is required");
  const url = technoForm.get("url");
  if (!url || typeof url !== "string") throw new Error("Url is required");

  await prisma.techno.update({
    where: { id: id },
    data: {
      name: name,
      picture: {
        connect: { id: parseInt(pictureId) },
      },
      url: url,
      isPublished: technoForm.get("isPublished") === "on",
    },
  });
  prisma.$disconnect();
  redirect(`/admin/techno/${id}`);
}

export async function deleteTechno(id: number) {
  const prisma = new PrismaClient();
  await prisma.techno.delete({ where: { id: id } });
  revalidatePath("/admin/techno");
  prisma.$disconnect();
}
