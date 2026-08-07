import { blob } from '@nuxthub/blob'
import { z } from 'zod'

const routeSchema = z.object({
	userId: z.string()
})

export default defineEventHandler(async (event) => {
	const { userId } = await getValidatedRouterParams(event, routeSchema.parse)
	const user = await requireLogtoUser(event)
	const $db = useServerDb()
	const u = await $db.query.user.findFirst({
		where: {
			id: userId
		}
	})

	if (u?.avatarUrl)
		return blob.serve(event, u.avatarUrl);
})
