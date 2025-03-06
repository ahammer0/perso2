import Link, { LinkProps } from "next/link";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <Link
      className={twMerge(
        "bg-indigo-500 text-white p-2 px-4 rounded-md m-2 hover:text-slate-800 hover:shadow-inner hover:scale-[1.02] hover:brightness-110 shadow-slate-700 transition-all shadow-md",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

export function ButtonOutline({ children, className, ...props }: ButtonProps) {
  return (
    <Button
      className={twMerge(
        "bg-transparent hover:text-white border-zinc-700 border-2",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
