import { currentUser } from "@clerk/nextjs/server";
import { Footer } from "./components/footer";
import { Header } from "./components/header";


const MarketingLayout = async ({ children }: { children: React.ReactNode }) => {

  const user = await currentUser();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
