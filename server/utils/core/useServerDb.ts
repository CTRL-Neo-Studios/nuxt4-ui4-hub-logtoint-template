import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { relations } from "../../db/relations.ts"

/** The app's Drizzle instance, bound to the relational config in `db/relations.ts`. */
export type ServerDb = PostgresJsDatabase<typeof relations>

let _db: ServerDb

export function useServerDb(): ServerDb {
	if (!_db) {
		// @ts-ignore
		const url = process.env.DATABASE_URL
		if (!url) throw new Error('DATABASE_URL is not set')
		_db = drizzle(url, { relations })
	}
	return _db
}

// export function useServerDb() {
// 	const url = process.env.DATABASE_URL
// 	if (!url) throw new Error('DATABASE_URL is not set')
// 	return drizzle(url, { relations })
// }
