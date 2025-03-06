import Link from "next/link";
import Image from "next/image";
import logo from "@/public/assets/dev.png";
import React from "react";
import { Button } from "./buttons";
import { ButtonOutline } from "./buttons";

const navLinksData = [
  {
    name: "Projets",
    href: "/",
  },
  {
    name: "Contact",
    href: "/",
    isEm: true,
  },
];

export default function Nav() {
  return (
    <div className="h-20 text-xl w-full sticky">
      <nav className="w-4/5 flex items-center justify-between mx-auto h-full">
        <Logo />
        <div>
          <NavLink href="#">Github</NavLink>
          <span className="hidden md:block">
            <NavLink href="/admin">Admin</NavLink>
          </span>
        </div>
        <NavLinks />
      </nav>
    </div>
  );
}

function Logo() {
  return (
    <Link className="m-4 flex items-center justify-center" href="/">
      <Image
        className="m-2"
        src={logo}
        height="50"
        width="50"
        alt="balise html"
      />
      <h1 className="m-4 text-white">Axel Schwindenhammer</h1>
    </Link>
  );
}

function NavLinks() {
  return (
    <div className="flex-row items-center hidden md:flex">
      {navLinksData.map((el: any, id: any): any =>
        el.isEm ? (
          <Button href={el.href} key={id}>
            {el.name}
          </Button>
        ) : (
          <ButtonOutline href={el.href} key={id}>
            {el.name}
          </ButtonOutline>
        ),
      )}
    </div>
  );
}

function NavLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link className="text-zinc-500 m-2" href={href}>
      {children}
    </Link>
  );
}
