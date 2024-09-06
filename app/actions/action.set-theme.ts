import { createThemeAction } from "remix-themes"
import { themeSessionResolver } from "~/session/sessions.server"

export const action = createThemeAction(themeSessionResolver)