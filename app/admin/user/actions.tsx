"use server";

import bcrypt from "bcryptjs";
import { PrismaClient, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteUser(id: number) {
  const prisma = new PrismaClient();
  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/admin/user");
  } catch (e) {
    console.error(e);
  } finally {
    prisma.$disconnect();
  }
}
export async function handleAddUser(formData: FormData) {
  "use server";
  const rawFormData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  };
  if (
    !rawFormData.name ||
    !rawFormData.email ||
    !rawFormData.password ||
    !rawFormData.role
  )
    throw new Error("All fields are required");
  if (rawFormData.role !== "user" && rawFormData.role !== "admin")
    throw new Error("Role must be user or admin");

  const prisma = new PrismaClient();
  let redirectPath: string = "/admin/user";
  try {
    const user: Prisma.UserCreateInput = {
      name: rawFormData.name.toString(),
      email: rawFormData.email.toString(),
      password: await bcrypt.hash(rawFormData.password.toString(), 10),
      role: rawFormData.role,
    };
    const newUser = await prisma.user.create({ data: user });

    redirectPath = `/admin/user/${newUser.id}`;
  } catch (e) {
    console.error(e);
    redirectPath = "/admin/user/add";
  } finally {
    prisma.$disconnect();
    revalidatePath("/admin/user");
    redirect(redirectPath);
  }
}

export async function getOneUser(id: number) {
  const prisma = new PrismaClient();
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: {
        name: true,
        email: true,
        role: true,
      },
    });
    return user;
  } catch (e) {
    console.error(e);
  } finally {
    prisma.$disconnect();
  }
}

export async function editUser(id: number, userForm: FormData) {
  const prisma = new PrismaClient();

  let redirectPath = "/admin/user";

  const rawFormData = {
    name: userForm.get("name"),
    email: userForm.get("email"),
    password: userForm.get("password"),
    role: userForm.get("role"),
  };

  if (
    !rawFormData.name ||
    !rawFormData.email ||
    !rawFormData.password ||
    !rawFormData.role
  )
    throw new Error("All fields are required");
  if (typeof rawFormData.name !== "string")
    throw new Error("Name must be string");
  if (typeof rawFormData.email !== "string")
    throw new Error("Email must be string");
  if (rawFormData.role !== "user" && rawFormData.role !== "admin")
    throw new Error("Role must be user or admin");
  if (typeof rawFormData.password !== "string")
    throw new Error("Password must be string");

  try {
    const userData: Prisma.UserUpdateInput = {
      name: rawFormData.name,
      email: rawFormData.email,
      role: rawFormData.role,
      password:
        rawFormData.password === ""
          ? undefined
          : await bcrypt.hash(rawFormData.password, 10),
    };
    await prisma.user.update({
      where: { id: id },
      data: userData,
    });
    redirectPath = "/admin/user";
  } catch (e) {
    console.error(e);
    redirectPath = `/admin/user/${id}/edit`;
  } finally {
    prisma.$disconnect();
    redirect(redirectPath);
  }
}
