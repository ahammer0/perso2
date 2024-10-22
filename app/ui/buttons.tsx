import Link from "next/link";
import { twMerge } from "tailwind-merge";

export function Button({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href:string;
}) {
  return (
    <Link
      className={twMerge(
        "bg-indigo-500 text-white p-2 px-4 rounded-md m-2 hover:text-slate-800 hover:shadow-inner shadow-slate-700 shadow transition-all",
        className
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
export function ButtonOutline({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href:string;
}) {
  return (
    <Link
      className={twMerge(
        "bg-transparent border-zinc-700 border-2 border text-white p-2 px-4 rounded-md m-2 transition-all",
        className
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
