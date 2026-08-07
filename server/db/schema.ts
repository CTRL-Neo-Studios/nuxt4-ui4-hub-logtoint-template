import {
	bigserial,
	boolean, index,
	integer,
	json,
	pgTable,
	primaryKey,
	text,
	timestamp,
	uniqueIndex,
	uuid,
	varchar
} from "drizzle-orm/pg-core";
import {defineRelations} from "drizzle-orm";

const createdAtColumn = { createdAt: timestamp({withTimezone: true}).defaultNow().notNull() }
const updatedAtColumn = { updatedAt: timestamp({ withTimezone: true }).defaultNow().$onUpdate(() => new Date()).notNull() }

const createdUpdatedAtColumns = {
	...createdAtColumn,
	...updatedAtColumn,
}

// Default Tables

export const user = pgTable("user", {
	id: text().primaryKey().notNull(),
	username: varchar({ length: 50 }).notNull(),
	email: text().notNull().unique(),
	avatarUrl: text(),

	...createdUpdatedAtColumns
});

export const file = pgTable("file", {
	id: uuid().primaryKey().defaultRandom(),
	ownerId: text().references(() => user.id, { onDelete: "set null", onUpdate: "cascade" }),
	blobPath: text().notNull(),
	fileName: text(),

	...createdUpdatedAtColumns
});

// Non-default Tables

