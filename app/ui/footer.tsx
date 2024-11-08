import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-1 h-[30vh] bg-transparent">
      <h1 className="my-4 md:text-5xl text-3xl font-bold text-center text-white">
        Super Footer
      </h1>
      {/* contenu du footer */}
      <div className="container m-auto flex flex-row align-center justify-center">
        <div className="flex flex-col justify-center text-white m-4">
          <div>
            <Link href="">LinkedIn</Link>
          </div>
          <div>
            <Link href="">GitHub</Link>
          </div>
          <div>
            <Link href="">Ipsum earum distinctio</Link>
          </div>
        </div>
        <div className="flex-col justify-center text-white m-4">
          <div>
            <Link href="/login">Login</Link>
          </div>
          <div>
            <Link href="/register">register</Link>
          </div>
          <div></div>
        </div>
      </div>
    </footer>
  );
}
