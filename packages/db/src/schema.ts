import { pgEnum, pgTable, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';

export const playerStatusEnum = pgEnum('player_status', [
  'active',
  'injured',
  'no_clearance',
  'inactive',
]);
export const eventTypeEnum = pgEnum('event_type', ['match', 'training']);

export const clubs = pgTable('clubs', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
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
});

export const channels = pgTable('channels', {
  id: text('id').primaryKey(),
  clubId: text('club_id').notNull(),
  name: text('name').notNull(),
  visibilityKey: text('visibility_key').notNull(),
});

export const messages = pgTable('messages', {
  id: text('id').primaryKey(),
  channelId: text('channel_id').notNull(),
  authorUserId: text('author_user_id').notNull(),
  text: text('text').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
});

export const calendarEvents = pgTable('calendar_events', {
  id: text('id').primaryKey(),
  clubId: text('club_id').notNull(),
  teamId: text('team_id').notNull(),
  type: eventTypeEnum('type').notNull(),
  title: text('title').notNull(),
  location: text('location').notNull(),
  startsAt: timestamp('starts_at', { withTimezone: true }).notNull(),
});

export const convocations = pgTable('convocations', {
  id: text('id').primaryKey(),
  clubId: text('club_id').notNull(),
  teamId: text('team_id').notNull(),
  eventId: text('event_id').notNull(),
  status: text('status').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
});

export const convocationSlots = pgTable('convocation_slots', {
  id: text('id').primaryKey(),
  convocationId: text('convocation_id').notNull(),
  jersey: integer('jersey').notNull(),
  playerId: text('player_id').notNull(),
  isCaptain: boolean('is_captain').notNull(),
});
