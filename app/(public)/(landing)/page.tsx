import CardsWrapper from "@/app/ui/organisms/projects";
import Profile from "@/app/ui/organisms/profile";
import SoftSkills from "@/app/ui/organisms/softskills";
import Nav from "@/app/ui/organisms/nav";
import ContactForm from "@/app/ui/organisms/ContactForm";
import WavySeparator from "@/app/ui/atoms/WavySeparator";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import Footer from "@/app/ui/organisms/footer";

export default async function Home() {
  async function fetchLastProjects() {
    const prisma = new PrismaClient();
    let projects = null;
    try {
      projects = await prisma.project.findMany({
        orderBy: [{ id: "desc" }],
        take: 3,
        where: { isPublished: true },
        include: {
          picture: true,
          technosUsed: { include: { picture: true } },
        },
      });
    } catch (e) {
      console.error(e);
    } finally {
      prisma.$disconnect();
      return projects;
    }
  }

  const projects = await fetchLastProjects();
  if (projects === null) {
    return;
  }
  return (
    <div>
      <div className="relative bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gray-700 to-neutral-900 min-h-screen text-white flex flex-col">
        <Nav />
        <Profile />
        <div className="p-4">
          <CardsWrapper projects={projects} />
        </div>
        <Link
          href="/projects"
          className="text-center text-3xl font-bold mb-4 underline"
        >
          See all projects
        </Link>
      </div>
      <WavySeparator from="bg-neutral-900" to="bg-neutral-300" />
      <div className="bg-neutral-300">
        <div className="mx-auto max-w-[700px]">
          <SoftSkills />
        </div>
      </div>
      <WavySeparator from="bg-neutral-300" to="bg-neutral-900" reversed />
      <div className="mx-auto max-w-[700px]">
        <ContactForm />
      </div>
      <WavySeparator from="bg-neutral-900" to="bg-gray-700" reversed />
      <Footer />
    </div>
  );
}
