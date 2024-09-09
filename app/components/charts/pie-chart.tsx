import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card"
import { ChartConfig, ChartStyle, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const desktopData = [
	{ username: "nodesupport", desktop: 186, fill: "hsl(var(--chart-1))" },
	{ username: "wethrox", desktop: 305, fill: "hsl(var(--chart-2))" },
]
const chartConfig = {
	nodesupport: {
		label: "NodeSupport",
		color: "hsl(var(--chart-1))",
	},
	wethrox: {
		label: "Wethrox",
		color: "hsl(var(--chart-2))",
	},

} satisfies ChartConfig

export function SelectPieChart() {
	const id = "pie-interactive"
	const [activeuserName, setActiveuserName] = React.useState(desktopData[0].username)

	const activeIndex = React.useMemo(
		() => desktopData.findIndex((item) => item.username === activeuserName),
		[activeuserName]
	)

	const userNames = React.useMemo(() => desktopData.map((item) => item.username), [])
	return (
		<Card data-chart={id} className="flex flex-col">
			<ChartStyle id={id} config={chartConfig} />
			<CardHeader className="flex-row items-start space-y-0 pb-0">
				<div className="grid gap-1">
					<CardTitle>Event Hosts</CardTitle>
					<CardDescription>This past months event hosts</CardDescription>
				</div>
				<Select value={activeuserName} onValueChange={setActiveuserName}>
					<SelectTrigger
						className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
						aria-label="Select a value"
					>
						<SelectValue placeholder="Select userName" />
					</SelectTrigger>
					<SelectContent align="end" className="rounded-xl">
						{userNames.map((key) => {
							const config = chartConfig[key as keyof typeof chartConfig]
							if (!config) {
								return null
							}

							return (
								<SelectItem
									key={key}
									value={key}
									className="rounded-lg [&_span]:flex"
								>
									<div className="flex items-center gap-2 text-xs">
										<span
											className="flex h-3 w-3 shrink-0 rounded-sm"
											style={{
												backgroundColor: `var(--color-${key})`,
											}}
										/>
										{config?.label}
									</div>
								</SelectItem>
							)
						})}
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent className="flex flex-1 justify-center pb-0">
				<ChartContainer
					id={id}
					config={chartConfig}
					className="mx-auto aspect-square w-full max-w-[300px]"
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent />}
						/>
						<Pie
							data={desktopData}
							dataKey="desktop"
							nameKey="userName"
							innerRadius={60}
							strokeWidth={5}
							activeIndex={activeIndex}
							activeShape={({
								outerRadius = 0,
								...props
							}: PieSectorDataItem) => (
								<g>
									<Sector {...props} outerRadius={outerRadius + 10} />
									<Sector
										{...props}
										outerRadius={outerRadius + 25}
										innerRadius={outerRadius + 12}
									/>
								</g>
							)}
						>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor="middle"
												dominantBaseline="middle"
											>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className="fill-foreground text-3xl font-bold"
												>
													{desktopData[activeIndex].desktop.toLocaleString()}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className="fill-muted-foreground"
												>
													Events
												</tspan>
											</text>
										)
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
