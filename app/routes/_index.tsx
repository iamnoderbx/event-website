import type { MetaFunction } from "@remix-run/node";
import { useTheme } from "remix-themes";
import { ModeToggle } from "~/components/mode-toggle";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [ theme ] = useTheme()

  console.log(theme)

  return (
    <div>
      <ModeToggle />
      <Button>Click me</Button>
    </div>
  )
}
