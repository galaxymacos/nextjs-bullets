import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
      <main
          className={
            "min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800"
          }
      >
        <div className={"space-y-6 text-center"}>
          <h1
              className={cn(
                  font.className,
                  "text-6xl font-bold text-white drop-shadow-md",
              )}
          >
            {/*NOTE: drop-shadow puts shadow on the letter, while shadow puts shadow on the box bottom */}
            🔐Auth
          </h1>
          <p className={"text-white text-lg"}>A simple authentication service</p>
          <div>
            <LoginButton>
              <Button size={"lg"} variant={"secondary"}>
                Sign In
              </Button>
            </LoginButton>
          </div>
        </div>
      </main>
  );
}
