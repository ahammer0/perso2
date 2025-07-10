import Link, { LinkProps } from "next/link";
import { twMerge } from "tailwind-merge";

interface ButtonLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

type ButtonProps =
  | ButtonLinkProps
  | React.ButtonHTMLAttributes<HTMLButtonElement>;
const style =
  "inline-block bg-indigo-500 text-white py-1 px-4 rounded-md m-2 hover:shadow-lg hover:shadow-slate-900 hover:scale-[1.02] hover:brightness-110 shadow-slate-800 transition-all shadow-md disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed disabled:hover:scale-100 no-underline";

export function Button({ children, className, ...props }: ButtonProps) {
  if ("href" in props) {
    return (
      <Link className={twMerge(style, className)} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button className={twMerge(style, className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonOutline({ children, className, ...props }: ButtonProps) {
  return (
    <Button
      className={twMerge(
        "bg-transparent hover:text-white border-zinc-700 border",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
