import CardsWrapper from "@/app/ui/organisms/projects";
import Profile from "@/app/ui/organisms/profile";
import SoftSkills from "@/app/ui/organisms/softskills";
import Nav from "@/app/ui/organisms/nav";
import ContactForm from "./ui/organisms/ContactForm";
import WavySeparator from "./ui/atoms/WavySeparator";

export default function Home() {
  return (
    <div>
      <div className="relative bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gray-700 to-neutral-900 min-h-screen text-white flex flex-col">
        <Nav />
        <Profile />
        <div className="p-4">
          <CardsWrapper />
        </div>
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
    </div>
  );
}
