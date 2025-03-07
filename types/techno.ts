import { Prisma } from "@prisma/client";
export type GetTechno = Prisma.TechnoGetPayload<{
  include: { picture: true };
}>;
