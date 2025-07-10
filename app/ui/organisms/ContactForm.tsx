"use client";

import { useActionState } from "react";
import { Button } from "../atoms/buttons";
import { H2 } from "../atoms/headers";
import { Input, Textarea } from "../atoms/inputs";
import { handleSubmit } from "./actionContactForm";
import Spinner from "../atoms/Spinner";
import { ResponseStatus } from "@/types/serverResponse";

const ContactForm = () => {
  const [response, action, pending] = useActionState(handleSubmit, {
    status: ResponseStatus.Unsent,
  });
  return (
    <section className="p-4 pt-14 pb-0" id="contact">
      <H2 className="text-white text-center mb-14">
        Let&apos;s get in touch !
      </H2>
      <form action={action} className="flex flex-col gap-4">
        <Input
          type="email"
          placeholder="Your email"
          name="email"
          required
          defaultValue={
            (response.status !== ResponseStatus.Unsent &&
              response.data?.email) ||
            ""
          }
        />
        <Textarea
          placeholder="Your good news"
          rows={5}
          name="message"
          defaultValue={
            (response.status !== ResponseStatus.Unsent &&
              response.data?.message) ||
            ""
          }
          required
        ></Textarea>
        <div className="flex justify-center items-center pt-4">
          <Button
            type="submit"
            disabled={response.status === ResponseStatus.Ok}
          >
            {response.status === ResponseStatus.Ok ? "Message sent !!" : "Send"}
          </Button>
          {pending && <Spinner className="w-6" />}
        </div>
        {response.status === ResponseStatus.Error && (
          <p className="text-red-500 text-center">{response.message}</p>
        )}
      </form>
    </section>
  );
};
export default ContactForm;
