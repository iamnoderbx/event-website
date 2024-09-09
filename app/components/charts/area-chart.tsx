import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"

export const description = "An area chart with gradient fill"

const chartData = [
	{ day: "Sunday", desktop: 186 },
	{ day: "Monday", desktop: 186 },
	{ day: "Tuesday", desktop: 305 },
	{ day: "Wednesday", desktop: 237 },
	{ day: "Thursday", desktop: 73 },
	{ day: "Friday", desktop: 209 },
	{ day: "Saturday", desktop: 214 },
]

const chartConfig = {
	desktop: {
		label: "Players",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig

export function GradientChart() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Weekly Players</CardTitle>
				<CardDescription>
					Showing the total players for the week
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<AreaChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="day"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="line" />}
						/>
						<Area
							dataKey="desktop"
							type="natural"
							fill="var(--color-desktop)"
							fillOpacity={0.4}
							stroke="var(--color-desktop)"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
			<CardFooter>
				<div className="flex w-full items-start gap-2 text-sm">
					<div className="grid gap-2">
						<div className="flex items-center gap-2 font-medium leading-none">
							Trending up by 5.2% this week <TrendingUp className="h-4 w-4" />
						</div>
						<div className="flex items-center gap-2 leading-none text-muted-foreground">
							Jan 20, 2023 - Feb 09, 2023
						</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	)
}
