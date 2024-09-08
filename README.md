## Installation

You will want to ensure that you have a server to host your website on, a domain is optional, but recommended.
Some cheap hosting options for servers can be found below, a virtual private server - not a dedicated - will work for our cases.
- [Galaxy Gate](https://galaxygate.net/)
- [Contabo](https://contabo.com/en-us/)

Clone the repository to your server, or your local machine.
- gh repo clone iamnoderbx/event-website

Install any missing dependencies.
```shellscript
npm install
```

Production steps for deployment can be found below.

## Setup Environments

You will want to ensure you create a .env file within your 
code base root. Within the environment the following template should be used.

```env
OWNER_ID=<DISCORD_ID>
```

## Development

If you're looking to modify the website, you can view your changes live, and get feedback.

Run the dev server:

```shellscript
npm run dev
```

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
