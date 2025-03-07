import React from "react";
import Image from "next/image";
import { Button } from "../atoms/buttons";
import { ButtonOutline } from "../atoms/buttons";

const Profile = () => {
  return (
    <section className="container mx-auto flex flex-col md:flex-row-reverse items-center text-white p-4 md:p-8 min-h-[calc(100svh-30rem)]">
      <Image
        src="/assets/images/stylized_profile.webp"
        alt="profile picture"
        className="w-40 lg:w-[500px] md:w-[300px] md:aspect-square rounded-full object-cover mx-auto mt-8 mb-16 p-4"
        height={500}
        width={500}
      />
      <div className="text-left space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold">
          Crafting responsive and dynamic web applications
        </h1>
        <p className="text-lg">
          As a web developer, I specialize in creating fast, modern, and
          responsive websites and applications using the latest technologies
          like React, Next.js, and TailwindCSS.
        </p>
        <div className="flex space-x-4">
          <ButtonOutline href="#projects">View my projects</ButtonOutline>
          <Button href="#">More about me</Button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
