"use server";
import { PrismaClient, Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function getProjects() {
  const prisma = new PrismaClient();
  const projects = await prisma.project.findMany({
    include: { picture: true },
  });
  prisma.$disconnect();
  return projects;
}

export async function getProject(id: number) {
  const prisma = new PrismaClient();
  const project = await prisma.project.findUnique({
    where: { id: id },
    include: { picture: true, technosUsed: { include: { picture: true } } },
  });
  prisma.$disconnect();
  return project;
}

export async function addProject(projectForm: FormData) {
  const prisma = new PrismaClient();
  const project = {
    name: projectForm.get("name")?.toString() ?? "",
    picture: {
      connect: {
        id: parseInt(projectForm.get("pictureId")?.toString() ?? ""),
      },
    },
    description: projectForm.get("description")?.toString() ?? "",
    shortDescription: projectForm.get("shortDescription")?.toString() ?? "",
    slug: projectForm.get("slug")?.toString() ?? "",
    url: projectForm.get("url")?.toString() ?? "",
    technosUsed: {
      connect: JSON.parse(projectForm.get("technosUsed")?.toString() ?? "[]"),
    },
    isPublished: projectForm.get("isPublished") === "on",
  };

  const newProject = await prisma.project.create({
    data: project,
  });
  prisma.$disconnect();
  redirect(`/admin/project/${newProject.id}`);
}

export async function editProject(projectForm: FormData) {
  const prisma = new PrismaClient();
  const id = parseInt(projectForm.get("id")?.toString() ?? "");

  if (!id || isNaN(id)) {
    throw new Error("id is not a number");
  }

  const project: Prisma.ProjectUpdateInput = {
    name: projectForm.get("name")?.toString() ?? "",
    picture: {
      connect: {
        id: parseInt(projectForm.get("pictureId")?.toString() ?? ""),
      },
    },
    shortDescription: projectForm.get("shortDescription")?.toString() ?? "",
    description: projectForm.get("description")?.toString() ?? "",
    slug: projectForm.get("slug")?.toString() ?? "",
    url: projectForm.get("url")?.toString() ?? "",
    technosUsed: {
      set: JSON.parse(projectForm.get("technosUsed")?.toString() ?? ""),
    },
    isPublished: projectForm.get("isPublished") === "on",
  };
  const newProject = await prisma.project.update({
    where: { id: id },
    data: project,
  });
  prisma.$disconnect();
  redirect(`/admin/project/${newProject.id}`);
}

export async function deleteProject(id: number) {
  const prisma = new PrismaClient();
  await prisma.project.delete({ where: { id: id } });
  revalidatePath(`/admin/project`);
  prisma.$disconnect();
}
