import Container from "@/shared/Container";
import Logo from "@/shared/Logo";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-background">

      <header className="hidden md:block py-6">
        <Container>
          <Logo />
        </Container>
      </header>

      <main className="w-full grow flex items-stretch md:items-center justify-center md:mb-12">
        <div className="w-full min-h-screen md:min-h-0 md:max-w-[448px] bg-background md:bg-white md:border md:border-slate-light/30 md:rounded-8px p-6 md:p-[40px] md:shadow-lg flex flex-col justify-start md:justify-center">
        
          <div className="md:hidden mb-10 mt-2">
            <Logo />
          </div>
          <div className="space-y-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}