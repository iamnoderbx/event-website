import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { prisma } from "~/server/db.server";
import { getRole, Roles } from "~/server/roles.server";
import { commitSession, getUserSession } from "~/server/sessions.server";

// This is the endpoint that we will use to get the user's information
const USER_ENDPOINT = 'https://discord.com/api/users/@me'

// This is the endpoint that we will use to get the oauth's token
const TOKEN_ENDPOINT = 'https://discord.com/api/oauth2/token'

export type DiscordEndpointData = {
    id: string,
    username: string,
    avatar: string,
}

export async function loader({ request }: LoaderFunctionArgs) {
    const session = await getUserSession(request);

    // If the user is already logged in, we will redirect them to the home page
    if (session.get("user")) {
        return redirect("/");
    }

    // If there is no request, we will return an error
    if (!request) return json({ error: "No request provided" }, { status: 400 });

    // We will get the auth token from the URL
    const url = new URL(request.url);
    const authToken = url.searchParams.get("code");

    // If there is no auth token, we will return an error
    if (!authToken) return json({ error: "No auth token provided" }, { status: 400 });

    /**
     * getAccessTokenBearer
     * Get the access token using the auth token
     * 
     * @returns {Promise<{ ok: boolean, access_token?: string }>}
     */
    const getAccessTokenBearer = async (): Promise<{ ok: boolean; access_token?: string; }> => {
        // We will create a URLSearchParams object with the required parameters
        const params = new URLSearchParams({
            grant_type: 'authorization_code',
            code: authToken,
            client_id: process.env.CLIENT_ID || '',
            client_secret: process.env.CLIENT_SECRET || '',
            redirect_uri: process.env.REDIRECT_URI || '',
        });

        // We will make a request to the TOKEN_ENDPOINT to get the access token
        const response = await fetch(TOKEN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        });

        // Return the access token if the response is 200 and the access token is valid
        const access_token = await response.json();
        return access_token && access_token.access_token ? { ok: true, access_token: access_token.access_token } : { ok: false };
    }

    const { ok, access_token } = await getAccessTokenBearer();
    if (!ok) return json({ error: "Failed to get access token" }, { status: 500 });

    const response = await fetch(USER_ENDPOINT, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/json'
        }
    });

    // If the response is not 200, we will return an error
    if (response.status !== 200) return json({ error: "Failed to get user information" }, { status: 500 });

    // We will return the user information
    const endpointResponse: DiscordEndpointData = await response.json();
    if (!endpointResponse) return json({ error: "Failed to get user information" }, { status: 500 });

    // Check if a user with this discord id exists
    let user = await prisma.user.findUnique({
        where: { discord: endpointResponse.id }
    });

    // If the user does not exist, create a new user with the "Guest" role
    if (!user) {
        const guestRoleId = await getRole(Roles.Guest);
        
        // Create the user in the database with the "Guest" role
        user = await prisma.user.create({
            data: {
                discord: endpointResponse.id,
                username: endpointResponse.username,
                avatar: endpointResponse.avatar,
                roleId: guestRoleId,
            }
        });
    }

    // Set the user session
    session.set("user", user.id);

    return redirect("/", {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
}