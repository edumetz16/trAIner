import Link from 'next/link';
import { TrainerApiClient } from '@trainer/client-api';

export default async function HomePage() {
  const api = new TrainerApiClient(process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5001');
  const [teams, players] = await Promise.all([
    api.listTeams().catch(() => ({ teams: [] })),
    api.listPlayers().catch(() => ({ players: [] })),
  ]);

  return (
    <main>
      <h1>Dashboard app ready</h1>
      <p>Equipos: {teams.teams.length}</p>
      <p>Jugadores: {players.players.length}</p>
      <Link href="/login">Ir a login demo</Link>
    </main>
  );
}
