import { AnyPgColumn, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const postComment = pgTable('post_comments', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    postId: text('post_id').notNull(),
    contents: text('contents').notNull(),
    created_at: timestamp('created_at').defaultNow(),
    parentId: integer('parent_id').references((): AnyPgColumn => postComment.id)

})

export type SelectComment = typeof postComment.$inferSelect;
export type InsertComment = typeof postComment.$inferInsert;

