import { z } from 'zod';

export const IdSchema = z.string().min(3);
export const IsoDateSchema = z.string().datetime();

export const RoleSchema = z.enum([
  'head_coach',
  'assistant_coach',
  'coach',
  'fitness_coach',
  'medical',
  'nutritionist',
  'manager',
  'player',
]);

export const PlayerStatusSchema = z.enum(['active', 'injured', 'no_clearance', 'inactive']);
export const EventTypeSchema = z.enum(['match', 'training']);
