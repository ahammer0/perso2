import CardsWrapper from "@/app/ui/projects";
import Profile from "@/app/ui/profile";
import SoftSkills from "@/app/ui/softskills";

export default function Home() {
  return (
    <>
      <Profile/>
      <CardsWrapper />
      {/* cv experiences */}
      <SoftSkills/>
    </>
  );
}
