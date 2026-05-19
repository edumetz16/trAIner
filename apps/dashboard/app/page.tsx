'use client';

import { TrainerApiClient } from '@trainer/client-api';
import { useEffect, useMemo, useState } from 'react';

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5001';

type PlayerStatus = 'active' | 'injured' | 'no_clearance' | 'inactive';

export default function HomePage() {
  const api = useMemo(() => new TrainerApiClient(baseUrl), []);
  const [teams, setTeams] = useState<Array<{ id: string; name: string; categoryOrder: number }>>([]);
  const [players, setPlayers] = useState<Array<{ id: string; fullName: string; teamId: string; position: string; jerseyNumber: number; status: PlayerStatus }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [teamName, setTeamName] = useState('');
  const [teamOrder, setTeamOrder] = useState('1');

  const [playerName, setPlayerName] = useState('');
  const [playerTeamId, setPlayerTeamId] = useState('');
  const [playerPos, setPlayerPos] = useState('Forward');
  const [playerJersey, setPlayerJersey] = useState('1');

  async function refreshData() {
    setLoading(true);
    setError('');
    try {
      const [t, p] = await Promise.all([api.listTeams(), api.listPlayers()]);
      setTeams(t.teams);
      setPlayers(p.players);
      if (!playerTeamId && t.teams[0]) setPlayerTeamId(t.teams[0].id);
    } catch {
      setError('No se pudo cargar plantel.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refreshData();
  }, []);

  return (
    <main style={{ display: 'grid', gap: 20, padding: 20 }}>
      <h1>Gestión de Plantel</h1>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <section style={{ border: '1px solid #ddd', padding: 12 }}>
        <h2>Alta de equipo</h2>
        <input value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Nombre equipo" />
        <input value={teamOrder} onChange={(e) => setTeamOrder(e.target.value)} type="number" min={1} />
        <button
          onClick={async () => {
            await api.createTeam({ clubId: 'c1', name: teamName, categoryOrder: Number(teamOrder) });
            setTeamName('');
            await refreshData();
          }}
        >
          Crear equipo
        </button>
      </section>

      <section style={{ border: '1px solid #ddd', padding: 12 }}>
        <h2>Alta de jugador</h2>
        <input value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="Nombre" />
        <select value={playerTeamId} onChange={(e) => setPlayerTeamId(e.target.value)}>
          {teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <input value={playerPos} onChange={(e) => setPlayerPos(e.target.value)} placeholder="Posición" />
        <input value={playerJersey} onChange={(e) => setPlayerJersey(e.target.value)} type="number" min={1} />
        <button
          onClick={async () => {
            await api.createPlayer({
              clubId: 'c1',
              teamId: playerTeamId,
              fullName: playerName,
              phone: '111111',
              email: `${playerName.replaceAll(' ', '.').toLowerCase()}@plantel.app`,
              position: playerPos,
              jerseyNumber: Number(playerJersey),
              status: 'active',
            });
            setPlayerName('');
            await refreshData();
          }}
        >
          Crear jugador
        </button>
      </section>

      <section style={{ border: '1px solid #ddd', padding: 12 }}>
        <h2>Jugadores</h2>
        {players.length === 0 ? <p>Sin jugadores</p> : players.map((p) => (
          <div key={p.id} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
            <strong>{p.fullName}</strong>
            <span>#{p.jerseyNumber}</span>
            <span>{p.position}</span>
            <select
              value={p.status}
              onChange={async (e) => {
                await api.updatePlayerStatus({ playerId: p.id, status: e.target.value as PlayerStatus });
                await refreshData();
              }}
            >
              <option value="active">Activo</option>
              <option value="injured">Lesionado</option>
              <option value="no_clearance">Sin apto</option>
              <option value="inactive">Inactivo</option>
            </select>
          </div>
        ))}
      </section>
    </main>
  );
}
