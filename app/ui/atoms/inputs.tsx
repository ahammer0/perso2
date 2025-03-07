import { twMerge } from "tailwind-merge";

const inputStyle =
  "p-1 px-2 rounded-md shadow-md bg-neutral-300 outline-neutral-700";
export const Input = ({
  className,
  ...props
}: React.HTMLProps<HTMLInputElement>) => {
  return <input className={twMerge(inputStyle, className)} {...props} />;
};

export const Textarea = ({
  className,
  children,
  ...props
}: React.HTMLProps<HTMLTextAreaElement>) => {
  return (
    <textarea className={twMerge(inputStyle, className)} {...props}>
      {children}
    </textarea>
  );
};
