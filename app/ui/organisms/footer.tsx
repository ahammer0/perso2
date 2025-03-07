import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-4  bg-transparent bg-gray-700">
      {/* contenu du footer */}
      <div className=" mx-auto flex flex-row align-center justify-center text-white gap-2 underline">
        <Link href="www.linkedin.com/in/axel-schwindenhammer-1568a2300">
          LinkedIn
        </Link>
        <Link href="https://github.com/ahammer0">GitHub</Link>
      </div>
    </footer>
  );
}
