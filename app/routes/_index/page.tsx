import type { MetaFunction } from "@remix-run/node";
import { Link } from "lucide-react";
import { UserAuthForm } from "~/components/forms/user-auth-form";
import { buttonVariants } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { cn } from "~/lib/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <div className="absolute h-full w-full flex-col p-10 text-white lg:flex overflow-hidden">
        <div
          className="absolute inset-0 bg-zinc-900"
          style={{
            backgroundImage: "url('/app/images/authentication.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(10px) grayscale(100%)",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div> {/* Darken overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-90"></div>
        </div>
        <div className="relative mt-auto z-10">
          <blockquote className="space-y-2">
            <footer className="text-sm">
              This project is open source and can be found{" "}
              <a href="https://github.com/iamnoderbx/event-website">
                <u>here</u>
              </a>.
            </footer>
          </blockquote>
        </div>
      </div>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:px-0">
        <Card>
          <Link
            href="/examples/authentication"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "absolute right-4 top-4 md:right-8 md:top-8"
            )}
          >
            Login
          </Link>

          <div className="relative lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Verify your Identity
                </h1>
              </div>

              <div className="relative">
                <div className="absolute inset-2 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Continue with Discord
                  </span>
                </div>
              </div>

              <UserAuthForm />

              <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <a href="https://github.com/iamnoderbx/event-website"><u>Terms of Service</u></a>{" "}
                and{" "}
                <a href="https://github.com/iamnoderbx/event-website"><u>Privacy Policy</u></a>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
