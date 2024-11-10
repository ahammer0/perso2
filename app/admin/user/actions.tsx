"use server"
import { PrismaClient } from "@prisma/client";
import {revalidatePath} from 'next/cache'
export async function deleteUser(id: Number) {
  const prisma = new PrismaClient();
  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
    revalidatePath('/admin/user')
  } catch (e) {
    console.error(e);
  } finally {
    prisma.$disconnect;
  }
}
