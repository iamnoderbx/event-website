import { Theme, useTheme } from "remix-themes";
import { GradientChart } from "~/components/charts/area-chart";
import { MultiBarChart } from "~/components/charts/bar-chart";
import { SelectPieChart } from "~/components/charts/pie-chart";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export default function Index() {
	const [theme] = useTheme()

	return <>
		<div className="grid grid-cols-1 lg:grid-cols-[70%_28%] gap-10">
			<div className="flex flex-col gap-10">
				<GradientChart />
				<div className="flex flex-row gap-10">
					<MultiBarChart />
					<SelectPieChart />
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<Card className={theme === Theme.DARK ? "bg-zinc-900" : "bg-zinc-100"}>
					<CardHeader>
						<CardTitle>Active Players</CardTitle>
						<div className="text-2xl font-bold">152</div>
						<CardDescription>Players not online within two weeks will be dropped.</CardDescription>
					</CardHeader>
				</Card>

				<Card className={theme === Theme.DARK ? "bg-zinc-900" : "bg-zinc-100"}>
					<CardHeader>
						<CardTitle>Active Players</CardTitle>
						<div className="text-2xl font-bold">152</div>
						<CardDescription>Players not online within two weeks will be dropped.</CardDescription>
					</CardHeader>
				</Card>

				<Card className={theme === Theme.DARK ? "bg-zinc-900" : "bg-zinc-100"}>
					<CardHeader>
						<CardTitle>Active Players</CardTitle>
						<div className="text-2xl font-bold">152</div>
						<CardDescription>Players not online within two weeks will be dropped.</CardDescription>
					</CardHeader>
				</Card>
			</div>
		</div>
	</>
}