import { createCookieSessionStorage, redirect } from "@remix-run/node"
import { createThemeSessionResolver } from "remix-themes"

const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: "theme",
		path: "/",
		httpOnly: true,
		sameSite: "lax",
		secrets: ["s3cdqwwadar3t"],
	},
})

export function getUserSession(request: Request) {
	return sessionStorage.getSession(request.headers.get("Cookie"));
}

export async function logout(request: Request) {
	const session = await sessionStorage.getSession(request.headers.get("Cookie"));

	return redirect("/", {
		headers: { "Set-Cookie": await sessionStorage.destroySession(session) },
	});
}

export const themeSessionResolver = createThemeSessionResolver(sessionStorage)
export const { getSession, commitSession, destroySession } = sessionStorage