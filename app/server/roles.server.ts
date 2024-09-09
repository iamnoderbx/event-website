import { prisma } from "~/server/db.server";

export enum Roles {
	Guest = "guest",
	User = "user",
	Admin = "admin",
}

export async function getRole(role: Roles): Promise<number> {
	// Check if the role exists
	let existingRole = await prisma.role.findUnique({
		where: { name: role },
	});

	// If the role does not exist, create it
	if (!existingRole) {
		existingRole = await prisma.role.create({
			data: { name: role },
		});
	}

	// Return the role ID
	return existingRole.id;
}