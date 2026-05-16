import { TrainerApiClient } from '@trainer/client-api';

export default async function HomePage() {
  const api = new TrainerApiClient(process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5001');
  const players = await api.listPlayers().catch(() => ({ players: [] }));

  return (
    <main>
      <h1>Dashboard app ready</h1>
      <p>Jugadores cargados: {players.players.length}</p>
    </main>
  );
}
