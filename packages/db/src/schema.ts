import { pgEnum, pgTable, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', [
  'head_coach','assistant_coach','coach','fitness_coach','medical','nutritionist','manager','player',
]);
export const playerStatusEnum = pgEnum('player_status', ['active', 'injured', 'no_clearance', 'inactive']);

export const clubs = pgTable('clubs', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
});
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
  fullName: text('full_name').notNull(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
});
export const memberships = pgTable('memberships', {
  id: text('id').primaryKey(),
  clubId: text('club_id').notNull(),
  userId: text('user_id').notNull(),
  role: roleEnum('role').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
});
export const teams = pgTable('teams', {
  id: text('id').primaryKey(),
  clubId: text('club_id').notNull(),
  name: text('name').notNull(),
  categoryOrder: integer('category_order').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
});
export const players = pgTable('players', {
  id: text('id').primaryKey(),
  clubId: text('club_id').notNull(),
  teamId: text('team_id').notNull(),
  fullName: text('full_name').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  position: text('position').notNull(),
  jerseyNumber: integer('jersey_number').notNull(),
  status: playerStatusEnum('status').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
});
