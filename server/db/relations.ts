import * as schema from "./schema";
import {defineRelations} from "drizzle-orm";

export const relations = defineRelations(schema, (r) => ({
	// Default relations
	user: {
		files: r.many.file({
			from: r.user.id,
			to: r.file.ownerId
		})
	},
}))
