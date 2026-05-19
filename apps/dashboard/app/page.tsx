'use client';

import { TrainerApiClient } from '@trainer/client-api';
import { useEffect, useMemo, useState } from 'react';

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5001';
type PlayerStatus = 'active' | 'injured' | 'no_clearance' | 'inactive';

export default function HomePage() {
  const api = useMemo(() => new TrainerApiClient(baseUrl), []);
  const [teams, setTeams] = useState<Array<{ id: string; name: string; categoryOrder: number }>>([]);
  const [players, setPlayers] = useState<Array<{ id: string; fullName: string; teamId: string; position: string; jerseyNumber: number; status: PlayerStatus }>>([]);
  const [channels, setChannels] = useState<Array<{ id: string; name: string }>>([]);
  const [messages, setMessages] = useState<Array<{ id: string; text: string; authorUserId: string }>>([]);
  const [selectedChannelId, setSelectedChannelId] = useState('');
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [teamName, setTeamName] = useState('');
  const [teamOrder, setTeamOrder] = useState('1');
  const [playerName, setPlayerName] = useState('');
  const [playerTeamId, setPlayerTeamId] = useState('');

  async function loadMessages(channelId: string) {
    const data = await api.listMessages(channelId);
    setMessages(data.messages);
  }

  async function refreshData() {
    setLoading(true);
    setError('');
    try {
      const [t, p, c] = await Promise.all([api.listTeams(), api.listPlayers(), api.listChannels()]);
      setTeams(t.teams);
      setPlayers(p.players);
      setChannels(c.channels);
      const channelId = selectedChannelId || c.channels[0]?.id || '';
      if (channelId) {
        setSelectedChannelId(channelId);
        await loadMessages(channelId);
      }
      if (!playerTeamId && t.teams[0]) setPlayerTeamId(t.teams[0].id);
    } catch {
      setError('No se pudo cargar datos.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refreshData();
  }, []);

  return (
    <main style={{ display: 'grid', gap: 20, padding: 20 }}>
      <h1>Gestión de Plantel + Chat</h1>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <section>
        <h2>Alta de equipo</h2>
        <input value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Nombre equipo" />
        <input value={teamOrder} onChange={(e) => setTeamOrder(e.target.value)} type="number" min={1} />
        <button onClick={async () => { await api.createTeam({ clubId: 'c1', name: teamName, categoryOrder: Number(teamOrder) }); setTeamName(''); await refreshData(); }}>Crear equipo</button>
      </section>

      <section>
        <h2>Alta de jugador</h2>
        <input value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="Nombre" />
        <select value={playerTeamId} onChange={(e) => setPlayerTeamId(e.target.value)}>{teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}</select>
        <button onClick={async () => { await api.createPlayer({ clubId: 'c1', teamId: playerTeamId, fullName: playerName, phone: '111111', email: `${playerName.replaceAll(' ', '.').toLowerCase()}@plantel.app`, position: 'Forward', jerseyNumber: players.length + 1, status: 'active' }); setPlayerName(''); await refreshData(); }}>Crear jugador</button>
      </section>

      <section>
        <h2>Jugadores</h2>
        {players.map((p) => <div key={p.id}><strong>{p.fullName}</strong> <select value={p.status} onChange={async (e) => { await api.updatePlayerStatus({ playerId: p.id, status: e.target.value as PlayerStatus }); await refreshData(); }}><option value="active">Activo</option><option value="injured">Lesionado</option><option value="no_clearance">Sin apto</option><option value="inactive">Inactivo</option></select></div>)}
      </section>

      <section>
        <h2>Canales</h2>
        <select value={selectedChannelId} onChange={async (e) => { setSelectedChannelId(e.target.value); await loadMessages(e.target.value); }}>
          {channels.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <div style={{ border: '1px solid #ddd', padding: 8, minHeight: 80 }}>
          {messages.map((m) => <p key={m.id}><strong>{m.authorUserId}:</strong> {m.text}</p>)}
        </div>
        <input value={messageText} onChange={(e) => setMessageText(e.target.value)} placeholder="Escribí mensaje" />
        <button onClick={async () => { if (!selectedChannelId) return; await api.createMessage(selectedChannelId, { clubId: 'c1', authorUserId: 'u1', text: messageText }); setMessageText(''); await loadMessages(selectedChannelId); }}>Enviar</button>
      </section>
    </main>
  );
}
