import { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { TrainerApiClient } from '@trainer/client-api';

export default function App() {
  const [result, setResult] = useState('');
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 }}>
      <Text>Plantel Expo MVP</Text>
      <Button
        title="Ver plantel"
        onPress={async () => {
          const api = new TrainerApiClient('http://localhost:5001');
          const data = await api.listPlayers();
          setResult(`Jugadores: ${data.players.length}`);
        }}
      />
      <Text>{result}</Text>
    </View>
  );
}
