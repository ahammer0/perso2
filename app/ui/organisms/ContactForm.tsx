import { Button } from "../atoms/buttons";
import { H2 } from "../atoms/headers";
import { Input, Textarea } from "../atoms/inputs";

//TODO: form handling
//
const ContactForm = () => {
  return (
    <section className="p-4 pt-14 pb-0" id="contact">
      <H2 className="text-white text-center mb-14">Let's get in touch !</H2>
      <form className="flex flex-col gap-4">
        <Input type="email" placeholder="Your email" />
        <Textarea placeholder="Your good news" rows={5}></Textarea>
        <div className="flex justify-center pt-4">
          <Button type="submit">Send</Button>
        </div>
      </form>
    </section>
  );
};
export default ContactForm;
