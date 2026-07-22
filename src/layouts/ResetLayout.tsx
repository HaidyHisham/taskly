import Container from "@/shared/Container";
import Logo from "@/shared/Logo";

export default function ResetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative bg-background min-h-screen flex flex-col">
      <header className="py-6.5">
        <Container>
          <Logo />
        </Container>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center w-full px-4 pb-10 md:pb-16">
        {children}
      </main>
    </div>
  );
}
