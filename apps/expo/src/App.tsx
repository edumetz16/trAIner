import { TrainerApiClient } from '@trainer/client-api';
import { useEffect, useMemo, useState } from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';

const baseUrl = 'http://localhost:5001';

export default function App() {
  const api = useMemo(() => new TrainerApiClient(baseUrl), []);
  const [players, setPlayers] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    const data = await api.listPlayers().catch(() => ({ players: [] }));
    setPlayers(data.players);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20, gap: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>Plantel</Text>
      <TextInput value={name} onChangeText={setName} placeholder="Nombre jugador" style={{ borderWidth: 1, padding: 8 }} />
      <Button
        title="Agregar jugador"
        onPress={async () => {
          await api.createPlayer({ clubId: 'c1', teamId: 't1', fullName: name, phone: '111111', email: `${name}@plantel.app`, position: 'Forward', jerseyNumber: players.length + 1, status: 'active' });
          setName('');
          await load();
        }}
      />
      {loading ? <Text>Cargando...</Text> : null}
      <FlatList
        data={players}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 8 }}>
            <Text>{item.fullName} - {item.status}</Text>
            <Button
              title="Marcar lesionado"
              onPress={async () => {
                await api.updatePlayerStatus({ playerId: item.id, status: 'injured' });
                await load();
              }}
            />
          </View>
        )}
      />
    </View>
  );
}
