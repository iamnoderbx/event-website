import React from "react";
import { buttonVariants } from "./ui/button";
import { cn } from "~/lib/utils";
import { Link } from "lucide-react";

export default function LoginComponent(props: React.PropsWithChildren) {
	return <>
		<div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none ">
			<Link
				href="/examples/authentication"
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"absolute right-4 top-4 md:right-8 md:top-8"
				)}
			>
				Login
			</Link>

			<div
				className="absolute inset-0 flex justify-center items-center w-[100%] h-full animate-move-bg"
				style={{
					backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='rgba(51, 92, 158, 0.03)'%3E%3Cpolygon fill-rule='evenodd' points='8 4 12 6 8 8 6 12 4 8 0 6 4 4 6 0 8 4'/%3E%3C/g%3E%3C/svg%3E\")",
					zIndex: -1,
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				}}
			/>

			<style >{`
				@keyframes move-bg {
				0% {
					background-position: 0 0;
				}
				50% {
					background-position: 50px 50px;
				}
				100% {
					background-position: 0 0;
				}
				}
			
				.animate-move-bg {
				animation: move-bg 20s ease-in-out infinite;
				}
			`}</style>

			<div
				className="absolute inset-0 flex justify-center items-center w-[60%] h-full bg-background"
				style={{
					background: "radial-gradient(circle, rgba(50, 123, 255, 0.05), transparent 50%)",
					zIndex: -1,
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				}}
			/>

			<div className="relative lg:p-8 z-30">

				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">
							Verify your Identity
						</h1>
					</div>

					<div className="relative">
						<div className="absolute inset-2 flex items-center">
							<div className="flex-grow border-t" />
							<span className="px-2 text-muted-foreground justify-center text-xs uppercase" style={{ backgroundColor: 'transparent' }}>
								Continue with Discord
							</span>

							<div className="flex-grow border-t" />
						</div>
					</div>

					<br />

					{props.children}

					<br />
					<p className="px-8 text-center text-sm text-muted-foreground">
						By clicking continue, you agree to our{" "}
						<a href="https://github.com/iamnoderbx/event-website"><u>Terms of Service</u></a>{" "}
						and{" "}
						<a href="https://github.com/iamnoderbx/event-website"><u>Privacy Policy</u></a>
					</p>
				</div>
			</div>
		</div>
	</>
}