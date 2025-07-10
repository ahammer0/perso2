import Footer from "@/app/ui/organisms/footer";
import Nav from "@/app/ui/organisms/nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="relative bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gray-700 to-neutral-900  text-white flex flex-col grow">
          <Nav />
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}
