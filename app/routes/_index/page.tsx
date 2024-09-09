import { ActionFunctionArgs, redirect, type MetaFunction } from "@remix-run/node";
import { UserAuthForm } from "~/components/forms/user-auth-form";
import LoginComponent from "~/components/login";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRemixForm } from "remix-hook-form";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

// Our schema for the redirect form, no need for any fields
const schema = zod.object({})

// The type of the form data
type FormData = zod.infer<typeof schema>
const resolver = zodResolver(schema)

// The action for the form, will redirect to an oAuth2 Discord login
export const action = async ( { context } : ActionFunctionArgs) => {
	console.log(context)
	return redirect("https://google.com/")
};

export default function Index() {
	const { handleSubmit } = useRemixForm<FormData>({
		mode: "onSubmit", resolver,
	})

	return <LoginComponent>
		<UserAuthForm onClicked={handleSubmit}/>
	</LoginComponent>
}
