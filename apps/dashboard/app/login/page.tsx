'use client';

import { useState } from 'react';
import { TrainerApiClient } from '@trainer/client-api';

export default function LoginPage() {
  const [result, setResult] = useState('');

  return (
    <main>
      <h1>Login</h1>
      <button
        onClick={async () => {
          const api = new TrainerApiClient(process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5001');
          const session = await api.login({ email: 'coach@plantel.app', password: 'password123' });
          setResult(`ok ${session.role} ${session.clubId}`);
        }}
      >
        Login demo
      </button>
      <p>{result}</p>
    </main>
  );
}
