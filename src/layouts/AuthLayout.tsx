import Container from "@/shared/Container";
import Logo from "@/shared/Logo";

export default function AuthLayout({
  children,
  reset = false,
}: Readonly<{
  children: React.ReactNode;
  reset?: boolean;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className={`${reset ? "" : "hidden md:block"} py-6`}>
        <Container>
          <Logo />
        </Container>
      </header>

      <main className="w-full grow flex flex-col items-center justify-start md:justify-center md:mb-12">
        {reset ? (
          children
        ) : (
          <div className="relative w-full min-h-0 max-w-[342px] md:max-w-112 bg-white border border-slate-light/30 rounded-8px p-6 md:p-10 shadow-lg flex flex-col justify-start md:justify-center">
            <div className="md:hidden mb-10 mt-2">
              <Logo />
            </div>
            <div className="space-y-10">
              {children}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
