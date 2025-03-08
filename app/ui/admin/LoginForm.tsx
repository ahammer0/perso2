"use client";
import { Input } from "@/app/ui/atoms/inputs";
import { Button } from "@ui/atoms/buttons";
import { loginAction } from "@/app/admin/lib/loginAction";
import { useActionState } from "react";
import { ResponseStatus } from "@/types/serverResponse";
import Spinner from "../atoms/Spinner";
import { H1 } from "../atoms/headers";

const LoginForm = () => {
  const [res, action, pending] = useActionState(loginAction, {
    status: ResponseStatus.Unsent,
  });
  return (
    <form
      className="flex flex-col justify-center max-w-[300px] mx-auto border border-slate-300 rounded p-4 my-4"
      action={action}
    >
      <H1 className="text-center mb-4">Login</H1>
      <Input
        type="password"
        name="key"
        placeholder="Mot de passe"
        className="mb-4"
        required
      />
      <div className="self-center flex flex-row items-center justify-center">
        <Button type="submit">Connexion</Button>
        {pending && <Spinner className="w-6" />}
      </div>
      {res.status === ResponseStatus.Error && (
        <p className="text-red-500 text-center">{res.message}</p>
      )}
    </form>
  );
};
export default LoginForm;
