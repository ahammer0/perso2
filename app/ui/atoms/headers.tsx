import { twMerge } from "tailwind-merge";

export const H1 = ({ className, ...props }: React.ComponentProps<"h1">) => {
  return (
    <h1 className={twMerge("text-3xl md:text-5xl font-bold", className)}>
      {props.children}
    </h1>
  );
};
export const H2 = ({ className, ...props }: React.ComponentProps<"h1">) => {
  return (
    <h2 className={twMerge("text-3xl md:text-5xl font-bold", className)}>
      {props.children}
    </h2>
  );
};
export const H3 = ({ className, ...props }: React.ComponentProps<"h1">) => {
  return (
    <h3 className={twMerge("text-2xl md:text-3xl font-bold", className)}>
      {props.children}
    </h3>
  );
};
