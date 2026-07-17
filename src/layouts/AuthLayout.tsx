import Container from "@/shared/Container";
import Logo from "@/shared/Logo";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen md:gap-y-4">
      <header className="py-6">
        <Container>
          <Logo />
        </Container>
      </header>
      <main className="w-full flex items-center justify-center mb-12 max-w-[576px] mx-auto">
        <Container>
          <div className="w-full space-y-10 bg-white border border-white rounded-8px p-6 md:p-12 shadow-lg">
            {children}
          </div>
        </Container>
      </main>
    </div>
  );
}