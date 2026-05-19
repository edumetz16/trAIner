import { z } from 'zod';
import { IdSchema, PlayerStatusSchema } from './common';
import { PlayerSchema } from './player';
import { TeamSchema } from './team';

export const CreateTeamInputSchema = TeamSchema.pick({ clubId: true, name: true, categoryOrder: true });
export const CreatePlayerInputSchema = PlayerSchema.pick({
  clubId: true,
  teamId: true,
  fullName: true,
  phone: true,
  email: true,
  position: true,
  jerseyNumber: true,
  status: true,
});
export const UpdatePlayerStatusInputSchema = z.object({
  playerId: IdSchema,
  status: PlayerStatusSchema,
});
