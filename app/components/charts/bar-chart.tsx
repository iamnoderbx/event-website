import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"

const chartData = [
	{ day: "Sunday", desktop: 186 },
	{ day: "Monday", desktop: 305 },
	{ day: "Tuesday", desktop: 237 },
	{ day: "Wednesday", desktop: 73 },
	{ day: "Thursday", desktop: 209 },
	{ day: "Friday", desktop: 214 },
	{ day: "Saturday", desktop: 124 },
]
const chartConfig = {
	desktop: {
		label: "Players",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig
export function MultiBarChart() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Weekly Events</CardTitle>
				<CardDescription>Showing the past weeks events</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart accessibilityLayer data={chartData}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="day"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					Trending up by 12.3% this week <TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Showing the total events hosted over the past seven days.
				</div>
			</CardFooter>
		</Card>
	)
}