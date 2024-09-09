import { useState } from "react"
import { Button } from "../ui/button"
import { cn } from "~/lib/utils"
import { Icons } from "../icons"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { 
	onClicked: () => void
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	async function onSubmit(event: React.SyntheticEvent) {
		event.preventDefault()
		setIsLoading(true)

		setTimeout(() => {
			setIsLoading(false)
		}, 3000)

		props.onClicked()
	}

	return (
		<div className={cn("grid gap-3", className)} {...props}>
			<form onSubmit={onSubmit}>
				<Button variant="outline" type="submit" disabled={isLoading} className="w-full">
					{isLoading ? (
						<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
					) : (
						<Icons.discord className="mr-2 h-4 w-4" />
					)}{" "}
					Discord
				</Button>
			</form>
		</div>
	)
}