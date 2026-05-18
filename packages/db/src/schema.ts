import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', [
  'head_coach',
  'assistant_coach',
  'coach',
  'fitness_coach',
  'medical',
  'nutritionist',
  'manager',
  'player',
]);

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
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
});
