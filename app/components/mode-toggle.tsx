import { Moon, Sun } from "lucide-react";
import { Theme, useTheme } from "remix-themes";

import { Button } from "./ui/button";

export function ModeToggle() {
    const [theme, setTheme] = useTheme();

    const toggleTheme = () => {
        setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-[101] bg-transparent backdrop-blur-none"
            onClick={toggleTheme}
        >
            {theme === Theme.LIGHT ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}