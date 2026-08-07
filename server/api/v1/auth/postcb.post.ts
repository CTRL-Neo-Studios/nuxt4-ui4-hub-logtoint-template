import {useServerDb} from "#server/utils/core/useServerDb.ts";
import * as schema from "#server/db/schema.ts"
import {eq} from "drizzle-orm";

export default defineEventHandler(async (event) => {
	const user = await requireLogtoUser(event)
	const $db = useServerDb()

	await $db.transaction(async (tx) => {
		const existingUser = await tx.query.user.findFirst({
			where: {
				id: user.sub,
			}
		})

		if (existingUser) {
			await tx.update(schema.user).set({
				avatarUrl: user?.picture,
				username: `${user?.username}`,
				email: `${user?.email}`
			}).where(eq(schema.user.id, user.sub))
		} else {
			const [newUser] = await tx.insert(schema.user).values({
				id: user.sub,
				email: `${user.email}`,
				username: `${user.username}`,
				avatarUrl: user.picture
			}).returning()

			if (!newUser) throw createError({ status: 500, statusText: 'Unable to create new user entry.'})
		}
	})

	return sendRedirect(event, '/')
})
