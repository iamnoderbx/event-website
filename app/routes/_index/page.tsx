import { LoaderFunctionArgs, redirect, type MetaFunction } from "@remix-run/node";
import { UserAuthForm } from "~/components/forms/user-auth-form";
import LoginComponent from "~/components/login";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRemixForm } from "remix-hook-form";
import { getUserSession } from "~/server/sessions.server";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

const DISCORD_URL = "https://discord.com/oauth2/authorize"

// Our schema for the redirect form, no need for any fields
const schema = zod.object({})

// The type of the form data
type FormData = zod.infer<typeof schema>
const resolver = zodResolver(schema)

// The action for the form, will redirect to an oAuth2 Discord login
export async function action() {
	const { CLIENT_ID, REDIRECT_URI } = process.env

	if (!CLIENT_ID || !REDIRECT_URI) {
		throw new Error("Missing CLIENT_ID or REDIRECT_URI")
	}

	const encodedURI = encodeURI(REDIRECT_URI!)
	const uri = `${DISCORD_URL}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodedURI}&scope=identify`

	return redirect(uri)
}

// The loader function, server rendered handles session and redirects
export async function loader({ request }: LoaderFunctionArgs) {
	const session = await getUserSession(request);

    // If the user is already logged in, we will redirect them to the home page
    if (session.get("user")) {
        return redirect("/dashboard/overview");
    }
	
	return null
}

// The index page, will render the login component	
export default function Index() {
	const { handleSubmit } = useRemixForm<FormData>({
		mode: "onSubmit", resolver,
	})

	return <LoginComponent>
		<UserAuthForm onClicked={handleSubmit}/>
	</LoginComponent>
}
