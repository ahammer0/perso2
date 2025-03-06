import React from "react";
import Image from "next/image";
import { Button } from "./buttons";
import { ButtonOutline } from "./buttons";

const Profile = () => {
  return (
    <section className="container flex flex-col text-white p-4 min-h-[calc(100svh-5rem)]">
      <Image
        src="/assets/images/stylized_profile.webp"
        alt="profile picture"
        className="w-40 md:w-[500px] md:aspect-square rounded-full object-cover mx-auto mt-8 mb-16"
        height={500}
        width={500}
      />
      <div className="md:w-1/2 text-left space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold">
          Crafting responsive and dynamic web applications
        </h1>
        <p className="text-lg">
          As a web developer, I specialize in creating fast, modern, and
          responsive websites and applications using the latest technologies
          like React, Next.js, and TailwindCSS.
        </p>
        <div className="flex space-x-4">
          <ButtonOutline href="#">View my projects</ButtonOutline>
          <Button href="#">Learn more about me</Button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
