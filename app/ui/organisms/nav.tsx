import Link from "next/link";
import Image from "next/image";
import logo from "@/public/assets/dev.png";
import React from "react";
import { Button } from "../atoms/buttons";
import { ButtonOutline } from "../atoms/buttons";
import isAuth from "@/app/admin/lib/isAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import logoutAction from "@/app/admin/lib/logoutAction";

const navLinksData = [
  {
    name: "Projects",
    href: "#projects",
  },
  {
    name: "Contact",
    href: "#contact",
    isEm: true,
  },
];

export default async function Nav() {
  const isLogged = await isAuth();
  return (
    <div className="px-2 h-20 text-xl w-full sticky">
      <nav className="md:w-4/5 flex items-center justify-between mx-auto h-full">
        <Logo />
        <div className="md:flex gap-2">
          <NavLink href="https://github.com/ahammer0">Github</NavLink>
        </div>
        <NavLinks />
        {isLogged && (
          <Button
            type="button"
            className="h-10 w-10 p-0"
            onClick={logoutAction}
          >
            <FontAwesomeIcon icon={faRightToBracket} />
          </Button>
        )}
      </nav>
    </div>
  );
}

function Logo() {
  return (
    <Link className="flex items-center justify-center" href="/">
      <Image className="" src={logo} height="50" width="50" alt="balise html" />
      <h1 className="text-white mx-4">Axel Schwindenhammer</h1>
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
    <Link className="text-zinc-300 px-2" href={href}>
      {children}
    </Link>
  );
}
