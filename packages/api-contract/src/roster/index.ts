import { z } from 'zod';
import {
  CreatePlayerInputSchema,
  CreateTeamInputSchema,
  PlayerSchema,
  TeamSchema,
  UpdatePlayerStatusInputSchema,
} from '@trainer/types';

export const ListTeamsResponseSchema = z.object({ teams: z.array(TeamSchema) });
export const CreateTeamRequestSchema = CreateTeamInputSchema;
export const CreateTeamResponseSchema = TeamSchema;

export const ListPlayersResponseSchema = z.object({ players: z.array(PlayerSchema) });
export const CreatePlayerRequestSchema = CreatePlayerInputSchema;
export const CreatePlayerResponseSchema = PlayerSchema;
export const UpdatePlayerStatusRequestSchema = UpdatePlayerStatusInputSchema;
export const UpdatePlayerStatusResponseSchema = PlayerSchema;
