import { twMerge } from "tailwind-merge";

const Spinner = ({ className, ...props }: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div
      className={twMerge(
        "w-full aspect-square border-4 border-transparent border-t-indigo-500 border-b-indigo-500 rounded-full animate-spin",
        className,
      )}
      {...props}
    ></div>
  );
};
export default Spinner;
