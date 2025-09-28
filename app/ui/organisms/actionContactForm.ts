"use server";
import "server-only";
import { ErrorType, Response, ResponseStatus } from "@/types/serverResponse";
import nodeMailer from "nodemailer";
import dns from "dns/promises";
import dotenv from "dotenv";
import DOMPurify from "dompurify";

dotenv.config();

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
  if (!(await isValidEmail(email))) {
    return {
      status: ResponseStatus.Error,
      message: "email is not valid",
      type: ErrorType.UnprocessableEntity,
      data: { email, message },
    };
  }
  const cleanMessage = DOMPurify.sanitize(message)

  await tansporter.sendMail({
    subject: `Message de contact ahammer.fr`,
    from: email,
    to: process.env.SMTP_USER,
    html: cleanMessage,
  });
  return {
    status: ResponseStatus.Ok,
  };
};

async function isValidEmail(email: string) {
  // Simple regex check
  const regex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (!regex.test(email)) return false;

  // Check for domain validity
  const domain = email.split("@")[1];
  const domainName = process.env.DOMAIN_NAME;
  if (domainName && domainName === domain) {
    return false;
  }
  try {
    const resolvedDomain = await dns.resolveMx(domain);
    if (resolvedDomain.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
}
