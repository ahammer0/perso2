"use server";

import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import {redirect} from 'next/navigation'

export async function deleteUser(id: Number) {
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
    prisma.$disconnect;
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
  console.log("rawdata", rawFormData);

  const prisma = new PrismaClient();
  let redirectPath: String | null = null;
  try {
    const user = {
      name: rawFormData.name.toString(),
      email: rawFormData.email.toString(),
      password: await bcrypt.hash(rawFormData.password.toString(), 10),
      role: rawFormData.role,
    };
    const newUser = await prisma.user.create({ data: user });

    console.log("newuser", newUser);

    redirectPath = `/admin/user/${newUser.id}`;
  } catch (e) {
    console.error(e);
    redirectPath = "/admin/user/add";
  } finally {
    prisma.$disconnect;
    revalidatePath("/admin/user");
    redirect(redirectPath);
  }
}

export async function getOneUser(id: Number) {
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
    prisma.$disconnect;
  }
}

export async function editUser(id: Number, userForm: FormData) {
  const prisma = new PrismaClient();
  console.log(id);
  console.log("formdata", userForm);

  const newPassword = userForm.get("password");
  let redirectPath:String|null = null

  try {
    const userData = {
      name: userForm.get("name"),
      email: userForm.get("email"),
      role: userForm.get("role"),
      password:
        newPassword === "" ? undefined : await bcrypt.hash(newPassword, 10),
    };
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: userData,
    });
    console.log(updatedUser)
    redirectPath = "/admin/user"
  } catch (e) {
    console.error(e);
    redirectPath = `/admin/user/${id}/edit`
  } finally {
    redirect(redirectPath)
    prisma.$disconnect;
  }
}
