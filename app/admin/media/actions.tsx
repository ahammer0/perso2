"use server";
import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import sharp from "sharp";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Media } from "@prisma/client";

const uploadsDirPath = process.cwd() + "/public/uploads/";

export async function getMedias() {
  const prisma = new PrismaClient();
  let medias: Media[] = [];
  try {
    medias = await prisma.media.findMany({});
  } catch (e) {
    console.error(e);
  } finally {
    prisma.$disconnect();
    return medias;
  }
}

export async function getMedia(id: number) {
  const prisma = new PrismaClient();
  let media = null;
  try {
    media = await prisma.media.findUnique({ where: { id: id } });
  } catch (e) {
    console.error(e);
  } finally {
    prisma.$disconnect();
    return media;
  }
}

export async function addMedia(mediaForm: FormData) {
  const file = mediaForm.get("file");
  //check file type
  if (!(file instanceof File)) {
    throw new Error("no file provided");
  }
  if (!file.type.startsWith("image")) {
    throw new Error("wrong filetype");
  }
  //convert to buffer
  const arrayBuffer = await file.arrayBuffer();
  let buffer = Buffer.from(arrayBuffer);
  //convert to webp and resize
  buffer = await sharp(buffer)
    .resize({
      height: 200,
      width: 200,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .webp()
    .toBuffer();

  //generate filename
  const fileName = Date.now().toString() + ".webp";
  //write to fs
  await fs.writeFile(uploadsDirPath + fileName, buffer);
  //add db entry
  const prisma = new PrismaClient();

  const alt = mediaForm.get("alt");
  if (typeof alt !== "string") throw new Error("no alt provided");

  const type = mediaForm.get("type");
  if (type != "picture" && type != "icon" && type != "profile")
    throw new Error(
      "no type provided, or provided wrong type. Should be picture, icon or profile",
    );

  const newMedia = await prisma.media.create({
    data: {
      fileName: fileName,
      alt: alt,
      type: type,
    },
  });

  prisma.$disconnect();
  redirect(`/admin/media/${newMedia.id}?confirm=true`);
}

export async function deleteMedia(id: number) {
  const prisma = new PrismaClient();

  const media = await prisma.media.findUnique({
    where: { id: id },
    select: { fileName: true },
  });
  if (!media) {
    prisma.$disconnect();
    return;
  }
  await prisma.media.delete({ where: { id: id } });
  await fs.unlink(uploadsDirPath + media.fileName);
  revalidatePath("/admin/media");
  prisma.$disconnect();
}

export async function editMedia(id: number, mediaForm: FormData) {
  const prisma = new PrismaClient();
  const alt = mediaForm.get("alt");
  if (typeof alt !== "string") throw new Error("no alt provided");

  const type = mediaForm.get("type");
  if (type != "picture" && type != "icon" && type != "profile")
    throw new Error(
      "no type provided, or provided wrong type. Should be picture, icon or profile",
    );

  await prisma.media.update({
    where: { id: id },
    data: {
      alt: alt,
      type: type,
    },
  });
  redirect(`/admin/media/${id}`);
}
