import Link, { LinkProps } from "next/link";
import { twMerge } from "tailwind-merge";

interface ButtonLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}
interface HTMLButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

type ButtonProps = ButtonLinkProps | HTMLButtonProps;

export function Button({ children, className, ...props }: ButtonProps) {
  if ("href" in props) {
    return (
      <Link
        className={twMerge(
          `inline-block bg-indigo-500 text-white p-2 px-4 rounded-md my-2  
hover:shadow-lg hover:shadow-slate-900 hover:scale-[1.02] hover:brightness-110 
shadow-slate-800 transition-all shadow-md 
disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed disabled:hover:scale-100`,
          className,
        )}
        {...props}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={twMerge(
        `inline-block bg-indigo-500 text-white p-2 px-4 rounded-md my-2 
hover:shadow-lg hover:shadow-slate-900 hover:scale-[1.02] hover:brightness-110 
shadow-slate-800 transition-all shadow-md 
disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed disabled:hover:scale-100`,
        className,
      )}
      {...props}
    >
      {children}
    </button>
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
