"use server";
import { ErrorType, Response, ResponseStatus } from "@/types/serverResponse";
import nodeMailer from "nodemailer";

interface submitData {
  email: string;
  message: string;
}

const tansporter = nodeMailer.createTransport({
  host: process.env.SMTP_HOST,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const handleSubmit = async (
  _response: Response<submitData>,
  form: FormData,
): Promise<Response<submitData>> => {
  const email = (form.get("email") ?? "").toString();
  const message = (form.get("message") ?? "").toString();

  if (!email || !message) {
    return {
      status: ResponseStatus.Error,
      message: "email and message are required",
      type: ErrorType.UnprocessableEntity,
      data: { email, message },
    };
  }

  await tansporter.sendMail({
    subject: `Message de contact ahammer.fr`,
    from: email,
    to: process.env.SMTP_USER,
    html: message,
  });
  return {
    status: ResponseStatus.Ok,
  };
};
