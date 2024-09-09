import { Outlet } from "@remix-run/react";
import Header from "~/components/dashboard/header";

export default function Index() {
	return <>
		<Header />
		
		<div className = "flex-1 space-y-4 p-8 pt-6">
			<Outlet />
		</div>
	</>
}